function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.e.hp=100;
  let currentTile=null;
  let jumping=false;
  let speed=0;
  let maxSpeed=6;
  let maxJumpTime=.5;
  let maxJumpH=16;
  let jumpH=0;
  let jumpTime=0;
  let gravity=7;
  let maxCoyote=.1;
  let coyote=maxCoyote;
  let lastDir = RIGHT;
  let prevPos={x: this.e.x, y: this.e.y};
  this.hereos = []
  let currentHero = []
  let showDeaths = 0;

  this.update = function(ctx, delta){
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
      this.hereos.push(currentHero);
      currentHero = [];
      this.e.x = 150;
      this.e.y=300;
      // Track the hero during life, when death occurs add all of the positions to an Array
      // Allow the player to rewind the position of the previous death
      // if they rewind to the begining then the soul re enters the player
      // The dead body can be used as a platform
    }

    // Jump
    if (up() || space()) this.jump();

    // draw the dead ones
    this.hereos.forEach((e,i) => drawDead(ctx, e, i, this.hereos.length-1));

    this.e.update(delta);

    // Add current position to Array
    if(prevPos.x != this.e.x || prevPos.y != this.e.y){
      addCoords(this.e.x, this.e.y, currentHero);
      prevPos={x: this.e.x, y: this.e.y};
    }

    if(one() && this.hereos.length > 0){
      showDeaths = .1;
      this.hereos[this.hereos.length-1].pop();
      if(this.hereos[this.hereos.length-1].length == 0 )this.hereos.splice(this.hereos.length-1,1);
    }
    if(showDeaths>0) showDeaths -= delta;
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

  function drawDead(ctx, e, i, j) {
    // If the rewind is active show all the frames
    if(e.constructor === Array && showDeaths>0 && i == j){
      e.forEach(f => drawDead(ctx, f));
    } else if(showDeaths>0) {
      // if we are drawing frames then make the transparent
      drawImg(ctx, this.e.image, 0, 0, this.e.width, this.e.height, e.x, e.y, showDeaths, scale);
    }

    // Always draw the last frame of each death
    if(e.constructor === Array){
      let last = e[e.length-1];
      drawImg(ctx, this.e.image, 0, 0, this.e.width, this.e.height, last.x, last.y, .6, scale);
    }
  }

  function addCoords(x, y, arr) {
    arr.push({x: x, y: y, d: lastDir})
  }

}
