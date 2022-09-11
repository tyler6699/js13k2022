function Tile(size, x, y, angle, type, solid, column, row, scale, trigger) {
  this.entity = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  this.column = column;
  this.row = row;
  this.active = true;
  this.trigger=trigger;
  this.e=this.entity;

  this.update = function(delta) {
    this.entity.update(delta);

    // Falling Blocks
    if(this.e.falls && this.e.fall && this.e.active){
      this.e.fallTime-=delta;
      if(this.e.fallTime<=0){
        this.e.y+=5
        if(this.e.fallTime<-1) this.e.active=false;
      };
    }
  }

  this.change = function(){
    if (this.entity.type >= Object.values(types).length){
      this.entity.type = 0;
    }
    this.entity.setType();
  }

  this.isTile = function(){
    return true;
  }
}
