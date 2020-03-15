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


Shader = function(gl, vsource, fsource) 
{
    // remember WebGL context
    this.gl_ = gl;

    // create a new WebGL program object
    this.pid_ = gl.createProgram();
    
    // compile and attach vertex shader
	this.vid_ = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(this.vid_, vsource);
    gl.compileShader(this.vid_);
	var compiled = gl.getShaderParameter(this.vid_, gl.COMPILE_STATUS);
	if (!compiled) 
	{
		var error = gl.getShaderInfoLog(this.vid_);
		alert("Shader: cannot compile vertex shader\n" + error);
	}
	
    // compile and attach fragment shader
	this.fid_ = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(this.fid_, fsource);
    gl.compileShader(this.fid_);
	var compiled = gl.getShaderParameter(this.fid_, gl.COMPILE_STATUS);
	if (!compiled) 
	{
		var error = gl.getShaderInfoLog(this.fid_);
		alert("Shader: cannot compile fragment shader\n" + error);
	}
    
    // link the program so it can be used
    gl.attachShader(this.pid_, this.vid_);
    gl.attachShader(this.pid_, this.fid_);
    gl.linkProgram(this.pid_);
	var linked = gl.getProgramParameter(this.pid_, gl.LINK_STATUS);
	if (!linked) 
	{
		var error = gl.getProgramInfoLog(this.pid_);
		alert("Shader: cannot link shader\n" + error);
		return;
	}
    
    console.log("shader ok");
}


//-----------------------------------------------------------------------------


Shader.prototype.bind_attrib_location = function(name, loc)
{
	var gl = this.gl_;
	gl.bindAttribLocation(this.pid_, loc, name);
}


//-----------------------------------------------------------------------------


Shader.prototype.relink = function()
{
	var gl = this.gl_;
    
    gl.linkProgram(this.pid_);
	var linked = gl.getProgramParameter(this.pid_, gl.LINK_STATUS);
	if (!linked) 
	{
		var error = gl.getProgramInfoLog(this.pid_);
		alert("Shader: cannot link shader\n" + error);
		return;
	}
}


//-----------------------------------------------------------------------------


Shader.prototype.set_uniform_i = function(name, value) 
{
	var gl = this.gl_;
    var loc = gl.getUniformLocation(this.pid_, name);
    if (loc == null) return false;    
    gl.uniform1i(loc, value);
    return true;
}


//-----------------------------------------------------------------------------


Shader.prototype.set_uniform_mat4 = function(name, value) 
{
	var gl = this.gl_;
    var loc = gl.getUniformLocation(this.pid_, name);
    if (loc == null) return false;
    gl.uniformMatrix4fv(loc, false, value);
    return true;
}


//-----------------------------------------------------------------------------


Shader.prototype.set_uniform_mat3 = function(name, value) 
{
	var gl = this.gl_;
    var loc = gl.getUniformLocation(this.pid_, name);
    if (loc == null) return false;
    gl.uniformMatrix3fv(loc, false, value);
    return true;
}


//-----------------------------------------------------------------------------


Shader.prototype.set_uniform_vec3 = function(name, value) 
{
	var gl = this.gl_;
    var loc = gl.getUniformLocation(this.pid_, name);
    if (loc == null) return false;
    gl.uniform3fv(loc, value);
    return true;
}


//-----------------------------------------------------------------------------


Shader.prototype.set_uniform_vec4 = function(name, value) 
{
	var gl = this.gl_;
    var loc = gl.getUniformLocation(this.pid_, name);
    if (loc == null) return false;
    gl.uniform4fv(loc, value);
    return true;
}


//-----------------------------------------------------------------------------


Shader.prototype.use = function()
{
	var gl = this.gl_;
	gl.useProgram(this.pid_);
}


//=============================================================================
