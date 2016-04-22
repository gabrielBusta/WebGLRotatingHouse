var canvas;
var gl;
var program;
var vColor;
var vPosition;

var sl = vec3(1, 1, 1);
var scalingStep = 0.2;
var slLoc;

var rotating = false;
var theta = vec3(0, 0, 0);
var rotatingStep = 2.0;
var thetaLoc;

var translating = false;
var tl = vec3(1, 1, 1);
var translatingStep = 0.2;
var tlLoc;
var axis = 0;
var components;
//var modelMatrix = new Matrix4();


window.onload = function init() {
  initWebGL();
  initComponents();
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
	
	//Rotation Animation
	if(rotating == true){
			theta[axis] += rotatingStep;
			console.log('rotating...');
		}
	//Translation Animation
	if(translating == true){
			tl[axis] += translatingStep; // X or Y
			console.log('translating...');
		}
	// Idle Animation
	if (!rotating && !translating) {
    sl[xAxis] += scalingStep;
    sl[yAxis] += scalingStep;
   // sl[zAxis] += scalingStep;
	
    /**
    * The scaling factors are the same for each of the axes,
    * therefore we only have to check the following condition
    * on one of them. We've arbitrarily chosen the xAxis.
    * When the scaling factors reach 100 we reverse the
    * step. When they reach 0 we reverse the step again.
    */
    if (sl[xAxis] > 100) {
      scalingStep = -scalingStep;
    }
    if (sl[xAxis] < 0) {
      scalingStep = -scalingStep;
    }
  }

  gl.uniform3fv(thetaLoc, theta);
  gl.uniform3fv(slLoc, sl);
  gl.uniform3fv(tlLoc, tl);

  for (var i = 0; i < components.length; i++) {
    draw(components[i]);
  }

  requestAnimFrame(render);
}

function draw(GeometricObject) {
  var points = [];
  var colors = [];

  for (var i = 0; i < GeometricObject.n; ++i) {
    points.push(GeometricObject.vertices[i]);
    colors.push(GeometricObject.color);
  }

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  if (GeometricObject instanceof Circle) {
    gl.drawArrays(gl.TRIANGLE_FAN, 0, GeometricObject.n);
  } else {
    gl.drawArrays(gl.TRIANGLES, 0, GeometricObject.n);
  }
}

