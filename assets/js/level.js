function level(num, canvasW, canvasH, id, scale, noDoors = false) {
  STAGE=num;
  this.tiles = [];
  this.breakTiles=[];
  this.mvTiles = [];
  this.active = false;
  this.roomNo = id;
  var tileSize = 16;
  var levelArray;
  this.rows = 13;
  this.cols = 24;

  this.draw = function(hero, delta){
    // Remove decor tiles for now
    //this.dTiles.forEach(e => e.update(delta));
    this.tiles.forEach(e => e.update(delta));
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.dTiles = [];

    // Main level tiles
    // Testing with a box as a level
    for (r = 0; r < this.rows; r++) {
      for (c = 0; c < this.cols; c++) {

        ts = tileSize * scale;
        xx = c * ts;
        yy = r * ts;
        var tile;
        var type = types.AIR;
        var angle = 0;

        // Create a room
        if(r == 0 || c == 0 || r == 12 || c == this.cols){
          type = types.AIR;
        } else if (r==this.rows-3 && c==5){
          type = types.BLOCK;
        } else if (r==this.rows-4 && c==5){
          type = types.BLOCK;
        } else if (r==this.rows-6 && c==5){
          type = types.BLOCK;
        } else if (r==this.rows-4 && c==8){
          type = types.BLOCK;
        } else if (isEdge(r,c,this.cols,this.rows)){
          type = types.BLOCK;
        }

        tile = new Tile(tileSize, xx, yy, angle, type, false, c, r, scale);
        this.tiles.push(tile);
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
