function level(num, canvasW, canvasH, scale) {
  STAGE = num;
  this.tiles = [];
  this.active = false;
  this.startPos = [0, 0];

  // Isometric tileSize - Width remains the same, but height is half
  let tileWidth = 16;
  let tileHeight = 8;

  let levelArray;
  let mvd = 0;

  this.draw = function(hero, delta) {
    this.tiles.forEach(e => e.update(delta));
  }

  this.reset = function(id, scaled) {
    this.tiles = [];
    this.dTiles = [];
    mvd = 0;
    let trigger = false;
    let t = 0;

    // Main level tiles
    let rows = 30;
    this.cols = 30;

    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = 1;

        if(rndNo(0,100)>90){ t=types.AIR }
        if(rndNo(0,100)>70){ t=types.BRDE }
        if(rndNo(0,100)>60){ t=types.WTR }

        // Adjust the xx and yy calculation for isometric positioning
        xx = (c - r) * tileWidth;
        yy = (c + r) * tileHeight;

        var angle = 0;
        var tile = new Tile(tileWidth, xx, yy, angle, t, false, c, r, scale);
        this.tiles.push(tile);
      }
    }
  }

  function isAir(t) {
    return t == types.AIR;
  }
}
