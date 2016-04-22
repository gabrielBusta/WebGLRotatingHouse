// Color dictionary
var Color = {
  Black: vec4(0.0, 0.0, 0.0, 1.0),
  Gray: vec4(0.5, 0.5, 0.5, 1.0),
  Red: vec4(1.0, 0.0, 0.0, 1.0),
  Yellow: vec4(1.0, 1.0, 0.0, 1.0),
  Green: vec4(0.0, 1.0, 0.0, 1.0),
  Bush_Green: vec4(0.34, 0.47, 0.14, 1.0),
  Sky_Blue: vec4(0.6, 0.85, 0.91, 1.0),
  Navy_Blue: vec4(0.43, 0.57, 0.74, 1.0),
  Magenta: vec4(1.0, 0.0, 1.0, 1.0),
  White: vec4(1.0, 1.0, 1.0, 1.0),
  Cyan: vec4(0.0, 1.0, 1.0, 1.0) 
};

// Axis enumeration
var x = 0;
var y = 1;
var z = 2;

// Key codes
var xkey = 88, ykey = 89, zkey = 90;

/*********************
 * Geometric Objects *
 ********************/

class Square {
  constructor(color, v0, v1, v2, v3) {
    this.color = color;

    this.vertices = [];
    
    // First triangle
    this.vertices.push(v0);
    this.vertices.push(v1);
    this.vertices.push(v2);
    
    // Second triangle
    this.vertices.push(v0);
    this.vertices.push(v2);
    this.vertices.push(v3);
    this.n = this.vertices.length;
  }
}

// Use triangle fan to render circles
class Circle {
  constructor(color, origin, radius) {  
    this.color = color;

    this.vertices = [];
    this.vertices.push(origin);

    var x, y;
    
    var gamma = 0;
    while (gamma < 360) {
      x = radius * Math.cos(gamma) + origin[0];
      y = radius * Math.sin(gamma) + origin[1];
      this.vertices.push(vec3(x, y, origin[2]));
      gamma += 0.1;
    }

    this.n = this.vertices.length;
  }
}

class Triangle {
  constructor(color, v0, v1, v2) {
    this.color = color;

    this.vertices = [];
    
    this.vertices.push(v0);
    this.vertices.push(v1);
    this.vertices.push(v2);

    this.n = this.vertices.length; 
  }
}