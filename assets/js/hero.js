function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.hereos = []
  this.active=true;
  this.hp=2;
  this.particles=[];
  let currentTile=null;
  let jumping=false;
  let speed=0;
  let maxSpeed=6;
  let maxJumpTime=.5;
  let maxJumpH=14;
  let jumpH=0;
  let jumpTime=0;
  let gravity=7;
  let maxCoyote=.1;
  let coyote=maxCoyote;
  let lastDir = RIGHT;
  let prevPos={x: this.e.x, y: this.e.y};
  let currentHero = []
  let showDeaths = 0;
  let maxDelay=.15;
  let rewindDelay=maxDelay;
  let runtime=0;
  let respawnTime=0;

  this.update = function(ctx, delta){
    this.time+=delta;

    // Add current position to Array
    if(Math.abs(prevPos.x - this.e.x) > 20 || Math.abs(prevPos.y - this.e.y) > 20){
      addCoords(this.e.x, this.e.y, currentHero);
      prevPos={x: this.e.x, y: this.e.y};
    }

    // Controls
    if(this.active){
      if(!left() && !right()){
        speed = speed > 0 ? speed -= .5 : 0;
        this.e.angle=0;
        runtime = 0;
      } else {
        this.e.angle+=20;
        runtime += delta;
        speed = speed > maxSpeed ? maxSpeed : speed += .5;
      }

      if (left()|| (speed > 0 && lastDir==LEFT)){
        lastDir=LEFT;
        this.e.x -= this.gMove(-1,0);
        this.e.flip = true;
        if(!left()&&this.grounded()) this.addDust();
      }

      if (right()|| (speed > 0 && lastDir==RIGHT)){
        lastDir=RIGHT;
        this.e.x += this.gMove(1,0);
        this.e.flip = false;
        if(!right()&&this.grounded()) this.addDust();
      }
    } else {
      if(this.hp==1 && respawnTime > 0){
        respawnTime-=delta;

        if(respawnTime<=0){
          this.active=true;
          this.e.sy=0;
        };
      }
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
    if(!this.grounded()) runtime=0;

    // Check Actions on tiles
    if(currentTile != null){
      let ct=currentTile.entity.type;
      if(ct == types.SPIKE || ct == types.LSPIKE || ct == types.RSPIKE|| ct == types.TSPIKE){
        this.kill();
      } else if(ct == types.BUTTON && !currentTile.entity.pressed) {
        currentTile.entity.pressed=true;
        currentTile.entity.sx=80;
        cart.levels[this.e.curLevel].opendoors=true;
        playSound(COINFX,.8);
      } else if(ct == types.PORTAL) {
        // Play intro for next level
        console.log("DONE");
        this.bloodSplatter(true);
      }
    }

    // Jump
    if (up() || space()) this.jump();

    // draw the dead ones
    this.hereos.forEach((e,i) => drawDead(ctx, e, i, this.hereos.length-1));

    // HP
    for (let i = 1; i < this.hp; i++){
      drawImg(ctx, this.e.image, 0, 0, this.e.width, this.e.height, (this.e.width*2)*i, this.e.height*2, 1, scale);
    }

    // Particles
    for (let i = 0; i <= this.particles.length-1; i++){
      this.particles[i].update(ctx,delta);
    }

    this.e.update(delta);

    // Rewind the last death
    if(one() && this.active && this.hereos.length > 0){
      showDeaths = .1;
      if(rewindDelay <= 0){
        rewindDelay=maxDelay;
        // check if new location would cause collision
        let arr = this.hereos[this.hereos.length-1];
        let body = arr.length == 1 ? arr[0] : arr[arr.length-2];
        rec = new rectanlge(body.x, body.y, this.e.hb.w, this.e.hb.h);

        if(!rectColiding(this.e.hb,rec) || !this.active){
          this.hereos[this.hereos.length-1].pop();

          if(this.hereos[this.hereos.length-1].length == 0 ){
            this.hereos.splice(this.hereos.length-1,1);
            this.hp++;
            this.active=true;
          }
        }
      } else {
        rewindDelay -= delta;
      }
    }
    if(showDeaths>0) showDeaths -= delta;
    if(runtime>.35) this.addDust();

    // Remove Particles
    this.particles = this.particles.filter(function (p) {
      return p.remove == false;
    });
  }

  this.reset = function(){
    this.hereos = [];
    this.particles=[];
    this.hp=2;
    let lvl=cart.levels[this.e.curLevel];
    this.e.x=lvl.startPos[0] * scale;
    this.e.y=lvl.startPos[1] * scale;
  }

  this.kill = function(){
    this.bloodSplatter(false);
    playSound(DIEFX,1);
    if(this.hp>0){
      this.hp--;
      this.hereos.push(currentHero);
      currentHero = [];

      this.e.x= cart.levels[this.e.curLevel].startPos[0] * scale;
      this.e.y= cart.levels[this.e.curLevel].startPos[1] * scale;

      if(this.hp==0){
        this.active=false;
        this.hereos.splice(this.hereos.length-1,1);
        this.hp++;
        this.e.sy=16;
        respawnTime=.4;
        speed=0;
      }
    }
  }

  this.setCurrentTile = function(scaled){
    // Set Hero Current Tile
    heroRow = Math.floor((this.e.y - this.e.mhHScaled) / scaled);
    heroCol = Math.floor((this.e.x - this.e.mhWScaled) / scaled);
    heroTileIndex = heroCol + (cart.levels[this.e.curLevel].cols*heroRow);
    if(currentTile != null) this.prevTile = currentTile;
    currentTile = cart.level.tiles[heroTileIndex];

    if(this.e.x != prevPos.x || this.e.y != prevPos.y){
      this.e.colArr = [];

      // Add surrounding tiles
      cart.surTiles.forEach(e => this.e.colArr.push(cart.level.tiles[heroTileIndex+e]));

      // add an entity for each dead body
      this.hereos.forEach(e => addBody(e, this.e.colArr));
    }
  }

  this.addDust = function(){
    for(let i=0;i<rndNo(1,4);i++){
      this.particles.push(new particle(rndNo(1,15), 0, this.e.x-this.e.mhWScaled, this.e.y+this.e.height*2.2-rndNo(1,5), 0, "dust", false, lastDir))
    }
    runtime = 0;
  }

  this.canFall = function(){
     return this.gMove(0,1, false, false, true) > 0;
  }

  this.jump = function(){
    if(!jumping && coyote <= maxCoyote && this.active){
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

  function addBody(e, arr){
    let body = e[e.length-1];
    if(body!=null){
      let tile = new Tile(16, body.x, body.y, 0, types.BLOCK, false, 0, 0, scale, false);
      tile.entity.updateHitbox();
      arr.push(tile);
    }
  }

  function drawDead(ctx, e, i, j) {
    // If the rewind is active show all the frames
    if(e.constructor === Array && showDeaths>0 && i == j){
      e.forEach((d) => drawDead(ctx, d, i, e.length-1));
    } else if(showDeaths>0) {
      drawImg(ctx, this.e.image, 0, 16, this.e.width, this.e.height, e.x, e.y, (i/j)+.05, scale);
    }

    // Always draw the last frame of each death
    if(e.constructor === Array){
      let last = e[e.length-1];
      if(last!=null) drawImg(ctx, this.e.image, 0, 16, this.e.width, this.e.height, last.x, last.y, .7, scale);
    }
  }

  this.bloodSplatter = function(rndCol){
    for(let i=0; i<30;i++){
      this.particles.push(new particle(rndNo(1,25), 0, this.e.x-this.e.mhWScaled, this.e.y-this.e.mhHScaled, 0, "circle", rndCol))
      this.particles.push(new particle(rndNo(1,8), 0, this.e.x-this.e.mhWScaled, this.e.y-this.e.mhHScaled, 0, rndCol))
    }
  }

  function addCoords(x, y, arr) {
    // Only keep 10 heros
    if(arr.length>8) arr.splice(0,1);
    arr.push({x: x, y: y, d: lastDir});
  }
}
