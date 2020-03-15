//=============================================================================
//                                                                            
//   Exercise code for the lecture "Introduction to Computer Graphics"
//     by Prof. Mario Botsch, Bielefeld University
//
//   Based on exercise code for the lecture "Computer Graphics II"
//     by Prof. Hartmut Schirmacher, Beuth Hochschule fuer Technik Berlin
//
//   Copyright (C) 2011/2012  by
//     Mario Botsch, Computer Graphics Group, Bielefeld University
//     Hartmut Schirmacher, Beuth Hochschule fuer Technik Berlin
//
//=============================================================================


Texture2D = function(gl, filename, unit) 
{
    // WebGL context and texture object
    this.gl_     = gl;
    this.unit_   = unit;
    this.ready_  = false;

    // the image object including the file name
    var image = new Image();
    image.src = filename;
	image.texture = this;
	
    // event handler to set up the texture once it is loaded
    image.onload = function() 
    {
        // "this" refers to the image object in this method
        var texture = this.texture;
        var gl = texture.gl_;

        // create texture
        gl.activeTexture(texture.unit_);
        var tex = gl.createTexture();
        
        // assign image data 
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
        
        // default configuration
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        texture.ready_ = true;
    }
}
