function Tile(size, x, y, angle, type, solid, column, row, scale) {
  this.entity = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  this.column = column;
  this.row = row;
  this.active = true;
  this.e=this.entity;

  this.update = function(delta) {
    this.entity.update(delta);
  }

  this.isTile = function(){
    return true;
  }
}
