var canvas = document.getElementById('surf')
var ctx = canvas.getContext('2d')
var W = canvas.width
var H = canvas.height

var pi = Math.PI
var sin = Math.sin
var cos = Math.cos
var sqrt = Math.sqrt
var mpos = {x: 0, y: 0}
lpos = mpos
var spin = 0


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left - rect.width/2,
    y: evt.clientY - rect.top - rect.height/2}
};
function drawCircle(x,y,r) {
  ctx.beginPath()
  ctx.arc(x,y,r,0,2*Math.PI)
  ctx.fill()
};
function drawLine(x0,y0,x1,y1) {
  ctx.beginPath()
  ctx.moveTo(x0,y0)
  ctx.lineTo(x1,y1)
  ctx.stroke()
};
function plotPoint(pt,r) {
  var r = r
  var i = pt[1]
  var j = pt[2]
  var k = pt[3]
  var x = W/2+j*W/4*1.8
  var y = H/2-i*W/4*1.8
  drawCircle(x,y,r)
};
function mmove(evt) {
  lpos = mpos
  mpos = getMousePos(canvas,evt)
};
window.addEventListener('mousemove',mmove,false)
var mouseDown = 0;
canvas.onmousedown = function() { 
  spin = 1;
}
document.body.onmouseup = function() {
  spin = 0;
}
function resetButtons() {
  document.getElementById('tet').style.background = '#101010'
  document.getElementById('hex').style.background = '#101010'
  document.getElementById('oct').style.background = '#101010'
  document.getElementById('dod').style.background = '#101010'
  document.getElementById('ico').style.background = '#101010'
}
document.body.onkeydown = function(evt) {
  if ((evt.which>48)&&(evt.which<54)) {
    obj = (evt.which+1)%5
    switch(obj) {
      case 0: 
        document.getElementById('label').innerHTML=':tetrahedron:'; resetButtons()
        document.getElementById('tet').style.background='#202020'; break;
      case 1: 
        document.getElementById('label').innerHTML=':hexahedron:'; resetButtons()
        document.getElementById('hex').style.background='#202020'; break;
      case 2: 
        document.getElementById('label').innerHTML=':octohedron:'; resetButtons()
        document.getElementById('oct').style.background='#202020'; break;
      case 3: 
        document.getElementById('label').innerHTML=':dodecahedron:'; resetButtons()
        document.getElementById('dod').style.background='#202020'; break;
      case 4: 
        document.getElementById('label').innerHTML=':icosahedron:'; resetButtons()
        document.getElementById('ico').style.background='#202020'; break;}
  }
}
function loadTetra() {
  obj = 0; document.getElementById('label').innerHTML=':tetrahedron:';
  resetButtons(); document.getElementById('tet').style.background='#202020';}
function loadHexa() {
  obj = 1; document.getElementById('label').innerHTML=':hexahedron:'; 
  resetButtons(); document.getElementById('hex').style.background='#202020';};
function loadOcto() {
  obj = 2; document.getElementById('label').innerHTML=':octohedron:'; 
  resetButtons(); document.getElementById('oct').style.background='#202020';;};
function loadDodeca() {
  obj = 3; document.getElementById('label').innerHTML=':dodecahedron:'; 
  resetButtons(); document.getElementById('dod').style.background='#202020';};
function loadIcosa() {
  obj = 4; document.getElementById('label').innerHTML=':icosahedron:'; 
  resetButtons(); document.getElementById('ico').style.background='#202020'};


function norm (q) {
  var mag = sqrt(q[0]*[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3])
  return [0,q[1]/mag,q[2]/mag,q[3]/mag]}

function rota (q) {
  var mag = sqrt(q[0]*[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3])
  return [1,q[1]/mag,q[2]/mag,q[3]/mag]}




var pt0 = [0,1,0,0]
var pt1 = [0,0.7071,0.7071,0]
var pt2 = [0,-0.7071,0.7071,0,0]
var q0,q1,q2
var t = 0
obj = Math.floor(Math.random()*5)

or = [0,0,1,0]
ri = [0,1,0,0]

function createAxis () {
  return [[0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]]};
function rotateAxis (axis,rot) {
  axis[0] = norm(mult(axis[0],rot))
  axis[1] = norm(mult(axis[1],rot))
  axis[2] = norm(mult(axis[1],axis[0]))
  axis[1] = norm(mult(axis[0],axis[2]))
  return axis};

