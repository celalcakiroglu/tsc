//Vertex shader program
var VSHADER_SOURCE=
'attribute vec4 a_Position;\n'+
'void main(){\n'+
'gl_Position=a_Position;\n'+
'gl_PointSize=10.0;\n'+
'}\n';
//Fragment shader Program
var FSHADER_SOURCE=
'precision mediump float;\n'+
'uniform vec4 u_FragColor;\n'+
'void main(){\n'+
'gl_FragColor=u_FragColor;\n'+
'}\n';
function main(){
	var canvas = document.getElementById('webgl');
	var gl=getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	else{console.log('success getting the rendering context');}
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}
	else{console.log('success initializing the shaders');}
	var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position<0){
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	else{console.log('success getting the storage location of a_Position');}
	var u_FragColor=gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor){
		console.log('Failed to get the storage location of u_FragColor');
		return;
	}
	else{console.log('success getting the storage location of u_FragColor');}
	canvas.onmousedown=function(ev){click(ev, gl, canvas, a_Position, u_FragColor)};
	gl.clearColor(0.78,0.87,0.88,1.0);//blueish grey
	gl.clear(gl.COLOR_BUFFER_BIT);
	
}
var g_points=[]; 
var g_colors=[];
function click(ev, gl, canvas, a_Position, u_FragColor){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect=ev.target.getBoundingClientRect();//Gets the position of canvas in the client area
	x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
	y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
	g_points.push([x,y]);
	gl.clear(gl.COLOR_BUFFER_BIT);
	if(x>=0.0 && y>=0.0){
		g_colors.push([1.0, 0.0, 0.0, 1.0]); //red
	}
	else if(x<0.0 && y<0.0){
		g_colors.push([0.0, 1.0, 0.0, 1.0]); // green
	}
	else{
		g_colors.push([0.5, 0.0, 1.0, 1.0]); 
	}
	console.log('g_points.length = '+g_points.length);
	console.log('g_colors.length = '+g_colors.length);
	for(var i=0; i < g_points.length; i++){
		console.log(i);
		gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
		gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3]);
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}