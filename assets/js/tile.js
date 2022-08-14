function Tile(size, x, y, angle, type, solid, column, row, scale) {
  this.entity = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  this.column = column;
  this.row = row;
  this.active = true;

  this.update = function(delta) {
    this.entity.update(delta);
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
