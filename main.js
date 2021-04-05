TweenLite.defaultEase = Linear.easeNone;


var svgns = "http://www.w3.org/2000/svg";
var root  = document.querySelector("svg");
var ease  = 0.1;
var total = 25;
var lineEase=0.00002;
var linecolor='yellow';

var colors = ["#EA4335"];

colors.forEach(function(color) {
  
  var leader = createPoint(color);
  var line = leader;
  console.log('leader: ',leader);
  
  var i = total;  
  while (i--) {
    var alpha = (i + 1) / total;
    leader = createLine(leader, alpha, color);
    line=createLine1(leader,alpha,linecolor);
  }
});

TweenLite.from("line, circle", 1.5, { alpha: 0 });



function createPoint(fill) {
  
  var circle = document.createElementNS(svgns, "circle");
  root.appendChild(circle);
  
  // var radius = random(75, 500);
  
  TweenLite.set(circle, {
    attr: { r: 9.5, fill: fill },
    x: 0,
    y: 400
  });

  // TweenMax.to(circle, 8, {
  //   x: 400,
  //   y: 0
  // })
  TweenMax.to(circle, 8, {
    bezier: {
      type: "cubic",
      values: [
        { x: 0, y: 400 },
        { x: 400, y: 400},
        { x: 400*(Math.random(0,10)), y: 400*(Math.random(0,10)) },
        { x: 400, y: 0 },
        
      ],
    },
  });
  return circle._gsTransform;
}


function createLine(leader, alpha, stroke) {
  
  var line = document.createElementNS(svgns, "line");
  root.appendChild(line);
  
  TweenLite.set(line, {
    alpha: alpha,
    stroke: stroke,
    x: 0,
    y: 400
  });
    
  var pos = line._gsTransform;
  
  TweenMax.to(line, 1000, {
    x: "+=1",
    y: 50,
    // repeat: -1,
    modifiers: {
      x: function(x) {        
        x = pos.x + (leader.x - pos.x) * ease;
        line.setAttribute("x2", leader.x - x);
        return x;
      },
      y: function(y) {        
        y = pos.y + (leader.y - pos.y) * ease;
        line.setAttribute("y2", leader.y - y);
        return y;
      }
    }
  });  
  
  return pos;
}

function createLine1(leader, alpha, stroke) {
  
  var line = document.createElementNS(svgns, "line");
  root.appendChild(line);
  
  TweenLite.set(line, {
    alpha: alpha,
    stroke: stroke,
    x: 0,
    y: 400
  });
    
  var pos = line._gsTransform;
  
  TweenMax.to(line, 1000, {
    x: "+=1",
    y: 50,
    // repeat: -1,
    modifiers: {
      x: function(x) {        
        x = pos.x + (leader.x - pos.x) * lineEase ;
        line.setAttribute("x2", leader.x - x);
        return x;
      },
      y: function(y) {        
        y = pos.y + (leader.y - pos.y) * lineEase;
        line.setAttribute("y2", leader.y - y);
        return y;
      }
    }
  });  
  
  return pos;
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}
