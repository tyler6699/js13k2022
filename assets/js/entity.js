function entity(w, h, x, y, angle, type, colour, scale, isButton = false, maxHP = 0) {
  this.scale = scale;
  this.type = type;
  this.width = w;
  this.height = h;
  this.mhWidth = w / -2;
  this.mhHeight = h / -2;
  this.mhWScaled = (w / -2) * scale;
  this.mhHScaled = (h / -2) * scale;
  this.hWidth = w / 2;
  this.hHeight = h / 2;
  this.yOffset = 0;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.active = true;
  this.colour = colour;
  this.image = atlas;
  this.animated = false;
  this.alpha = 1;
  this.currentTile=0;
  this.colArr = [];
  this.isSolid = false;
  this.isButton = isButton;
  this.time=0;
  this.maxHP=maxHP;
  this.hp=this.maxHP;
  this.breaks=false;
  this.flip=false;
  this.idle=0;

  // ATLAS Positions
  this.sx=0;
  this.sy=0;

  this.setHitbox = function() {
    this.hb = new rectanlge(0, 0, 0, 0);
    this.sensor = new rectanlge(0, 0, 0, 0);
    if(this.isButton){
      this.hb.w = this.width * 2;
      this.hb.h = this.height * 2;
    }
  }
  this.setHitbox();

  this.updateHitbox = function() {
    // Buttons are rendered the screen size and do not need scaling
    if(this.isButton){
      this.hb.x = this.x - this.width;
      this.hb.y = this.y - this.height;
    } else {
      // Images are all scaled up so hitboxes are also scaled up
      this.hb.x = this.x + (this.scale/2);
      this.hb.y = this.y + (this.scale/2);
      this.hb.w = (this.width * this.scale) - this.scale;
      this.hb.h = (this.height * this.scale) - this.scale;

      this.sensor.x = this.x-5;
      this.sensor.y = this.y-5;
      this.sensor.w = (this.width * this.scale) + 10;
      this.sensor.h = (this.height * this.scale) + 10;
    }
  }

  // Render
  this.update = function(delta) {
    this.idle+=delta;
    this.updateHitbox();

    if(this.active && !this.isFloor()) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.alpha;

      img = this.image;
      s   = this.scale;
      mhw = this.mhWidth;
      mhh = this.mhHeight;
      hw  = this.hWidth;
      hh  = this.hHeight;
      w   = this.width;
      h   = this.height;

      if(cart.shakeTime>0){
        cart.shakeTime-=delta/1000;
        ctx.translate(cart.shake,cart.shake);
      }

      // Animate Image
      if (this.image == null) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((mhw *.5) * s, (mhh * .5) * s, (w * .5) * s, (h * .5) * s);
      // Image
      } else {
        if (this.flip){
          ctx.scale(-1, 1);
          ctx.translate(-(w*s)-w,0);
        } else {
          ctx.scale(1, 1);
        }
        f=0; // float
        z=0; // hover

        ctx.drawImage(img, this.sx, this.sy, w, h, hw+z, hh+f, w * s, h * s);
      }
      ctx.restore();
    }
  }

  this.isHero = function(){
    return this.type == types.HERO;
  }

  this.isTile = function(){
    return false;
  }

  this.setT = function(t){
    this.type = t;
    this.setType();
  }

  this.isFloor = function(){
    return this.type == types.FLOOR;
  }

  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;
    this.isSolid = false;

    switch(this.type) {
      case types.HERO:
        this.isSolid = true;
        this.sx=0;
        this.sy=0;
        break;
      case types.WALL:
        this.sy=16;
        break;
      case types.BLOCK:
        this.isSolid = true;
        this.sx=16;
        break;
      case types.FLOOR:
        this.sx=32;
        this.sy=32;
        this.alpha = .9;
        break;
      case types.AIR:
        this.sx=144;
        break;
     }
  }

  this.setType();
}
