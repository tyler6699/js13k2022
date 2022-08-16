function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.e.hp=100;
  this.speed=0;
  this.maxSpeed=6;
  this.currentTile=null;
  this.jumping=false;
  this.maxJumpTime=.4;
  this.maxJumpH=14;
  this.jumpH=0;
  this.jumpTime=0;
  this.gravity=7;
  this.coyote=0;
  this.maxCoyote=3;

  this.update = function(delta) {
    // Controls
    if(!left() && !right()){
      this.speed = this.speed > 0 ? this.speed -= .5 : 0;
    } else {
      this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed += .5;
    }

    if (left() || (this.speed > 0 && lastDir==LEFT)){
      lastDir=LEFT;
      this.e.x -= this.gMove(-1,0);
      this.e.flip = true;
    }

    if (right() || (this.speed > 0 && lastDir==RIGHT)){
      lastDir=RIGHT;
      this.e.x += this.gMove(1,0);
      this.e.flip = false;
    }

    // Jump
    if (up() || space()) this.jump();

    this.time+=delta;
    if(this.jumpTime <= 0){
      this.jumping=false;
    } else if (this.jumpTime > 0){
      this.e.y -= this.gMove(0,-1, false, true)
      this.jumpTime-=delta
    }
    // Gravity
    if(this.canFall && this.coyote > this.maxCoyote){
      this.e.y += this.gMove(0,1, true, false);
    } else {
      this.coyote += delta;
    }

    console.log("Can fall: " + this.canFall());
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

  this.canFall = function(){
     return this.gMove(0,1, false, false, true) > 0;
  }

  this.jump = function(){
    if(!this.jumping && this.grounded()){ // Check on floor!
      this.jumping=true;
      this.jumpTime=this.maxJumpTime;
      this.jumpH=this.maxJumpH;
      playSound(JUMPFX,.2);
    }
  }

  this.grounded = function(){
    rec = cloneRectanlge(this.e.hb);
    rec.y += 8;
    rec.x -= 8;
    rec.w += 16;
    canJump = false;

    for (var t = 0; t < this.e.colArr.length; t++) {
      obj = this.e.colArr[t];
      e = obj.entity;
      if(obj.isTile()){
        if(rectColiding(e.hb,rec) && obj.active && e.isSolid){
          canJump = true;
          break;
        }
      }
    }
    return canJump;
  }

  // check for each pixel if the hero can move, starting with full amount
  // The array contains tiles and mobs (Entities)
  this.gMove = function(xx,yy, gravity=false, jump=false, fall=false){
    this.e.idle=0;

    var spd = gravity ? this.gravity : this.speed;
    if(jump){
      this.jumpH-=.3;
      this.jumpH = this.jumpH > 0 ? this.jumpH : 0;
      spd=this.jumpH;
    } else if(fall){
      spd=1;
    }

    rec = cloneRectanlge(this.e.hb);
    rec.x += xx * spd;
    rec.y += yy * spd;
    canMove = true;
    amount = spd;

    // Move full amount and then try decreasing
    for(var i = spd; i>0; i--){
      canMove = true;

      for (var t = 0; t < this.e.colArr.length; t++) {
        obj = this.e.colArr[t];
        e = obj.entity;

        if(obj.isTile()){
          if(rectColiding(e.hb,rec)){
            if(obj.active && e.isSolid){
              canMove = false;
              break;
            }
          }
        } else { // MOB
          if(obj.active && obj.isSolid && rectColiding(obj.hb, rec)){
            canMove = false;
            break;
          }
        }
      }
      if(canMove){
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
