function Cart() {
  var totalWidth = 800;
  var totalHeight = 600;
  var widthToHeight = 4 / 3;
  var newWidthToHeight = totalHeight / canvasH;
  var resize=true;
  this.cam=new Camera();
  this.ratio=1;
  this.tips=true;

  // console.log("Canvas W: " + canvasW + " Canvas H: " + canvasH + " newWidthToHeight:" + newWidthToHeight);
  // console.log("totalWidth: " + totalWidth + " totalHeight: " + totalHeight );
  // console.log("Width Ratio: " + newWidth + " Height Ratio: " + newHeight);
  // console.log("Width:: " + (newWidth*totalWidth) + " Height:: " + (newHeight*totalHeight));

  if (canvasW > totalWidth) {
    this.ratio=canvasW / totalWidth;
  } else {
    this.ratio=canvasH / totalHeight;
  }

  // if the window is 800px and your canvas 600px, apply scale(/*800/600 = */ 1.2)
  this.scale = 2;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new hero(16, 16, 40 * this.scale, 100 * this.scale, 0, types.HERO, this.scale);
  this.introT=0;
  this.shake=0;
  this.shakeTime=0;
  this.reset=false;
  this.wait=2;
  this.rawlvls=[];

  // Level 1
  this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,1],
  [1,14,0,0,0,0,0,0,0,0,0,0,0,8,0,10,0,0,0,0,0,9,0,1],
  [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,14,1],
  [0,0,11,12,0,14,6,0,0,0,0,0,5,14,0,11,12,0,0,0,1,1,1,1],
  [0,0,11,12,0,14,6,3,3,3,3,3,5,14,0,11,12,0,0,0,0,11,12,0],
  [0,0,11,12,0,1,1,1,1,1,1,1,1,1,0,11,12,0,0,0,0,15,16,0],
  [0,0,15,16,0,0,0,0,0,0,0,0,0,0,0,15,16,0,0,0,0,0,0,0]]);

  // Level 2
  // >8-1!(!"(!#(!$(!")+"*+#),#*,%( %*#&*#'*#(*#)*#**#+*#,*#-*#.*#/(!0(!1(!2(!0)+0*+1),1*,"+/0+/1+0#+00&)2'.1'.!'.%+.&+.'+.(+.)+.*+.++.,+.-+..+."&""'.!&.
  this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,14,2,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0],
  [0,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,0,0,0,0,0],
  [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0],
  [0,0,11,12,0,0,0,0,0,0,0,0,0,0,0,0,11,12,0,0,0,0,0,0],
  [0,0,11,12,0,3,3,3,3,3,3,3,3,3,3,0,11,12,0,0,0,0,0,0],
  [0,0,15,16,0,14,14,14,14,14,14,14,14,14,14,0,15,16,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);

  // Level 3
  // >8-1").#).$).%).%*.$*."*.#*.#+.$+.!(!"(!#(!$(!%(!&(!&)'!)')&%)%%*%!+%!,%!-%!.%!** *) *( *' +&.,&.-&..'.-'.,'.+'.*&!.&!,(.-(.-)."&",#)
  this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,5,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,5,1,14,14,14,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,0,0,0,0,0,14,14,0,0,0,0,0,0,0,0,0,0],
  [0,7,14,14,14,14,7,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0],
  [0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);

// Level 4
//>2-1").#).$).%).%*.$*."*.#*.#+.$+.!(!"(!#(!$(!%(!&(!&)'!)'+%!,%!-%!.%!** *) *( *' +&.,&.-&..'.-'.,'.+'..&!,(.-(.-).,# ,$(0# 2$ 3$ 4$ 4# 5# 5" 4" 4! 3! 2! 1" 0" 3# 3" 2" 2# 1# 1$ !'&!&&!%&!$& $! %! &! '! (!"& %$! # #% #& #' #$ $# %#)&# &$!(" )! '$.*&%*%%)% )& '(!')'$% $& $' %'*%&*%%!$$ '#-'"-'!-(! &' '&"-#"
  this.rawlvls.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,9,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,6,0,0,0,1,1,14,0,0,0,0,8,0,0,0,0,0,0,0,0],
  [1,6,0,0,0,1,0,0,0,0,5,1,1,1,1,0,0,0],
  [1,6,0,0,0,10,0,2,0,0,5,14,14,14,1,0,0,0],
  [1,6,0,0,0,10,0,0,0,0,0,14,14,14,14,0,0,0],
  [1,1,1,1,1,1,1,1,0,0,0,0,14,14,0,0,0,0],
  [0,7,14,14,14,14,7,7,0,0,0,0,0,14,0,0,0,0],
  [0,0,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);

  this.genLevel = function(num){
    this.levels = []; // Array to get tiles surrounding an entity

    let doors = [130,130,130];
    for(i=0; i<this.rawlvls.length; i++){
      var lvl = new level(i+1, canvasW, canvasH, i, this.scale, doors[i], this.rawlvls[i]);
      lvl.reset(i, this.scaled);
      this.levels.push(lvl);
    }
    // TODO Function this
    this.level = this.levels[0];
    this.hero.e.curLevel = 0;
    this.hero.e.x=this.level.startPos[0];
    this.hero.e.y=this.level.startPos[1];
  }

  this.genLevel(0);

  // Changing the number of columns changes the surrounding tiles array.
  var c = this.levels[this.hero.e.curLevel].cols;
  this.surTiles = [-1,1,c-1,c,c+1,-c-1,-c,-c+1];

  // Render & Logic
  this.update = function(delta, time, intro=false) {
    if(resize){
      resize=false;
      ctx.scale(this.ratio,this.ratio);
    }

    // Screen shake
    this.shake = shaky ? Math.cos(TIME) : 0;

    this.hero.setCurrentTile(this.scaled);

    this.level.draw(this.hero, delta);

    // HERO
    if(!intro){
      this.hero.update(ctx, delta);

      // MOUSE
      mg.canvas.style.cursor='none';

      if(RELOAD){
        // Changing the number of columns changes the surrounding tiles array.
        RELOAD=false;
        this.levels[this.hero.e.curLevel].reset();
        this.hero.reset();
      }

      if(this.hero.doneTime<=0 && this.hero.changeLevel){
        this.hero.e.curLevel += 1;
        this.level = this.levels[this.hero.e.curLevel];
        this.hero.changeLevel=false;
        speak("Level " + (this.hero.e.curLevel+1));
        // Game breaking issue if level sizes change and this is not updated!
        var c = this.levels[this.hero.e.curLevel].cols;
        this.surTiles = [-1,1,c-1,c,c+1,-c-1,-c,-c+1];
        this.hero.reset();
      }
      // Follow hero
      this.cam.x = lerp(-this.hero.e.x + (totalWidth/2)-20,this.cam.x ,.8);
      this.cam.y = lerp(-this.hero.e.y + (totalHeight/2)-80,this.cam.y ,.8);
    }
  }

}
