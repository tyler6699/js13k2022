function Cart() {
  // Testing making the game fit the screen
  var totalWidth = 800;
  var totalHeight = 600;
  var widthToHeight = 4 / 3;
  var newWidth = canvasW/totalWidth;
  var newHeight = canvasW/totalWidth;
  var newWidthToHeight = totalHeight / canvasH;
  var resize=true;
  this.cam=new Camera();
  this.ratio=0;

  // console.log("Canvas W: " + canvasW + " Canvas H: " + canvasH + " newWidthToHeight:" + newWidthToHeight);
  // console.log("totalWidth: " + totalWidth + " totalHeight: " + totalHeight );
  // console.log("Width Ratio: " + newWidth + " Height Ratio: " + newHeight);
  // console.log("Width:: " + (newWidth*totalWidth) + " Height:: " + (newHeight*totalHeight));

  if (canvasW > totalWidth) {
    this.ratio=canvasW / totalWidth;
    console.log("Wider: " + this.ratio);
  } else {
    this.ratio=canvasW / totalWidth;
    console.log("High Screen: " + this.ratio);
  }

  // if the window is 800px and your canvas 600px, apply scale(/*800/600 = */ 1.2)
  this.scale = 1.8;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new hero(16, 16, 40 * this.scale, 100 * this.scale, 0, types.HERO, this.scale);
  this.introT=0;
  this.shake=0;
  this.shakeTime=0;
  this.reset=false;
  this.wait=2;
  this.rawlvls=[];

let a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  //Level One
  this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [1,6,2,0,10,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,6,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,9,0,0,1],
  [1,6,0,8,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]);

this.rawlvls.push([
[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1],
[1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]);

this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]);

  this.genLevel = function(num){
    this.levels = []; // Array to get tiles surrounding an entity

    let doors = [64,0];
    for(i=0; i<this.rawlvls.length; i++){
      var lvl = new level(i+1, canvasW, canvasH, i, this.scale, doors[i], this.rawlvls[i]);
      lvl.reset(i, this.scaled);
      this.levels.push(lvl);
    }
    this.level = this.levels[2];
    this.hero.e.curLevel = 2;
    this.hero.e.x=this.level.startPos[0];
    this.hero.e.y=this.level.startPos[1];
  }

  this.genLevel(0);

  // Changing the number of columns changes the surrounding tiles array.
  var c = this.levels[this.hero.e.curLevel].cols;
  this.surTiles = [-1,1,c-1,c,c+1,-c-1,-c,-c+1];

  // Render & Logic
  this.update = function(delta, time) {
    if(resize){
      resize=false;
      ctx.scale(this.ratio,this.ratio);
    }
    // Screen shake
    this.shake = shaky ? Math.cos(TIME) : 0;

    this.hero.setCurrentTile(this.scaled);

    // Render
    renderStarField(TIME);

    this.level.draw(this.hero, delta);

    // Reset mouse click checker
    processClick = false;

    // HERO
    this.hero.update(ctx, delta);

    // MOUSE
    mg.canvas.style.cursor='none';

    // TODO: Move to utility
    if(this.introT > 0){
      for(i = 0;i <= canvasW/33;i++){
        for(j = 0;j <= canvasH/33;j++){
          ctx.save();
          ctx.translate(i*32, j*32);
          col = i%2==0&&j%2==0 ? "#000" : "#FFF";
          ctx.fillStyle = col;
          ctx.globalAlpha = .5;
          ctx.fillRect(this.introT/-2, this.introT/-2, this.introT, this.introT);
          ctx.restore();
        }
      }
      this.introT -= delta*48;
    }

    if(RELOAD){
      RELOAD=false;
      this.levels[this.hero.e.curLevel].reset();
      this.hero.reset();
    }
  }

}
