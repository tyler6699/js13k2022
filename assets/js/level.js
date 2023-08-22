colz=40;

function level(num, canvasW, canvasH, scale) {
  STAGE = num;
  this.tiles = [];
  this.objs = [];
  this.castle = [];
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
    // sort
    this.objs.sort((a, b) => a.y - b.y);
    this.objs.forEach(e => e.update(delta));
    this.castle.forEach(e => e.update(delta));
    // TODO: if the hero is in front of any of the objects then draw the HERO
    // Putting these blocks and sorting them will probably be a pain as we
    // want them stacked

    // Sort this mess out!!
    if(hero.e.y>290&&nearCastle(hero.e.x, hero.e.y,findIsometricCenter(colz-1,colz-1))) hero.e.update(delta);

    // The above only fixes the front pilar
    // Maybe put the bottom of the pilar coords into a var and just check it

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
    let tileID=0;

    // Generate Island
    for (r = 0; r < rows; r++) {
      for (c = 0; c < this.cols; c++) {
        let t = 1; // GRASS

        if(r < 4||c<4||c>colz-4||r>colz-4){
          t=types.SEA;
        } else if ((r < 6||c<6||c>colz-6||r>colz-6) && rndNo(0,100)>50) {
          t=types.SEA;
        } else if ((r < 8||c<8||c>colz-8||r>colz-8) && rndNo(0,100)>20) {
          t=types.SND;
        } else {
          if(rndNo(0,100)>99 && water<maxWater){
            t=types.WTR;
            water++;
          }
        }

        // Adjust the xx and yy calculation for isometric positioning
        xx = (c - r) * tileWidth;
        yy = (c + r) * tileHeight;

        var angle = 0;
        var tile = new Tile(tileID,tileWidth, xx, yy, angle, t, false, c, r, scale);
        this.tiles.push(tile);
        tileID++;
      }
    }

    // Expand Water Areas
    const changes = [];

    this.tiles.forEach((tile, i) => {
        if (isWater(tile.e.type)) {
            Array.from({ length: rndNo(3, 8) }, (_, r) => r).forEach(r => {
                Array.from({ length: rndNo(3, 5) }, (_, col) => col).forEach(col => {
                    let pos = getTilePos(tile.row + r, tile.column + col, colz);
                    if (isValidPos(pos, this.tiles.length)) changes.push(pos);
                });
            });
        }
    });

    changes.forEach(pos => {
        if (rndNo(0, 100) > 20 && this.tiles[pos].e.type != types.WTR) {
            this.tiles[pos].e.type = types.WTR;
            this.tiles[pos].e.setType();
            this.tiles[pos].initialY += 6;
        }
    });

    let cen=findIsometricCenter(colz-1,colz-1);

    // Add decor
    maxTrees=10;
    trees=0;
    maxRocks=5;
    rocks=0;
    this.tiles.forEach(t => {
      if(t.e.type==types.GRASS && rndNo(0,100) > 98 && (trees<maxTrees)){
        if(!nearCastle(t.e.x, t.e.y-t.drop-10-30, cen)){
          obj = new entity(16, 23, t.e.x, t.e.y-t.drop-10-30, 0, types.TREE, "", scale, false, 0);
          obj.parent=t;
          t.obj=obj;
          this.objs.push(obj);
          trees++;
        }
      } else if(t.e.type==types.GRASS && rndNo(0,100) > 98 && (rocks<maxRocks)) {
        if(!nearCastle(t.e.x, t.e.y-t.drop-10, cen)){
          obj = new entity(16, 16, t.e.x, t.e.y-t.drop-10, 0, types.ROCK, "", scale, false, 0);
          obj.parent=t;
          t.obj=obj;
          this.objs.push(obj);
          rocks++;
        }
      }
    });

    // Add a simple castle
    // Castle looks great! Very, uh, can't find the right word, but, like,
    // it means business, you know? No nonsense castle vibe, fortification lvl 99
    //for(i = 0; i < 2; i++){
      //cen.x-=(i*70);
      //cen.y+=(i*40);
      buildTower(this.castle, cen.x+5, cen.y-86, 4, 0, 16, true, types.CST, true); // Back Right Tower
      buildTower(this.castle, cen.x-10, cen.y-64, 1, 0, 16); // Back Left Wall (R)
      buildTower(this.castle, cen.x-26, cen.y-56, 1, 0, 16); // Back Left Wall (L)
      buildTower(this.castle, cen.x-41, cen.y-64, 4, 0, 16,true, types.CST, true); // Back Left Tower
      buildTower(this.castle, cen.x+22, cen.y-64, 1, 0, -16, false); // Right back wall
      buildTower(this.castle, cen.x+38, cen.y-56, 1, 0, -16, false); // Right front wall
      buildTower(this.castle, cen.x+54, cen.y-64, 4, 0, 16,true, types.CST, true); // Front Right Tower
      buildTower(this.castle, cen.x+38, cen.y-24, 2, 0, -16, false); // Front Right Wall (R) OPEN
      buildTower(this.castle, cen.x+22, cen.y-18, 2, 0, -16, false); // Front Right Wall (L) OPEN
      buildTower(this.castle, cen.x-26, cen.y-8, 3, 0, -16, false); // Front Left Wall (L) CLOSED
      buildTower(this.castle, cen.x-10, cen.y, 3, 0, -16, false); // Front Left Wall (R) CLOSED
      buildTower(this.castle, cen.x+6, cen.y-40, 4, 0, 16, true, types.CST, true); // Front Left Tower
    //}

  }

  const buildTower = (tiles, x, y, count, dx = 0, dy = 8, decrement = true, type=types.CST, tower=false) => {
    const loopInit = decrement ? count - 1 : 0;
    const loopCond = decrement ? (i) => i >= 0 : (i) => i < count;
    const loopChange = decrement ? (i) => --i : (i) => ++i;

    for (let i = loopInit; loopCond(i); i = loopChange(i)) {
      tiles.push(new entity(16, 16, x + dx * i, y + dy * i, 0, type, "", scale, false, 0));
    }
    if(tower){
      tiles.push(new entity(16, 16, x + dx, y + dy - 20, 0, types.CNE, "", scale, false, 0));
    }
};

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
      let tempType = tileA.e.type;
      tileA.e.type = tileB.e.type;
      tileB.e.type = tempType;
      tileA.e.setType();
      tileB.e.setType();
  }

  function rotateMap90Degrees(cart) {
    // todo loop through objects and update their X & Y based on the parent
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

  function nearCastle(x, y, cen) {
      const topLeft = [-90, cen.y-100];
      const bottomRight = [90, cen.y+20];

      return x >= topLeft[0] && x <= bottomRight[0] && y >= topLeft[1] && y <= bottomRight[1];
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
