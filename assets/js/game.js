// ╔═══════════════════════════════╗
// ║ JS13K Entry by @CarelessLabs  ║
// ╚═══════════════════════════════╝

// Reference for new atlas
// https://twitter.com/CarelessLabs/status/598922902407372800

let canvasW = window.innerWidth;
let canvasH = window.innerHeight;
let gameStarted = true;
let delta = 0.0;
let prevDelta = Date.now();
let currentDelta = Date.now();
let TIME = 0;
let introT = 0;
let mousePos = new vec2(0,0);
let clickedAt = new vec2(0,0);
let clickRow;
let clickCol;
let processClick = false;
let holdClick = false;
let holdClickT = 0;
let GAMEOVER=false;
let RELOAD=false;
let COL1 = "990099";
let COL2 = "05f2db";
let WIN = false;
let STAGE=1;
let atlas = new Image();
atlas.src = "atlas.png";
let shaky = true;
let cart = new Cart();
let v = speechSynthesis.getVoices();
let talk = true;

// TODO move this after menu screen is no longer skipped
audioCtx = new AudioContext()
// Audio
let start=false;

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

    // Keyboard
    window.addEventListener('keydown', function(e) {
      e.preventDefault();
      mg.keys = (mg.keys || []);
      mg.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      mg.keys[e.keyCode] = (e.type == "keydown");
      if(e.keyCode==ONE) shaky = !shaky;
      if(e.keyCode==TWO) cart.bkcol = ranColor();
      if(e.keyCode==R) RELOAD=true;
    })
    // Mouse Buttons
    window.addEventListener('mousedown', function(e) {
      e.preventDefault();
      mg.keys = (mg.keys || []);
      mg.keys[e.button] = true;
      holdClick = true;
    })
    window.addEventListener('mouseup', function(e) {
      e.preventDefault();
      mg.keys = (mg.keys || []);
      mg.keys[e.button] = false;
      holdClick = false;
      holdClickT = 0;
      processClick = true;
      if(!start && TIME>2000) start=true;
      setclicks();
    })
    //window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', function(e) {
      e.preventDefault();
      let r = mg.canvas.getBoundingClientRect();
      mousePos.set((e.clientX - r.left) / (r.right - r.left) * canvasW,
                   (e.clientY - r.top) / (r.bottom - r.top) * canvasH);
      row = Math.floor(mousePos.y / this.scaled);
      col = Math.floor(mousePos.x / this.scaled);

      setclicks();
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function setclicks(){
  clickedAt.set(mousePos.x, mousePos.y);
}

function updateGameArea() {
  if(GAMEOVER){
    TIME=0;
    let h = cart.hero;
    h.e.hp=100;
    GAMEOVER=false;
    WIN=false;
    STAGE=0;
    start=false;
    gameStarted=false;
    cart.genLevel(STAGE);
  }

  if(start && TIME>2000){
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
    ctx.save();
    drawBox(ctx,0.1,"#"+COL1,0,0,canvasW,canvasH)
    txt = TIME>2000 ? "[ CLICK TO START ]" : "[ LOADING ]";
    writeTxt(ctx, 1, "italic 50px Arial","WHITE",txt, 380, 720);
    z=TIME/1600;
    writeTxt(ctx, 1, "italic 60px Arial","WHITE","Death Counts", 50+Math.cos(z)*40, 150+Math.sin(z)*20);
    writeTxt(ctx, 1, "italic 30px Arial","WHITE","Die to live!", 50+Math.cos(z)*70, 230+Math.sin(z)*20);
  } else {
    mg.clear();
    cart.update(delta / 1e3, TIME);
  }
}

function drawBox(ctx,a,colour,x,y,w,h) {
  ctx.globalAlpha = a;
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, w, h);
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
  return mg.keys && mg.keys[ONE];
}
