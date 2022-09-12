// Useful Functions and classes

function rectanlge(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function ranColor() {
  let l = '0123456789ABCDEF';
  let c = '#';
  for (var i = 0; i < 6; i++) {
    c += l[Math.floor(Math.random() * 16)];
  }
  return c;
}

let voices = speechSynthesis.getVoices();
function speak(t) {
	let s = new SpeechSynthesisUtterance();
	s.text = t;
  s.voice = speechSynthesis.getVoices().filter(function(voice) {return voice.name == "Google UK English Female"; })[0];
  speechSynthesis.speak(s);
}

function rndNo(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cloneRectanlge(rec) {
  return new rectanlge(rec.x, rec.y, rec.w, rec.h);
}

function collision(rx, ry, rw, rh, r2x, r2y, r2w, r2h) {
  return (rx < r2x + r2w &&
    rx + rw > r2x &&
    ry < r2y + r2h &&
    ry + rh > r2y);
}

function rectColiding(rec1, rec2) {
  return (rec1.x < rec2.x + rec2.w &&
    rec1.x + rec1.w > rec2.x &&
    rec1.y < rec2.y + rec2.h &&
    rec1.y + rec1.h > rec2.y)
}

function vec2(x,y){
  this.x = x;
  this.y = y;

  this.set = function(x,y) {
    this.x = x;
    this.y = y;
  }
}

function drawImg(ctx, img, sx, sy, w, h, x, y, alpha, scale, angle=0){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  if(angle > 0){
    ctx.translate(24,24);
    ctx.rotate(angle*Math.PI/180);
    ctx.translate(-24,-24);
  }
  ctx.drawImage(img, sx, sy, w, h, w/2, h/2, w * scale, h * scale);
  ctx.restore();
}

function drawRect(ctx, ox, oy, x, y, w, h, col, alpha){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(ox, oy);
  ctx.fillStyle = col;
  ctx.fillRect(x,y,w,h);
  ctx.restore();
}

function resizeCanvas(){
  // // Needs to handle screens smaller than 800x600
  // let totalWidth = 1216; // Tiles are 16x16 scaled up by 4 with 19 columns
  // let totalHeight = 832; // 13 Rows
  //
  // canvasW = window.innerWidth;
  // canvasH = window.innerHeight;
  //
  // let widthToHeight = 4 / 3;
  // let newWidthToHeight = canvasW / canvasH;
  // let ratio=0;
  //
  // if (newWidthToHeight > widthToHeight) {
  //   canvasW = canvasH * widthToHeight;
  //   ratio=canvasW / totalWidth;
  // } else {
  //   canvasH = canvasW / widthToHeight;
  //   ratio=canvasH / totalHeight;
  // }
  //
  // cart.scale = ratio * scale.scale;
}

function partDir(p) {
  var angle = rndNo(0, 360) * Math.PI / 180;
  var value = rndNo(50, 180);
  var radius = [-1, 1][rndNo(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}