function axisTetra(axis) {
  ang = 120
  pt0 = axis[0]
  pt1 = rotate(pt0,rota(axis[2]),109)
  pt2 = rotate(pt1,rota(axis[0]),ang)
  pt3 = rotate(pt1,rota(axis[0]),360-ang)
  return [pt0,pt1,pt2,pt3]}

function axisOcto(axis) {
  set = []
  for (n=0;n<3;n++) {
    set.push(axis[n])
    set.push(conj(axis[n]))}
  return set};

function axisHexa(axis) {
  ang = Math.acos(2/(Math.sqrt(2)*Math.sqrt(3)))*360/(Math.PI)
  pt0 = axis[0]
  pt1 = rotate(pt0,rota(axis[2]),ang)
  pt2 = rotate(pt1,rota(axis[0]),120)
  pt3 = rotate(pt2,rota(axis[0]),120)
  pt4 = conj(pt0)
  pt5 = rotate(pt4,rota(axis[2]),ang)
  pt6 = rotate(pt5,rota(axis[0]),120)
  pt7 = rotate(pt6,rota(axis[0]),120)
  return [pt0,pt1,pt2,pt3,pt4,pt5,pt6,pt7]}

function axisIcosa(axis) {
  ang = 63
  pt0 = axis[0]
  pt1 = rotate(pt0,rota(axis[2]),ang)
  pt2 = rotate(pt1,rota(axis[0]),72)
  pt3 = rotate(pt2,rota(axis[0]),72)
  pt4 = rotate(pt3,rota(axis[0]),72)
  pt5 = rotate(pt4,rota(axis[0]),72)
  pt6 = conj(pt0)
  pt7 = rotate(pt6,rota(axis[2]),ang)
  pt8 = rotate(pt7,rota(axis[0]),72)
  pt9 = rotate(pt8,rota(axis[0]),72)
  pt10 = rotate(pt9,rota(axis[0]),72)
  pt11 = rotate(pt10,rota(axis[0]),72)
  return [pt0,pt1,pt2,pt3,pt4,pt5,pt6,pt7,pt8,pt9,pt10,pt11]}

function axisDodeca(axis) {
  ang  = 41
  ang2 = 69
  ang3 = 22
  pt0  = axis[0]
  pt1  = rotate(pt0,rota(axis[2]),ang)
  pt2  = rotate(pt1,rota(axis[0]),120)
  pt3  = rotate(pt2,rota(axis[0]),120)
  pt4  = rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]), ang3)
  pt5  = rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]),360-ang3)
  pt6  = rotate(rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]),120),rota(axis[0]), ang3)
  pt7  = rotate(rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]),120),rota(axis[0]),360-ang3)
  pt8  = rotate(rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]),240),rota(axis[0]), ang3)
  pt9  = rotate(rotate(rotate(pt1,rota(axis[2]),ang2),rota(axis[0]),240),rota(axis[0]),360-ang3)
  pt10 = conj(pt0)
  pt11 = rotate(pt10,rota(axis[2]),ang)
  pt12 = rotate(pt11,rota(axis[0]),120)
  pt13 = rotate(pt12,rota(axis[0]),120)
  pt14  = rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]), ang3)
  pt15  = rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]),360-ang3)
  pt16  = rotate(rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]),120),rota(axis[0]), ang3)
  pt17  = rotate(rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]),120),rota(axis[0]),360-ang3)
  pt18  = rotate(rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]),240),rota(axis[0]), ang3)
  pt19  = rotate(rotate(rotate(pt11,rota(axis[2]),ang2),rota(axis[0]),240),rota(axis[0]),360-ang3)
  return [pt0,pt1,pt2,pt3,pt4,pt5,pt6,pt7,pt8,pt9,pt10,pt11,pt12,pt13,pt14,pt15,pt16,pt17,pt18,pt19]}

function conj (q) {
  return [q[0],-q[1],-q[2],-q[3]]}

function plotPts (pts,r) {
  for (i=0;i<pts.length;i++) {
    plotPoint(pts[i],r)}}

shape  = createAxis()
var rx = 0
var ry = 0
rot = [1,Math.random()*6,Math.random()*6,0]
shape = rotateAxis(shape,rot)


function add(a,b) {
  var c =[0,0,0,0]
  for (n=0;n<4;n++) {
    c[n] = a[n]+b[n]}
  return c}

