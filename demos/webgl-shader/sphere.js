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


Sphere = function(gl, resolution) 
{
    // remember WebGL context
    this.gl_ = gl;
    
    
	// sphere resolution & co
    var v_resolution =     resolution;
    var u_resolution = 2 * resolution;
    var n_vertices   = v_resolution * u_resolution;
    var n_triangles  = 2 * (v_resolution-1) * (u_resolution-1);
    
    
	// arrays for positions, normals, texcoords, indices
    var positions = new Float32Array(3*n_vertices);
    var normals   = new Float32Array(3*n_vertices);
    var texcoords = new Float32Array(2*n_vertices);
    var indices   = new Uint16Array(3*n_triangles);
    
    
	// indices for filling the arrays
    var p=0, n=0, t=0, i=0;
    
    // local variables for the following loops
    // (JavaScript doesn't know local scopes. These variables are global
    // for the function, no matter where we declare them)
    var u, v, theta, phi, x, y, z, i0, i1, i2, i3;
    
    
	// generate vertex positions
    for (var iv=0; iv<v_resolution; ++iv)
    {
        for (var iu=0; iu<u_resolution; ++iu)
        {
            u = iu / (u_resolution-1);
            v = iv / (v_resolution-1);
            
            theta = u * 2.0 * Math.PI;
            phi   = v * Math.PI;
            
            x = Math.cos(theta) * Math.sin(phi);
            y = Math.cos(phi);
            z = Math.sin(theta) * Math.sin(phi);
            
            positions[p++] = x;
            positions[p++] = y;
            positions[p++] = z;
            
            normals[n++] = x;
            normals[n++] = y;
            normals[n++] = z;
            
            texcoords[t++] = 1.0-u;
            texcoords[t++] = 1.0-v;
        }
    }
    
    
    // generate triangles
    for (var v=0; v<v_resolution-1; ++v)
    {
        for (var u=0; u<u_resolution-1; ++u)
        {
            i0 = (u  ) + (v  ) * u_resolution;
            i1 = (u+1) + (v  ) * u_resolution;
            i2 = (u+1) + (v+1) * u_resolution;
            i3 = (u  ) + (v+1) * u_resolution;
            
            indices[i++] = i0;
            indices[i++] = i1;
            indices[i++] = i2;
            
            indices[i++] = i0;
            indices[i++] = i2;
            indices[i++] = i3;
        }
    }
    
    
	
	// positions -> location 0
	this.vbo_ = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo_);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(0);
	
	
	// normals -> location 1
	this.nbo_ = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.nbo_);
	gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(1);
	
	
	// texcoords -> location 2
	this.tbo_ = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo_);
	gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
	gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(2);
	
	
	// index array
	this.ibo_ = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo_);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	this.ibo_.n_indices = 3*n_triangles; // dirty JavaScript allows to add variables to ibo_
}


//-----------------------------------------------------------------------------


Sphere.prototype.draw = function()
{
	var gl = this.gl_;
    
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo_);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.nbo_);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(1);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo_);
	gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(2);
    
	gl.drawElements(gl.TRIANGLES, this.ibo_.n_indices, gl.UNSIGNED_SHORT, 0);
}


//=============================================================================