function initComponents() {
  var newComponent;
	var x_origin; // temp vars to make components easier to pinpoint on image
	var y_origin; 
	var obj_hieght;
	var obj_width;
	var obj_radius;
  components = []; // list of all components for house construction

	// Door knob
	x_origin = -0.00375;
	y_origin = -0.0006;
	obj_radius = 0.0001;
  newComponent = new Circle(Color.Black, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
  // We count the bushes from left to right
  // First bush
	x_origin = -0.0055;
	y_origin = -0.00175;
	obj_radius = 0.001;
  newComponent = new Circle(Color.Bush_Green, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
  // Second bush
	x_origin = -0.002;
	y_origin = -0.0020;
	obj_radius = 0.00075;
  newComponent = new Circle(Color.Bush_Green, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
  // Third bush
	x_origin = 0.0000;
	y_origin = -0.0020;
	obj_radius = 0.00075;
  newComponent = new Circle(Color.Bush_Green, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
  // Fourth bush
	x_origin = 0.002;
	y_origin = -0.0020;
	obj_radius = 0.00075;
 newComponent = new Circle(Color.Bush_Green, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
  // Fifth bush
	x_origin = 0.004;
	y_origin = -0.0020;
	obj_radius = 0.00075;
  newComponent = new Circle(Color.Bush_Green, 
														vec3(x_origin, y_origin, -0.0000002),
														obj_radius);
  components.push(newComponent);
	
	
	// Step in front of the door
  x_origin = -0.004;
	y_origin = -0.00225;
	obj_width = 0.0020;
	obj_hieght = 0.0005;
  newComponent = new Square(Color.Gray,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000002), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), -0.0000002),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , -0.0000002),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), -0.0000002));
  components.push(newComponent);
	
 // Chimney
  x_origin = 0.0035;
	y_origin = 0.003;
	obj_width = 0.00125;
	obj_hieght = 0.001;
  newComponent = new Square(Color.Gray,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), 0.0000001), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), 0.0000001),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , 0.0000001),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), 0.0000001));
  components.push(newComponent);
	
  // Roof
  x_origin = 0.0;
	y_origin = 0.0035;
	obj_width = 0.01;
	obj_hieght = 0.002;
  newComponent = new Triangle(Color.Gray,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000001), 
                            vec3(x_origin - (obj_width/2), y_origin - (obj_hieght/2), -0.0000001),
                            vec3(x_origin + (obj_width/2) + 0.001,y_origin - (obj_hieght/2) , -0.0000001)),
  components.push(newComponent); 
	
	// Rightmost window
  x_origin = 0.002;
	y_origin = -0.0004;
	obj_width = 0.0055;
	obj_hieght = 0.0032;
  newComponent = new Square(Color.Sky_Blue,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000001), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), -0.0000001),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , -0.0000001),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), -0.0000001));
  components.push(newComponent);
	
	// Middle window
  x_origin = -0.00145;
	y_origin = -0.0004;
	obj_width = 0.00075;
	obj_hieght = 0.0032;
  newComponent = new Square(Color.Sky_Blue,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000001), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), -0.0000001),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , -0.0000001),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), -0.0000001));
  components.push(newComponent);
	
  
	
	// Leftmost window
	x_origin = -0.0025;
	y_origin = -0.0004;
	obj_width = 0.00075;
	obj_hieght = 0.0032;
  newComponent = new Square(Color.Sky_Blue,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000001), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), -0.0000001),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , -0.0000001),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), -0.0000001));
  components.push(newComponent);
	
	// Door
	x_origin = -0.004;
	y_origin = -0.0005;
	obj_width = 0.00125;
	obj_hieght = 0.004;
  newComponent = new Square(Color.Navy_Blue,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), -0.0000001), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), -0.0000001),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , -0.0000001),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), -0.0000001));
   components.push(newComponent); 
	 
  // Wall
	x_origin = 0.000;
	y_origin = 0.000;
	obj_width = 0.01;
	obj_hieght = 0.005;
  newComponent = new Square(Color.White,
                            vec3(x_origin -  (obj_width/2), y_origin + (obj_hieght/2), 0.00), 
                            vec3(x_origin + (obj_width/2), y_origin + (obj_hieght/2), 0.00),
                            vec3(x_origin + (obj_width/2),y_origin - (obj_hieght/2) , 0.00),
                            vec3(x_origin - (obj_width/2),y_origin - (obj_hieght/2), 0.00));
  components.push(newComponent); 
  

	
  
  
  
	
	
	
	
	
	
	
}

window.onkeydown = function(e) {
  if (e.keyCode == up) {
    translating = true;
		axis = yAxis;
		translatingStep = 0.2;
  } else if (e.keyCode == down) {
    translating = true;
		axis = yAxis;
		translatingStep = -0.2;
  } else if (e.keyCode == left) {
    translating = true;
		axis = xAxis;
		translatingStep = -0.2;
  } else if (e.keyCode == right) {
    translating = true;
		axis = xAxis;
		translatingStep = 0.2;
  } else if (e.keyCode == x) {
    rotating = true;
    axis = xAxis;
  } else if (e.keyCode == y) {;
    rotating = true;
    axis = yAxis;
  } else if (e.keyCode == z) {
    rotating = true;
		axis = zAxis;
  }
};

window.onkeyup = function(e) {
  if (e.keyCode == up) {
    translating = false;
  } else if (e.keyCode == down) {
    translating = false;
  } else if (e.keyCode == left) {
    translating = false;
  } else if (e.keyCode == right) {
    translating = false;
  } else if (e.keyCode == x) {
    rotating = false;
  } else if (e.keyCode == y) {
    rotating = false;
  } else if (e.keyCode == z) {
    rotating = false;
  }
};

function initWebGL() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(Color.Sky_Blue[0], Color.Sky_Blue[1], Color.Sky_Blue[2], Color.Sky_Blue[2]);

  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  thetaLoc = gl.getUniformLocation(program, "theta");
  slLoc = gl.getUniformLocation(program, "sl");
  tlLoc = gl.getUniformLocation(program, "tl");

  vColor = gl.getAttribLocation(program, "vColor");

  vPosition = gl.getAttribLocation(program, "vPosition");
}
