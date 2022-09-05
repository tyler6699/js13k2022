function level(num, canvasW, canvasH, id, scale, doorDrop) {
  STAGE=num;
  this.tiles = [];
  this.triggers = [];
  this.breakTiles=[];
  this.mvTiles = [];
  this.active = false;
  this.roomNo = id;
  this.opendoors=false;
  this.startPos=[40,100];
  let tileSize = 16;
  let levelArray;
  let rows = 13;
  this.cols = 24;
  let mvd=0;
  this.doorDrop=doorDrop;

  this.draw = function(hero, delta){
    // Remove decor tiles for now
    //this.dTiles.forEach(e => e.update(delta));
    this.tiles.forEach(e => e.update(delta));

    if(this.opendoors){
      this.mvTiles.forEach((d) => {
        d.entity.isSolid=false;
        if(mvd<this.doorDrop){
          d.entity.y+=2;
          mvd+=1;
        } else if (d.entity.active) {
          cart.shakeTime=.1;
          d.entity.active = false;
        }
      });
    }

    // Triggered things
    this.triggers.forEach((t, i) => {
      if(!t.trigger) return;
      let mid=t.entity.x+(t.entity.hWidth*scale);

      if(t.entity.type==types.TONNE){
        let hx=hero.e.x;
        let hx2=hero.e.x+(hero.e.width*scale);
        let tx=t.entity.x;
        let tx2=t.entity.x+(t.entity.width*scale);

        if( (hx > tx && hx < tx2) || (hx2 > tx && hx2 < tx2)){
           if(hero.e.y - hero.e.height > t.entity.y) t.entity.y+=30;
        }

        if(rectColiding(hero.e.hb, t.entity.hb)){
          hero.kill();
          t.trigger=false;
        }
      }
    });
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.dTiles = [];
    this.mvTiles = [];
    this.opendoors=false;
    mvd=0;
    let trigger=false;
    let t=0;
    // Main level tiles
    // Testing with a box as a level
    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        trigger=false;
        ts = tileSize * scale;
        xx = c * ts;
        yy = r * ts;
        var tile;
        var type = types.AIR;
        var angle = 0;

        // Create a room
        // Will move from code to simple array
        if(r == 11) type = types.BLOCK;
        if (r==rows-3 && c==5) type = types.BLOCK;
        if(c==0)type = types.BLOCK;
        if(c==1 && r==rows-4)type = types.RSPIKE;
        if(c==1 && r==rows-5)type = types.RSPIKE;
        if (r==rows-3 && (c>5 && c<16)) type = types.SPIKE;
        if (c==15 && (r<rows-3&&r>rows-8)) type = types.LSPIKE;
        if (c==16 && (r<rows-3&&r>rows-8)) type = types.BLOCK;
        if (r==rows-3 && c==16) type = types.BLOCK;
        // if (r==rows-10 && c==5) type = types.TONNE;
        if (r==rows-3 && c==4) type = types.BUTTON;
        if (r==rows-5 && c==20) type = types.PORTAL;
        if (r==rows-4 && c==5) type = types.DOOR;
        if (r==rows-5 && c==5) type = types.DOOR;

        if(type == types.TONNE)trigger=true;

        tile = new Tile(tileSize, xx, yy, angle, type, false, c, r, scale, trigger);
        this.tiles.push(tile);

        if(tile.trigger==true) this.triggers.push(tile);
        if(type == types.DOOR) this.mvTiles.push(tile);
      }
    }
  }

  function isAir(t){
      return t == types.AIR;
  }

  function isEdge(r,c,col,row){
    return (c == 1) || (c == col-2) || (r==1 && c == 1) || (r==1 && c == col-2) || (r==1 && c > 1 && c < col-2) ||
           (r==row-2 && c == col-2) || (r==row-2 && c == 1) || (r==row-2 && c > 1 && c < col-2);
  }

  function inBounds(r,c){
    return r > 2 && r<11 && c>1 && c<17;
  }

  this.addAir = function(t){
    this.tiles[t].entity.setT(types.AIR);
  }

  this.addWall = function(t){
    this.tiles[t].entity.setT(types.WALL);
  }

}
