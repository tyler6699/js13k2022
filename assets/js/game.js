// ╔═══════════════════════════════╗
// ║ JS13K Entry by @CarelessLabs  ║
// ╚═══════════════════════════════╝

// Reference for new atlas
// https://twitter.com/CarelessLabs/status/598922902407372800
let canvasW = window.innerWidth;
let canvasH = window.innerHeight;
let gameStarted = false;
let delta = 0.0;
let prevDelta = Date.now();
let currentDelta = Date.now();
let TIME = 0;
let introT = 0;
let mousePos = new vec2(0,0);
let clickedAt = new vec2(0,0);
let processClick = false;
let GAMEOVER=false;
let RELOAD=false;
let COL1 = "990099";
let WIN = false;
let STAGE=1;
let atlas = new Image();
atlas.src = "atlas.png";
let shaky = true;
let cart = new Cart();
let start=false;
let music=true;
let pause=false;

// Load the music player
genAudio();

// Called by body onload on index page
function startGame() {
  mg.start();
}

let mg = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.context = this.canvas.getContext("2d");
    this.context.scale(1, 1);

    // PixelArt Sharp
    ctx=this.context;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    this.canvas.classList.add("screen");
    document.body.insertBefore(this.canvas, document.body.childNodes[6]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);

    // Generate intro screen
    // cart.genLevel(0);

    // Keyboard
    window.addEventListener('keydown', function(e) {
      start=true;
      e.preventDefault();
      mg.keys = (mg.keys || []);
      mg.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      mg.keys[e.keyCode] = (e.type == "keydown");
      if(e.keyCode==R) RELOAD=true;
      if(e.keyCode==M) pause=!pause;
      if(e.keyCode==T) cart.tips=!cart.tips;
    })
    // Disable right click context menu
    this.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, 4*this.canvas.width, 4*this.canvas.height);
  }
}

function updateGameArea() {
  if(GAMEOVER){
    TIME=0;
    GAMEOVER=false;
    WIN=false;
    STAGE=0;
    start=false;
    gameStarted=false;
    cart.genLevel(STAGE);
  }

  if(start){
    if(cart.hero != null)cart.hero.e.active=true;
    gameStarted=true;
    if(audioCtx == null) audioCtx = new AudioContext();
  }

  // Delta
  prevDelta = currentDelta;
  currentDelta = Date.now();
  delta = currentDelta - prevDelta;
  TIME += delta;

  if (!gameStarted) {
    // intro Screen
    mg.clear();
    ctx = mg.context;
    cart.update(delta, TIME, true);
    ctx.save();
    drawBox(ctx,0.1,"#"+COL1,0,0,800,600)

    let font="20px Verdana";
    writeTxt(ctx, 1, font,"WHITE","Main Screen", 50, 40);

    ctx.restore();
    ctx.save();
  } else {
    mg.clear();
    cart.update(delta, TIME, false);
    //drawBox(ctx,0.1,"#"+COL1,0,0,800,600)
    let font = "15px Verdana";
    writeTxt(ctx, 1, font,"WHITE","[M] Music: " + !pause, 650, 20);
    writeTxt(ctx, 1, font,"WHITE","[T] Tips: " + (cart.tips), 650, 40);
    writeTxt(ctx, 1, font,"WHITE","[R] Reset Level", 650, 60);
    writeTxt(ctx, 1, font,"WHITE","Lives: " + cart.hero.hp, 10, 40);
    writeTxt(ctx, 1, font,"RED","Deaths: " + cart.hero.deaths, 10, 60);
    writeTxt(ctx, 1, font,"WHITE","Level: " + (cart.hero.e.curLevel+1), 10, 20);
    writeTxt(ctx, 1, font,"WHITE","X: " + (cart.hero.e.x), 10, 80);
    writeTxt(ctx, 1, font,"WHITE","Y: " + (cart.hero.e.y), 10, 100);
    let lvl=cart.hero.e.curLevel;

    // Music
    if(pause){
      audio.pause();
      music=true;
    }

    if(music && songLoaded && !pause){
      audio.play();
      audio.loop=true;
      music=false;
    }
  }
}

function drawBox(ctx,a,colour,x,y,w,h) {
  ctx.globalAlpha = a;
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, w, h);
}

function writeSum(ctx,a,font,colour,num,x,y){
  var hex = eval('"\\u' + num+'"');
  ctx.globalAlpha = a;
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(hex, x, y);
}
function writeTxt(ctx,a,font,colour,txt,x,y) {
  ctx.globalAlpha = a;
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(txt, x, y);
}

function left() {
  return mg.keys && (mg.keys[LEFT] || mg.keys[A]);
}

function right() {
  return mg.keys && (mg.keys[RIGHT] || mg.keys[D]);
}

function up() {
  return mg.keys && (mg.keys[UP] || mg.keys[W]);
}

function down() {
  return mg.keys && (mg.keys[DOWN] || mg.keys[S]);
}

function space() {
  return mg.keys && mg.keys[SPACE];
}

function map() {
  return mg.keys && mg.keys[M];
}

function one() {
  return mg.keys && (mg.keys[ONE]||mg.keys[E]);
}
