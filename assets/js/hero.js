function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.e.hp=100;
  let currentTile=null;
  let jumping=false;
  let speed=0;
  let maxSpeed=6;
  let maxJumpTime=.5;
  let maxJumpH=15;
  let jumpH=0;
  let jumpTime=0;
  let gravity=7;
  let maxCoyote=.1;
  let coyote=maxCoyote;
  let lastDir = RIGHT;

  this.update = function(delta){
    this.time+=delta;

    // Controls
    if(!left() && !right()){
      speed = speed > 0 ? speed -= .5 : 0;
    } else {
      speed = speed > maxSpeed ? maxSpeed : speed += .5;
    }

    if (left() || (speed > 0 && lastDir==LEFT)){
      lastDir=LEFT;
      this.e.x -= this.gMove(-1,0);
      this.e.flip = true;
    }

    if (right() || (speed > 0 && lastDir==RIGHT)){
      lastDir=RIGHT;
      this.e.x += this.gMove(1,0);
      this.e.flip = false;
    }

    if(jumpTime <= 0 && this.grounded()){
      jumping=false;
    } else if (jumpTime > 0){
      this.e.y -= this.gMove(0,-1, false, true)
      jumpTime-=delta
    }

    // Gravity
    if(this.canFall && coyote >= maxCoyote){
      this.e.y += this.gMove(0,1, true, false);
    } else if(!this.grounded()){
      coyote += delta;
    }

    if(this.grounded() && coyote != 0 && !jumping) coyote=0;

    if(currentTile != null && currentTile.entity.type == types.SPIKE){
      console.log("death");
      // Track the hero during life, when death occurs add all of the positions to an Array
      // Allow the player to rewind the position of the previous death
      // if they rewind to the begining then the soul re enters the player
      // The dead body can be used as a platform
    }

    // Jump
    if (up() || space()) this.jump();

    this.e.update(delta);
    //console.log("Can fall: " + this.canFall() + " Coyote: " + coyote + " Grounded: " + this.grounded());
  }

  this.setCurrentTile = function(scaled){
    // Set Hero Current Tile
    heroRow = Math.floor((this.e.y - this.e.mhHScaled) / scaled);
    heroCol = Math.floor((this.e.x - this.e.mhWScaled) / scaled);
    heroTileIndex = heroCol + (cart.levels[this.e.currentLevel].cols*heroRow);
    if(currentTile != null) this.prevTile = currentTile;
    currentTile = cart.level.tiles[heroTileIndex];

    if(currentTile != this.prevTile){
      this.e.colArr = [];

      // Add surrounding tiles
      cart.surTiles.forEach(e => this.e.colArr.push(cart.level.tiles[heroTileIndex+e]));
    }
  }

  this.canFall = function(){
     return this.gMove(0,1, false, false, true) > 0;
  }

  this.jump = function(){
    if(!jumping && coyote <= maxCoyote){
      coyote=maxCoyote;
      jumping=true;
      jumpTime=maxJumpTime;
      jumpH=maxJumpH;
      playSound(JUMPFX,.2);
    }
  }

  this.grounded = function(){
    rec = cloneRectanlge(this.e.hb);
    rec.y += 2;
    //rec.x -= 8;  // Wall Jumping
    //rec.w += 16; // Wall Jumping
    canJump = false;

    for (var t = 0; t < this.e.colArr.length; t++) {
      obj = this.e.colArr[t];
      e = obj.entity;
      if(obj.isTile()){
        if(rectColiding(e.hb,rec) && obj.active && e.isSolid && rec.y > this.e.y){
          canJump = true;
          break;
        }
      }
    }
    return canJump;
  }

  // check for each pixel if the hero can move, starting with full amount
  // The array contains tiles and mobs (Entities)
  this.gMove = function(xx,yy, grav=false, jump=false, fall=false){
    this.e.idle=0;

    var spd = grav ? gravity : speed;
    if(jump){
      jumpH-=.3;
      jumpH = jumpH > 0 ? jumpH : 0;
      spd=jumpH;
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
