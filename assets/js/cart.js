function Cart() {
  // Testing making the game fit the screen
  var totalWidth = 1216; // Tiles are 16x16 scaled up by 4 with 19 columns
  var totalHeight = 832; // 13 Rows
  var widthToHeight = 4 / 3;
  var newWidthToHeight = canvasW / canvasH;
  var ratio=0;
  var lastDir=RIGHT;

  // TODO: Not rendering on all screen sizes!
  if (newWidthToHeight > widthToHeight) {
    canvasW = canvasH * widthToHeight;
    ratio=canvasW / totalWidth;
  } else {
    canvasH = canvasW / widthToHeight;
    ratio=canvasH / totalHeight;
  }

  this.scale = 3*ratio;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new hero(16, 16, canvasW/2, 120, 0, types.HERO, this.scale);
  this.introT=0;
  this.shake=0;
  this.shakeTime=0;
  this.reset=false;
  this.wait=2;

  this.genLevel = function(num){
    this.bkcol = ranColor();
    this.levels = []; // Array to get tiles surrounding an entity
    for(i=0;i<1;i++){
      var lvl = new level(num, canvasW, canvasH, i, this.scale);
      lvl.reset(i, this.scaled);
      this.levels.push(lvl);
    }
    this.level = this.levels[0];
    this.hero.e.currentLevel = 0;
  }

  this.genLevel(0);

  // Changing the number of columns changes the surrounding tiles array.
  var c = this.levels[this.hero.e.currentLevel].cols;
  this.surTiles = [-1,1,c-1,c,c+1,-c-1,-c,-c+1];

  // Render & Logic
  this.update = function(delta, time) {
    // Screen shake
    this.shake = shaky ? Math.cos(TIME) : 0;

    this.hero.setCurrentTile(this.scaled);

    // Render
    renderStarField(TIME);

    // Render background
    //drawRect(ctx, 80, 120, 0, 0, 16*this.scaled, 10*this.scaled, this.bkcol, .8);

    this.level.draw(this.hero.e, delta);

    // Reset mouse click checker
    processClick = false;

    // HERO
    this.hero.update(delta);

    // MOUSE
    mg.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 4;
    let mh = 20;
    ctx.fillStyle='BLACK'
    ctx.globalAlpha=.4;
    w=mw*2;
    h=mh*2;
    ctx.fillRect(mx-mw,my-mh,w,h);
    ctx.fillRect(mx-mh,my-mw,h,w);

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
  }

}
