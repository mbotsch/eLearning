//------------------------------------------------------------------------------


// GUI elements
var canvas;
var gl;
var veditor;
var feditor;

// WebGL objects
var sphere;
var tex;
var shader;

// settings
var rotateY;
var alpha_test;

// bools
var initialized = false;
var animateIt = true;


//------------------------------------------------------------------------------


// start demo
window.onload = function()
{
    veditor = ace.edit("vshader");
    veditor.setTheme("ace/theme/xcode");
    veditor.session.setMode("ace/mode/glsl");
    veditor.commands.addCommand({
        name: 'compile',
        bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
        exec: setupShader
    });

    feditor = ace.edit("fshader");
    feditor.setTheme("ace/theme/xcode");
    feditor.session.setMode("ace/mode/glsl");
    feditor.commands.addCommand({
        name: 'compile',
        bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
        exec: setupShader
    });


    if (!initialized)
    {
        initializeGL();

        render_loop = function()
        {
            window.requestAnimationFrame(render_loop, canvas);
            if (animateIt)  animate();
            paintGL();
        };

        initialized = true;
    }

    render_loop();
}


//------------------------------------------------------------------------------


function initializeGL()
{
    canvas = document.getElementById("webgl_canvas");
    gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
	if (!gl)
	{
		alert("Your browser does not support WebGL");
	}

    // some GL settings
    gl.clearColor(1.0, 1.0, 1.0, 0.0);
	gl.enable(gl.DEPTH_TEST);

	// initialize sphere model
	sphere = new Sphere(gl, 30);

	// load texture (texImage defined in HTML)
	tex = new Texture2D(gl, texImage, gl.TEXTURE0);

	// initialize shader program
    setupShader();

	// parameters
    rotateY     = 0.0;
    alpha_test  = true;
}


//------------------------------------------------------------------------------


function setupShader()
{
    var vshader = veditor.getValue();
    var fshader = feditor.getValue();
	shader = new Shader(gl, vshader, fshader);
	shader.bind_attrib_location("v_position", 0);
	shader.bind_attrib_location("v_normal",   1);
	shader.bind_attrib_location("v_texcoord", 2);
	shader.relink();
    shader.use();
	shader.set_uniform_i("alpha_map",   0);
}


//------------------------------------------------------------------------------


function animate()
{
    rotateY = (rotateY + 1) % 360;
}


//------------------------------------------------------------------------------


function paintGL()
{
    if (!tex.ready_) return;

	// viewport
    var ww = canvas.offsetWidth;
    var hh = canvas.offsetHeight;
	var w  = canvas.width;
	var h  = canvas.height;
    if (w!=ww || h!=hh)
    {
        canvas.width  = ww;
        canvas.height = hh;
        w = ww;
        h = hh;
    }
    gl.viewport(0, 0, w, h);


	// modelview and projection matrix (see "library" provided by gl-matrix.js)
	var projection = mat4.perspective(35.0, w/h, 1.0, 10.0);
	var view       = mat4.lookAt( [0,0,5], [0,0,0], [0,1,0] );

    var model = mat4.identity();
    mat4.rotateY(model, (rotateY / 180.0 * Math.PI));

	var mv_matrix  = mat4.multiply(view, model);
	var mvp_matrix = mat4.multiply(projection, mv_matrix);
	var n_matrix   = mat4.toInverseMat3(mv_matrix, n_matrix);
    mat3.transpose(n_matrix);

	// light position
    var light = new Float32Array( [10.0, 10.0, 10.0, 1.0] );

	// set shader uniforms
	shader.use();
	shader.set_uniform_mat4("modelview_projection_matrix", mvp_matrix);
	shader.set_uniform_mat4("modelview_matrix",            mv_matrix);
	shader.set_uniform_mat3("normal_matrix",               n_matrix);
	shader.set_uniform_vec4("light_position",              light);

	// clear window & draw object
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	sphere.draw();
}


//------------------------------------------------------------------------------