function min(a,b) {
  var c =[0,0,0,0]
  for (n=0;n<4;n++) {
    c[n] = a[n]-b[n]}
  return c}

function project () {  
  ctx.globalAlpha=1;
  ctx.clearRect(0,0,W,H)
  ctx.fillStyle = '#090909'
  ctx.fillRect(0,0,W,H)
  ctx.strokeStyle = '#222222'
  ctx.lineWidth = 1.5
  ctx.fillStyle = '#101010'
  drawCircle(W/2,H/2,(W/2)*0.935)
  ctx.fillStyle = '#000000'
  drawCircle(W/2,H/2,(W/2)*0.9)
  ctx.strokeStyle = '#333333'
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  if (spin==1) {
    rx = (lpos.x-mpos.x)
    ry = (lpos.y-mpos.y)
    rot = [1,rx/40,ry/40,0]
    shape = rotateAxis(shape,rot)
  } else {
    var sp = 0.015
    rx += sp*(Math.random()*2-1)
    ry += sp*(Math.random()*2-1)
    rx = rx/1.01
    ry = ry/1.01
    rot = [1,rx/20,ry/20,0]
    shape = rotateAxis(shape,rot)};
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#001133'
  if (obj==0) {drawHedron(axisTetra(shape))}
  if (obj==1) {drawHedron(axisHexa(shape))}
  if (obj==2) {drawHedron(axisOcto(shape))}
  if (obj==3) {drawHedron(axisDodeca(shape))}
  if (obj==4) {drawHedron(axisIcosa(shape))}
    ctx.fillStyle = '#001133'
  if (obj==0) {plotPts(axisTetra(shape),6)}
  if (obj==1) {plotPts(axisHexa(shape),6)}
  if (obj==2) {plotPts(axisOcto(shape),6)}
  if (obj==3) {plotPts(axisDodeca(shape),6)}
  if (obj==4) {plotPts(axisIcosa(shape),6)}
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#115566'
  if (obj==0) {drawHedron(axisTetra(shape))}
  if (obj==1) {drawHedron(axisHexa(shape))}
  if (obj==2) {drawHedron(axisOcto(shape))}
  if (obj==3) {drawHedron(axisDodeca(shape))}
  if (obj==4) {drawHedron(axisIcosa(shape))}
  ctx.fillStyle = '#115566'
  if (obj==0) {plotPts(axisTetra(shape),4)}
  if (obj==1) {plotPts(axisHexa(shape),4)}
  if (obj==2) {plotPts(axisOcto(shape),4)}
  if (obj==3) {plotPts(axisDodeca(shape),4)}
  if (obj==4) {plotPts(axisIcosa(shape),4)}
      ctx.fillStyle = '#aabbcc'
  if (obj==0) {plotPts(axisTetra(shape),2)}
  if (obj==1) {plotPts(axisHexa(shape),2)}
  if (obj==2) {plotPts(axisOcto(shape),2)}
  if (obj==3) {plotPts(axisDodeca(shape),2)}
  if (obj==4) {plotPts(axisIcosa(shape),2)}
  ctx.globalAlpha=0.12;
  ctx.fillStyle = '#553300'
  ctx.fillRect(0,0,W,H);
  t++
  if (1) {setTimeout(project,50)}
  lpos = {x: mpos.x,y: mpos.y}}
  project()

function mult(a,b) {
  return [(a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3]),(a[0]*b[1] + a[1]*b[0] + a[2]*b[3] - a[3]*b[2]),
         (a[0]*b[2] - a[1]*b[3] + a[2]*b[0] + a[3]*b[1]),(a[0]*b[3] + a[1]*b[2] - a[2]*b[1] + a[3]*b[0])]}

