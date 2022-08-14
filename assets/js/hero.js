function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.e.hp=100;
  this.speed=5;
  this.currentTile=null;

  this.update = function(delta) {
    this.time+=delta;
    this.e.update(delta);
  }

  this.setCurrentTile = function(scaled){
    // Set Hero Current Tile
    heroRow = Math.floor((this.e.y - this.e.mhHScaled) / scaled);
    heroCol = Math.floor((this.e.x - this.e.mhWScaled) / scaled);
    heroTileIndex = heroCol + (cart.levels[this.e.currentLevel].cols*heroRow);
    if(this.currentTile != null) this.prevTile = this.currentTile;
    this.currentTile = cart.level.tiles[heroTileIndex];

    if(this.currentTile != this.prevTile){
      this.e.colArr = [];

      // Add surrounding tiles
      cart.surTiles.forEach(e => this.e.colArr.push(cart.level.tiles[heroTileIndex+e]));
    }
  }

  // check for each pixel if the hero can move, starting with full amount
  // The array contains tiles and mobs (Entities)
  this.gMove = function(xx,yy){
    this.e.idle=0;
    rec = cloneRectanlge(this.e.hb);
    rec.x += xx * this.speed;
    rec.y += yy * this.speed;
    amount = this.speed;
    stop = false;
    canMove = true;

    // Move full amount and then try decreasing
    for(var i = this.speed; i>0; i--){
      canMove = true;

      for (var t = 0; t < this.e.colArr.length; t++) {
        obj = this.e.colArr[t];
        e = obj.entity;

        if(obj.isTile()){
          if(!stop && rectColiding(e.hb,rec)){
            if(obj.active && e.isSolid){
              canMove = false;
              break;
            }
          }
        } else { // MOB
          if(!stop && obj.active && obj.isSolid && rectColiding(obj.hb, rec)){
            canMove = false;
            break;
          }
        }
      }
      if(canMove || stop){
        break;
      } else {
        amount--;
        rec.x -= xx;
        rec.y -= yy;
      }
    }

    return amount;
  }
}
