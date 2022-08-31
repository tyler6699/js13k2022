function level(num, canvasW, canvasH, id, scale, noDoors = false) {
  STAGE=num;
  this.tiles = [];
  this.triggers = [];
  this.breakTiles=[];
  this.mvTiles = [];
  this.active = false;
  this.roomNo = id;
  let tileSize = 16;
  let levelArray;
  let rows = 13;
  this.cols = 24;

  this.draw = function(hero, delta){
    // Remove decor tiles for now
    //this.dTiles.forEach(e => e.update(delta));
    this.tiles.forEach(e => e.update(delta));

    // Triggered things
    for(let i=0;i<this.triggers.length;i++){
      let t=this.triggers[i];
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
    }
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.dTiles = [];
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
        if(r == 0 || c == 0 || r == 12 || c == this.cols){
          type = types.AIR;
        } else if (r==rows-3 && c==5){
          type = types.BLOCK;
        } else if (isEdge(r,c,this.cols,rows)){
          type = types.BLOCK;
        }

        if (r==rows-3 && c==15) type = types.SPIKE;
        if (r==rows-10 && c==8) type = types.TONNE;
        if (r==rows-3 && c==12) type = types.SPIKE;
        if (r==rows-7 && c==15) type = types.LSPIKE;
        if (r==rows-7 && c==8) type = types.RSPIKE;
        if (r==rows-7 && c==10) type = types.TSPIKE;
        if (r==rows-3 && c==13) type = types.BUTTON;
        if (r==rows-3 && c==16) type = types.PORTAL;

        if(type == types.TONNE)trigger=true;

        if(type == types.LWALLSPIKE){
          angle=90;
        }

        tile = new Tile(tileSize, xx, yy, angle, type, false, c, r, scale, trigger, angle);
        this.tiles.push(tile);

        if(tile.trigger==true){
          this.triggers.push(tile);
        }
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
