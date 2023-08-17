function level(num, canvasW, canvasH, scale) {
  STAGE = num;
  this.tiles = [];
  this.active = false;
  this.startPos = [0, 0];
  this.cols = 30;

  // Isometric tileSize - Width remains the same, but height is half
  let tileWidth = 16;
  let tileHeight = 8;

  let levelArray;
  let mvd = 0;

  this.draw = function(hero, delta) {
    this.tiles.forEach(e => e.update(delta));
  }

  this.reset = function(id, scaled) {
    console.log("RESET");
    this.tiles = [];
    this.dTiles = [];
    mvd = 0;
    let trigger = false;
    let t = 0;
    let maxWater = rndNo(2,5);
    let water=0;
    // Main level tiles
    let rows = 30;

    // Main Loop
    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = 1;

        //if(rndNo(0,100)>90){ t=types.AIR }
        // if(rndNo(0,100)>90){ t=types.BRDE }
        if(rndNo(0,100)>99 && water<maxWater){
          t=types.WTR;
          water++;
        }

        // Adjust the xx and yy calculation for isometric positioning
        xx = (c - r) * tileWidth;
        yy = (c + r) * tileHeight;

        var angle = 0;
        var tile = new Tile(tileWidth, xx, yy, angle, t, false, c, r, scale);
        this.tiles.push(tile);
      }
    }

    // Expand Water Areas
    let changes = [];
    let maxTiles = this.tiles.length;

    for (let i = 0; i < maxTiles; i++) {
        let tile = this.tiles[i];

        if (isWater(tile.entity.type)) {
            for (let r = 0; r < rndNo(3,5); r++) {
                for (let col = 0; col < rndNo(3,5); col++) {
                    let pos = getTilePos(tile.row +r, tile.column+col, 30);

                    if (isValidPos(pos, maxTiles)) {
                        changes.push(pos);
                    }
                }
            }
        }
    }

    changes.forEach(pos => {
        this.tiles[pos].entity.type = 4;
        this.tiles[pos].entity.setType();
    });
  }

  function isValidPos(pos, max) {
      return pos >= 0 && pos < max;
  }

  function getTilePos(row, column,totalCols) {
    return row * totalCols + column;
  }

  function isAir(t) {
    return t == types.AIR;
  }

  function isWater(t) {
    return t == types.WTR;
  }
}
