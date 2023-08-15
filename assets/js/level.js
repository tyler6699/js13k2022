function level(num, canvasW, canvasH, scale) {
  STAGE=num;
  this.tiles = [];
  this.active = false;
  this.startPos=[0,0];
  let tileSize = 16;
  let levelArray;
  let rows = 13;
  this.cols = 24;
  let mvd=0;

  this.draw = function(hero, delta){
    this.tiles.forEach(e => e.update(delta));
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.dTiles = [];
    mvd=0;
    let trigger=false;
    let t=0;
    // Main level tiles
    rows=5;
    this.cols=5;

    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = 1;
        ts = tileSize * scale;
        xx = c * ts;
        yy = r * ts;

        var angle = 0;

        var tile = new Tile(tileSize, xx, yy, angle, t, false, c, r, scale);
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

}
