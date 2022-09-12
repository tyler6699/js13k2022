function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, 100);
  this.hereos = []
  this.active=true;
  this.hp=2;
  this.particles=[];
  let curTile=null;
  let jumping=false;
  let airTime=0;
  let idle=0;
  let speed=0;
  // HERO PARAMS
  let maxSpeed=5;
  let maxJumpTime=.5;
  let maxJumpH=13;
  //
  let jumpH=0;
  let jumpTime=0;
  let wallDelay=0;
  let gravity=7;
  let maxCoyote=.1;
  let coyote=maxCoyote;
  let lastDir = RIGHT;
  let prevPos={x: this.e.x, y: this.e.y};
  let currentHero = []
  let showDeaths = 0;
  let maxDelay=.1;
  let rewindDelay=maxDelay;
  let runtime=0;
  let respawnTime=0;
  let cenX=0;
  let cenY=0;
  let offScreen=false;
  let blockRewind=false;
  let checkPos=null;
  this.deaths=0;
  this.doneTime=0;
  this.done=false;
  this.changeLevel=false;

  this.update = function(ctx, delta){
    this.time+=delta;
    idle+=delta;
    // Add current position to Array
    if(Math.abs(prevPos.x - this.e.x) > 20 || Math.abs(prevPos.y - this.e.y) > 20){
      addCoords(this.e.x, this.e.y, currentHero);
      prevPos={x: this.e.x, y: this.e.y};
    }

    // Controls
    if(this.active){
      if(!left() && !right()){
        speed = speed > 0 ? speed -= .5 : 0;
        if(idle < 3) this.e.angle=0;
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
    }

    if(jumpTime <= 0 && this.grounded()){
      jumping=false;
    } else if (jumpTime > 0){
      this.e.y -= this.gMove(0,-1, false, true);
      jumpTime-=delta;
    }

    // Stop too many wall jumps
    if(wallDelay>0) wallDelay-=delta;

    // Jump
    if (up() || space()) this.jump();

    // Gravity
    if(this.canFall && coyote >= maxCoyote && this.active){
      this.e.y += this.gMove(0,1, true, false);
    } else if (!this.active && respawnTime>0){
      this.e.y += this.gMove(0,1, false, false);
    } else if(!this.grounded()){
      coyote += delta;
    }

    if(this.grounded() && coyote != 0 && !jumping) coyote=0;
    if(!this.grounded()) runtime=0;

    // Check Actions on tiles
    if(this.active){
      if(curTile != null){
        let ct=curTile.entity.type;
        if(curTile.entity.kills){
          this.bloodSplatter(false,cenX,cenY);
          this.bloodDrip(curTile.entity);
          this.kill();
        } else if(ct == types.BUTTON && !curTile.entity.pressed) {
          cart.shakeTime=.1;
          curTile.entity.pressed=true;
          curTile.entity.sx=80;
          cart.levels[this.e.curLevel].opendoors=true;
          playSound(COINFX,.8);

        } else if(ct == types.PORTAL) {
          // Play intro for next level
          this.bloodSplatter(true,cenX,cenY);

          // Count down to level change
          if(!this.done){
            playSound(PORTALFX,.6);
            this.doneTime=1;
            this.done=true;
          }
        } else if(ct == types.CHK && curTile.e.chk){
          curTile.e.chk=false;
          curTile.e.sx=80;
          checkPos=[];
          checkPos[0]=curTile.e.x;
          checkPos[1]=curTile.e.y-16;
          playSound(PORTALFX,.2);
        }
      }
    }

    if(respawnTime > 0){
      respawnTime-=delta;
    } else if(respawnTime<=0 && !this.active){
      if(checkPos!=null){
        this.e.x=checkPos[0];
        this.e.y=checkPos[1];
      } else {
        this.e.x=cart.levels[this.e.curLevel].startPos[0];
        this.e.y=cart.levels[this.e.curLevel].startPos[1];
      }

      this.active=true;
      this.e.sy=0;
    };

    // Win check
    if(this.doneTime>0){
      this.doneTime-=delta;
      this.changeLevel=true;
    }

    // idle check
    if(up()||space()||one()||right()||left()) idle=0;
    if(idle>3){
      this.e.angle+=40;
      this.particles.push(new particle(rndNo(10,30), 0, this.e.x-this.e.mhWScaled, this.e.y+this.e.height*2.2-rndNo(1,5), 0, "dust", false, lastDir));
      if(idle>5)idle=0;
    }

    // draw the dead ones
    ctx.save()
    ctx.translate(cart.cam.x,cart.cam.y);
    this.hereos.forEach((e,i) => drawDead(ctx, e, i, this.hereos.length-1));
    ctx.restore();

    // Particles
    for (let i = 0; i <= this.particles.length-1; i++){
      this.particles[i].update(ctx,delta);
    }

    this.e.update(delta);

    // Rewind the last death
    if((one() || this.trapped()) && this.active && this.hereos.length > 0){
      showDeaths = .1;
      if(rewindDelay <= 0){
        rewindDelay=maxDelay;
        // check if new location would cause collision
        let arr = this.hereos[this.hereos.length-1];
        let body = arr.length == 1 ? arr[0] : arr[arr.length-2];
        rec = new rectanlge(body.x, body.y, this.e.hb.w, this.e.hb.h);

        if(!rectColiding(this.e.hb,rec) || !this.active || this.trapped()){
          blockRewind=false;
          this.hereos[this.hereos.length-1].pop();

          if(this.hereos[this.hereos.length-1].length == 0 ){
            this.hereos.splice(this.hereos.length-1,1);
            this.hp++;
            this.active=true;
          }
        } else {
          blockRewind=true;
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

    // Track air time
    if(this.grounded()){
      if(airTime>.8){
        this.addDust(true);
        cart.shakeTime=.08;
        playSound(SHOOT,.4);
      }
      airTime=0;
    } else {
      airTime+=delta;
    }
    cenX = this.e.x-this.e.mhWScaled;
    cenY = this.e.y-this.e.mhHScaled;

    if(offScreen){
      offScreen=false;
      speed=0;
      this.kill();
      if(this.hp>1)this.hp++;
    }
  }

  this.reset = function(){
    this.doneTime=0;
    this.done=false;
    this.hereos = [];
    this.particles=[];
    this.hp=2;
    checkPos=null;
    let lvl=cart.levels[this.e.curLevel];
    this.e.x=lvl.startPos[0];
    this.e.y=lvl.startPos[1];
  }

  this.kill = function(){
    if(this.active){
      this.deaths++;
      cart.shakeTime=.15;
      playSound(DIEFX,1);
      this.hp--;
      this.hereos.push(currentHero);
      currentHero = [];
      this.active=false;
      respawnTime=.5;
      speed=0;
      this.e.sy=16;

      if(this.hp==0){
        this.hereos.splice(this.hereos.length-1,1);
        this.hp++;
      }
    }
  }

  this.setCurrentTile = function(scaled){
    // Set Hero Current Tile
    heroRow = Math.floor((this.e.y - this.e.mhHScaled) / scaled);
    heroCol = Math.floor((this.e.x - this.e.mhWScaled) / scaled);
    heroTileIndex = heroCol + (cart.levels[this.e.curLevel].cols*heroRow);
    if(curTile != null) this.prevTile = curTile;
    curTile = cart.level.tiles[heroTileIndex];

    if(this.e.x != prevPos.x || this.e.y != prevPos.y){
      this.e.colArr = [];

      // Add surrounding tiles
      cart.surTiles.forEach(e => this.e.colArr.push(cart.level.tiles[heroTileIndex+e]));

      // add an entity for each dead body
      this.hereos.forEach(e => addBody(e, this.e.colArr));
    }
  }

  this.addDust = function(both=false){
    if(both){
      for(let i=0;i<rndNo(5,10);i++){
        this.particles.push(new particle(rndNo(5,10), 0, this.e.x-this.e.mhWScaled, this.e.y+this.e.height*2.2-rndNo(1,5), 0, "dust", false, RIGHT));
        this.particles.push(new particle(rndNo(5,10), 0, this.e.x-this.e.mhWScaled, this.e.y+this.e.height*2.2-rndNo(1,5), 0, "dust", false, LEFT));
      }
    } else {
      for(let i=0;i<rndNo(1,4);i++){
        this.particles.push(new particle(rndNo(1,15), 0, this.e.x-this.e.mhWScaled, this.e.y+this.e.height*2.2-rndNo(1,5), 0, "dust", false, lastDir));
      }
    }
    runtime = 0;
  }

  this.canFall = function(){
     return this.gMove(0,1, false, false, true) > 0;
  }

  this.trapped = function(){
     return this.gMove(0,0, false, false, false, true) == 0;
  }

  this.jump = function(){
    if(!jumping && coyote <= maxCoyote && this.active || (this.wRide()&&wallDelay<=0)){
      wallDelay=.2;
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
    canJump = false;

    for (var t = 0; t < this.e.colArr.length; t++) {
      obj = this.e.colArr[t];
      if(obj!=null&&obj.entity!=null){
        e = obj.entity;
        if(obj.isTile()){
          if(rectColiding(e.hb,rec) && obj.active && e.isSolid && rec.y > this.e.y){
            if(e.falls && !e.fall){
              e.fallTime=.2;
              e.fall=true;
            }
            canJump = true;
            break;
          }
        }
      }
    }

    return canJump;
  }

  this.wRide = function(){
    rec = cloneRectanlge(this.e.hb);
    rec.x -= 8;  // Wall Jumping
    rec.w += 16; // Wall Jumping
    rec.y +=2;
    rec.h +=4;
    canJump = false;

    for (var t = 0; t < this.e.colArr.length; t++) {
      obj = this.e.colArr[t];
      if(obj!=null&&obj.entity!=null){
        e = obj.entity;
        if(obj.isTile() && obj.entity.type==types.DEAD){
          if(rectColiding(e.hb,rec) && obj.active && e.isSolid && rec.y > this.e.y){
            canJump = true;
            break;
          }
        }
      }
    }
    return canJump;
  }

  this.gMove = function(xx,yy, grav=false, jump=false, fall=false,trap=false){
    this.e.idle=0;

    var spd = grav ? gravity : speed;
    if(jump){
      jumpH-=.3;
      jumpH = jumpH > 0 ? jumpH : 0;
      spd=jumpH;
    } else if(fall){
      spd=1;
    }

    if(trap)spd=1;

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
        if(obj!=null&&obj.entity!=null){
          e = obj.entity;

          if(obj.isTile()){
            if(rectColiding(e.hb,rec)){
              if(obj.active && e.isSolid){
                canMove = false;
                break;
              }
            }
          }
        } else if(this.e.y>500) {
          offScreen=true;
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
      let tile = new Tile(16, body.x, body.y, 0, types.DEAD, false, 0, 0, scale, false);
      tile.entity.updateHitbox();
      arr.push(tile);
    }
  }

  function drawDead(ctx, e, i, j) {
    // If the rewind is active show all the frames
    if(e.constructor === Array && showDeaths>0 && i == j){
      e.forEach((d,c) => drawDead(ctx, d, c, e.length-1));
    } else if(showDeaths>0) {
      let dx=blockRewind?32:0;
      drawImg(ctx, this.e.image, dx, 16, this.e.width, this.e.height, e.x, e.y, (i/j)+.3, scale);
    }

    // Always draw the last frame of each death
    if(e.constructor === Array){
      let last = e[e.length-1];
      if(last!=null) drawImg(ctx, this.e.image, 0, 16, this.e.width, this.e.height, last.x, last.y, .7, scale);
    }
  }

  this.bloodDrip = function(c){
    for(let i=1;i<10;i++){
      this.particles.push(new particle(rndNo(1,2), 0,c.x+18+rndNo(0,20), c.y+25+rndNo(1,5), 0, "bld", false));
    }
  }

  this.bloodSplatter = function(rndCol,x,y){
    for(let i=0; i<30;i++){
      this.particles.push(new particle(rndNo(1,25), 0, x, y, 0, "circle", rndCol));
      this.particles.push(new particle(rndNo(1,8), 0, x, y, 0, rndCol));
    }
  }

  function addCoords(x, y, arr) {
    // Only keep 10 heros
    if(arr.length>8) arr.splice(0,1);
    arr.push({x: x, y: y, d: lastDir});
  }
}