function drawHedron (pts) {
  if (pts.length==4) {
    drawEdge(pts[0],pts[1]); drawEdge(pts[0],pts[2]); drawEdge(pts[0],pts[3]);
    drawEdge(pts[2],pts[1]); drawEdge(pts[3],pts[1]); drawEdge(pts[2],pts[3]); 
  } else if (pts.length==6) {
    drawEdge(pts[0],pts[2]); drawEdge(pts[0],pts[3]); drawEdge(pts[0],pts[4]); 
    drawEdge(pts[0],pts[5]); drawEdge(pts[3],pts[4]); drawEdge(pts[4],pts[2]); 
    drawEdge(pts[2],pts[5]); drawEdge(pts[5],pts[3]); drawEdge(pts[1],pts[2]); 
    drawEdge(pts[1],pts[3]); drawEdge(pts[1],pts[4]); drawEdge(pts[1],pts[5]); 
  } else if (pts.length==8) {
    drawEdge(pts[0],pts[1]); drawEdge(pts[0],pts[2]);
    drawEdge(pts[0],pts[3]); drawEdge(pts[1],pts[7]); 
    drawEdge(pts[1],pts[6]); drawEdge(pts[2],pts[7]); 
    drawEdge(pts[2],pts[5]); drawEdge(pts[3],pts[6]); 
    drawEdge(pts[3],pts[5]); drawEdge(pts[4],pts[7]); 
    drawEdge(pts[4],pts[6]); drawEdge(pts[4],pts[5]); 
  } else if (pts.length==12) {
    drawEdge(pts[0],pts[1]); drawEdge(pts[0],pts[2]); drawEdge(pts[0],pts[3]); 
    drawEdge(pts[0],pts[4]); drawEdge(pts[0],pts[5]); drawEdge(pts[2],pts[1]); 
    drawEdge(pts[3],pts[2]); drawEdge(pts[4],pts[3]); drawEdge(pts[5],pts[4]); 
    drawEdge(pts[1],pts[5]); drawEdge(pts[6],pts[7]); drawEdge(pts[6],pts[8]); 
    drawEdge(pts[6],pts[9]); drawEdge(pts[6],pts[10]); drawEdge(pts[6],pts[11]); 
    drawEdge(pts[8],pts[7]); drawEdge(pts[9],pts[8]); drawEdge(pts[10],pts[9]); 
    drawEdge(pts[11],pts[10]); drawEdge(pts[7],pts[11]); drawEdge(pts[7],pts[4]); 
    drawEdge(pts[8],pts[5]); drawEdge(pts[9],pts[1]); drawEdge(pts[10],pts[2]); 
    drawEdge(pts[11],pts[3]); drawEdge(pts[7],pts[3]); drawEdge(pts[8],pts[4]); 
    drawEdge(pts[9],pts[5]); drawEdge(pts[10],pts[1]); drawEdge(pts[11],pts[2]); 
  } else if (pts.length==20) {
    drawEdge(pts[0],pts[1]);
    drawEdge(pts[0],pts[2]);
    drawEdge(pts[0],pts[3]);
    drawEdge(pts[1],pts[16]); drawEdge(pts[1],pts[19]); 
    drawEdge(pts[2],pts[15]); drawEdge(pts[2],pts[18]); 
    drawEdge(pts[3],pts[14]); drawEdge(pts[3],pts[17]); 
    drawEdge(pts[19],pts[18]); drawEdge(pts[15],pts[14]); 
    drawEdge(pts[17],pts[16]); drawEdge(pts[19],pts[4]); 
    drawEdge(pts[15],pts[6]); drawEdge(pts[17],pts[8]); 
    drawEdge(pts[10],pts[11])
    drawEdge(pts[10],pts[12])
    drawEdge(pts[10],pts[13])
    drawEdge(pts[11],pts[6]); drawEdge(pts[11],pts[9]); 
    drawEdge(pts[12],pts[5]); drawEdge(pts[12],pts[8]); 
    drawEdge(pts[13],pts[4]); drawEdge(pts[13],pts[7]); 
    drawEdge(pts[9],pts[8]); drawEdge(pts[5],pts[4]); 
    drawEdge(pts[7],pts[6]); drawEdge(pts[9],pts[14]); 
    drawEdge(pts[5],pts[16]); drawEdge(pts[7],pts[18]); }
}
function drawEdge(q0,q1) {
  s =1.8
  x0= W/2+q0[2]*W/4*s;  y0= H/2-q0[1]*W/4*s;
  x1= W/2+q1[2]*W/4*s;  y1= H/2-q1[1]*W/4*s;

  ctx.beginPath()
  ctx.moveTo(x0,y0)
  ctx.lineTo(x1,y1)
  ctx.stroke()
};
function rotate(quart,axis,rotation) {
  rotation = (rotation)%360
  sp = Math.tan( (1/360)* 2*Math.PI)
  rot = [1,axis[1]*sp,axis[2]*sp,axis[3]*sp]
  for (n=0;n<rotation;n++) {
    quart = norm(mult(quart,rot))}
  return quart
};