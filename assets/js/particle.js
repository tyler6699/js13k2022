function particle(w, h, x, y, angle, type) {
  this.time=0;
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.type=type;
  this.endPos=partDir(this);
  this.speed=7;
  this.angle = Math.atan2(this.endPos.y - this.y, this.endPos.x - this.x);
  this.remove=false;
  this.alpha=1;
  this.colour = "#" + ["FF0000","B30000","7D0000","FF8080"][rndNo(0,3)];

  this.update = function(ctx, delta) {
    this.time+=delta;

    if(this.type=="circle"){
      let dir = Math.atan2(this.y-this.endPos.y,this.x-this.endPos.x) + (Math.PI) + (Math.random() - 0.5) * 2;
      if(Math.hypot(this.endPos.x-this.x, this.endPos.y-this.y)>=10){
        this.x += Math.cos(dir)*this.speed-(this.time*6);
        this.y += Math.sin(dir)*this.speed-(this.time*6);
      }

      this.alpha-=.01;

      if(this.w>1)this.w -= .75;
      ctx.beginPath();
      ctx.globalAlpha=this.alpha;
      ctx.arc(this.x, this.y, this.w, 0, 6.283185307179586);
      ctx.fillStyle = this.colour
      ctx.fill();
      if(this.time > .6)this.remove=true;
    }
  }

}
