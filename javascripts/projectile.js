"use strict";

var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var g = 9.8;
var animationRate = 40;
var circleRadius = 10;
var circleColors = ['green', 'red', 'blue', 'yellow'];
var circles = [];

resizeCanvas();

function resizeCanvas() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (canvas.width != width ||
     canvas.height != height) {
   canvas.width = width;
   canvas.height = height;
  }
}

function draw(e) {
  var rect = canvas.getBoundingClientRect();

  var s = Math.random()*75;
  var a = Math.random()*Math.PI;
  var c = Math.floor(Math.random()*circleColors.length);

  var circle = {
    elasticity: 0.5,
    angle: a,
    s: s,
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    vx: s * Math.cos(a),
    vy: s * Math.sin(a),
    radius: circleRadius,
    color: circleColors[c],
    points: [{x: e.clientX - rect.left, y: e.clientY - rect.top}],
    draw: function() {

      //DESENHA O CIRCULO
      context.beginPath();
      context.arc(this.x, this.y + this.radius > canvas.height ? canvas.height - this.radius : this.y, this.radius, Math.PI*2, false);
      context.closePath();
      context.fillStyle = this.color;
      context.fill();

      //DESENHA O CAMINHO
      if (this.points.length > 1) {
        context.beginPath();
        context.strokeStyle = this.color;
        var current = this.points[0];
        for (var index = 1; index < this.points.length; index ++) {
          context.moveTo(current.x, current.y);
          context.lineTo(this.points[index].x, this.points[index].y);
          current = this.points[index];
        }
        context.stroke();
        context.closePath();
      }
    }
  }

  circles.push(circle);
}

function animate() {
  context.clearRect(0,0,canvas.width, canvas.height);
  for(var index = 0; index < circles.length; index++) {
    var circle = circles[index];
    circle.draw();

    //VALIDA A COLISÃO COM O CHÃO
    if (circle.y - circle.vy > canvas.height) {
      circle.vy = -circle.vy*circle.elasticity;
      circle.vx = circle.vx*circle.elasticity;
      circle.y = canvas.height;
    }
    else {
      circle.vy -= g;
      circle.y -= circle.vy;
    }

    circle.x += circle.vx;
    circle.points.push({x: circle.x, y: circle.y});
  }
}

window.addEventListener('resize', resizeCanvas);
window.setInterval(animate,animationRate);
