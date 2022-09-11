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
let start=false;
let menuBlocks=[];
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
    cart.genLevel(0);
    cart.levels[0].tiles.forEach((t) => {
      if(t.entity.type>0) menuBlocks.push(t);
    });

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

    z=TIME/1600;
    writeTxt(ctx, 1, "italic 30px Verdana","WHITE","Soul Jumper", 350+Math.cos(z)*40, 150+Math.sin(z)*20);
    // Instructions
    let font="20px Verdana";
    writeTxt(ctx, 1, font,"WHITE","[M] Toggle Music", 40, 60);
    writeTxt(ctx, 1, font,"WHITE","[R] Restart Level", 40, 90);
    writeTxt(ctx, 1, font,"WHITE","[A][D] or [  ][  ] Left / Right", 40, 120);
    writeSum(ctx, 1, font,"WHITE","2190", 145, 120);
    writeSum(ctx, 1, font,"WHITE","2192", 180, 120);
    writeTxt(ctx, 1, font,"WHITE","[W] [Space] [  ] Jump", 40, 150);
    writeSum(ctx, 1, font,"WHITE","2191", 180, 150);
    writeTxt(ctx, 1, font,"WHITE","[E] Rewind Ghost", 40, 180);
    txt = songLoaded ? "[ ANY KEY TO START ]" : "[ LOADING ]";
    writeTxt(ctx, 1, "italic 20px Verdana","WHITE",txt, 40, 220);
    //String.fromCharCode(57614)
    //writeTxt(ctx, 1, "100px serif","WHITE",String.fromCharCode(8986), 400, 220);

    ctx.restore();

    ctx.save();
    ctx.translate(0,225);
    ctx.drawImage(atlas, 0, 0, 16, 16, 32, hh+f, 32, 32);
    ctx.restore();

    cart.hero.time+=delta;
    if(rndNo(1,100)>97){
      cart.hero.bloodSplatter(false,rndNo(20,700),rndNo(20,500));
      let rt = menuBlocks[rndNo(0,menuBlocks.length-1)];
      for(let i=1;i<5;i++){
        cart.hero.particles.push(new particle(rndNo(1,2), 0,rt.entity.x+18+rndNo(0,20), 15+rt.entity.y, 0, "bld", false));
      }
    }
    for (let i = 0; i <= cart.hero.particles.length-1; i++){
      cart.hero.particles[i].update(ctx,delta/1000);
    }
    cart.hero.particles = cart.hero.particles.filter(function (p) {
      return p.remove == false;
    });
  } else {
    mg.clear();
    cart.update(delta / 1e3, TIME);
    let font = "15px Verdana";
    writeTxt(ctx, 1, font,"WHITE","Music: " + !pause, 700, 20);
    writeTxt(ctx, 1, font,"WHITE","Tips: " + (cart.tips), 700, 40);
    writeTxt(ctx, 1, font,"WHITE","Lives: " + cart.hero.hp, 10, 40);
    writeTxt(ctx, 1, font,"RED","Deaths: " + cart.hero.deaths, 10, 60);
    writeTxt(ctx, 1, font,"WHITE","Level: " + (cart.hero.e.curLevel+1), 10, 20);

    let lvl=cart.hero.e.curLevel;
    if(cart.tips){
      if(lvl==0){
        writeTxt(ctx, 1, font,"WHITE","Jump the gap and press the button and reach the portal!", 200, 150);
      } else if(lvl==1){
        writeTxt(ctx, 1, font,"WHITE","Dying creates a new plaform!", 200, 100);
        writeTxt(ctx, 1, font,"WHITE","Rewind the ghost to previous posisions with [E]", 200, 120);
        writeTxt(ctx, 1, font,"WHITE","Regain the soul by rewinding fully.", 200, 120);
      }
    }

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
