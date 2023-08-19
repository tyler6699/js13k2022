colz=40;

function level(num, canvasW, canvasH, scale) {
  STAGE = num;
  this.tiles = [];
  this.active = false;
  this.startPos = [0, 260];
  this.cols = colz;
  this.rotate=false;

  // Isometric tileSize - Width remains the same, but height is half
  let tileWidth = 16;
  let tileHeight = 8;

  let levelArray;
  let mvd = 0;

  this.draw = function(hero, delta, intro) {
    this.tiles.forEach(e => e.update(delta, intro));

    if(this.rotate){
      rotateMap90Degrees(cart);
      // printMap(cart);
      this.rotate=false;
    }
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
    let rows = colz;

    // Main Loop
    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = 1; // GRASS

        if(r < 4||c<4||c>colz-4||r>colz-4){
          t=types.SEA;
        } else if ((r < 6||c<6||c>colz-6||r>colz-6) && rndNo(0,100)>50) {
          t=types.SEA;
        } else if ((r < 8||c<8||c>colz-8||r>colz-8) && rndNo(0,100)>40) {
          t=types.SND;
        } else {
          //if(rndNo(0,100)>90){ t=types.AIR }
          // if(rndNo(0,100)>90){ t=types.BRDE }
          if(rndNo(0,100)>99 && water<maxWater){
            t=types.WTR;
            water++;
          }
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

        if (isWater(tile.e.type)) {
            for (let r = 0; r < rndNo(3,8); r++) {
                for (let col = 0; col < rndNo(3,5); col++) {
                    let pos = getTilePos(tile.row +r, tile.column+col, colz);

                    if (isValidPos(pos, maxTiles)) {
                        changes.push(pos);
                    }
                }
            }
        }
    }

    changes.forEach(pos => {
      if(rndNo(0,100)>20){
        if(this.tiles[pos].e.type != types.WTR){
          this.tiles[pos].e.type = types.WTR;
          this.tiles[pos].e.setType();
          this.tiles[pos].initialY +=4;
        }
      }
    });

  }

  function printMap(cart) {
      let size = colz;
      let mapRepresentation = "";

      for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
              let tile = cart.level.tiles[i * size + j];
              mapRepresentation += tile.entity.type + " ";
          }
          mapRepresentation += "\n";
      }
      console.log(mapRepresentation);
  }

    function swapTileTypes(tileA, tileB) {
        let tempType = tileA.entity.type;
        tileA.entity.type = tileB.entity.type;
        tileB.entity.type = tempType;
        tileA.entity.setType();
        tileB.entity.setType();
    }

    function rotateMap90Degrees(cart) {
      let size = colz;

      // Step 1: Transpose the matrix
      for (let i = 0; i < size; i++) {
          for (let j = i + 1; j < size; j++) {
              // Swap tile[i][j] and tile[j][i]
              let tileA = cart.level.tiles[i * size + j];
              let tileB = cart.level.tiles[j * size + i];

              swapTileTypes(tileA, tileB);
          }
      }

      // Step 2: Reverse each row
      for (let i = 0; i < size; i++) {
          for (let j = 0; j < size / 2; j++) {
              // Swap tile[i][j] and tile[i][size-j-1]
              let tileA = cart.level.tiles[i * size + j];
              let tileB = cart.level.tiles[i * size + (size - j - 1)];

              swapTileTypes(tileA, tileB);
          }
      }
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
