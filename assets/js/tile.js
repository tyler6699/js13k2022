function Tile(size, x, y, angle, type, solid, column, row, scale) {
  // Calculate offset for the tile's y-position
  this.elevation = getElevationOffset(column, row, colz, colz);
  y += this.elevation;

  this.entity = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  this.column = column;
  this.row = row;
  this.active = true;
  this.e=this.entity;

  this.oscillationSpeed = 0.5;  // How fast it moves up and down.
  this.oscillationAmount = 5;  // How much it moves up and down.
  this.initialY = y;            // Store the initial Y position to use it as a reference.

  this.update = function(delta) {

  if (this.entity.type == types.SEA) {
      // Get the current time in seconds
      let currentTime = Date.now() * 0.001;

      // Calculate the new Y based on a sine wave.
      let offsetY = Math.sin(currentTime * this.oscillationSpeed + this.column) * this.oscillationAmount;

      this.entity.y = this.initialY + offsetY;
    }

    this.entity.update(delta);
  }

  this.isTile = function(){
    return true;
  }

}

function getElevationOffset(c, r, maxCols, maxRows) {
    const centerX = maxCols / 2;
    const centerY = maxRows / 2;
    const radiusOfInfluence = Math.min(maxCols, maxRows) / 3; // Change this to set the size of the central raised area
    const maxElevation = 10;  // The amount the center tiles will be elevated

    const dist = Math.sqrt((c - centerX) * (c - centerX) + (r - centerY) * (r - centerY));

    if (dist < radiusOfInfluence) {
        return 0; //-maxElevation; // Elevate the tiles within the radius of influence
    }
    return 0; // No elevation for tiles outside of the radius
}
