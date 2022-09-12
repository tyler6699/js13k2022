function level(num, canvasW, canvasH, id, scale, doorDrop, tiles) {
  STAGE=num;
  this.tiles = [];
  this.triggers = [];
  this.breakTiles=[];
  this.mvTiles = [];
  this.active = false;
  this.roomNo = id;
  this.opendoors=false;
  this.startPos=[0,0];
  this.doorDrop=doorDrop;
  let tileSize = 16;
  let levelArray;
  let rows = 13;
  this.cols = 24;
  let mvd=0;

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
    // TODO Clean up
    this.triggers.forEach((t, i) => {
      if(!t.trigger) return;
      let mid=t.entity.x+(t.entity.hWidth*scale);

      if(t.entity.type==types.DROPY){
        if(!t.entity.trapactive){
          let hx=hero.e.x;
          let hx2=hero.e.x+(hero.e.width*scale);
          let tx=t.entity.x;
          let tx2=t.entity.x+(t.entity.width*scale);

          if( (hx > tx && hx < tx2) || (hx2 > tx && hx2 < tx2)){
             if(hero.e.y - hero.e.height > t.entity.y) t.entity.trapactive=true;
          }
        } else {
          t.entity.y+=15
        }

        if(rectColiding(hero.e.hb, t.entity.hb)){
          hero.bloodSplatter(false,hero.e.x,hero.e.y);
          hero.kill();
          t.trigger=false;
          t.entity.active=false;
          t.entity.kills=false;
        } else if (t.entity.y > 1000){
          t.trigger=false;
          t.entity.active=false;
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
    rows=tiles.length;
    this.cols=tiles[0].length

    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = tiles[r][c];
        trigger=false;
        ts = tileSize * scale;
        xx = c * ts;
        yy = r * ts;

        var angle = 0;

        if(t == types.DROPY) trigger=true;
        if(t == types.HERO){
          t=types.AIR;
          this.startPos=[xx,yy];
        }
        if(t == types.AIR && rndNo(0,100)>95){
          t=types.BRICK;
        }
        var tile = new Tile(tileSize, xx, yy, angle, t, false, c, r, scale, trigger);
        this.tiles.push(tile);

        if(tile.trigger==true) this.triggers.push(tile);
        if(t == types.DOOR) this.mvTiles.push(tile);
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

}
