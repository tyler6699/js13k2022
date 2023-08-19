function Tile(size, x, y, angle, type, solid, column, row, scale) {
  // Calculate offset for the tile's y-position
  this.elevation = getElevationOffset(column, row, colz, colz);
  y += this.elevation;
  this.noDrop=y;
  this.drop = getCurveOffset(column, row, colz, colz);
  this.dropping=true;
  this.e = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  this.column = column;
  this.row = row;
  this.active = true;

  this.oscillationSpeed = 0.5;  // How fast it moves up and down.
  this.oscillationAmount = 5;  // How much it moves up and down.
  this.initialY = y;            // Store the initial Y position to use it as a reference.

  this.update = function(delta) {
    if(this.dropping && this.e.y < this.noDrop){
      this.e.y = lerp(this.e.y,this.noDrop ,.06);
    } else {
      this.dropping = false;
      this.e.y=this.noDrop;
    }

    if (this.e.type == types.SEA) {
      // Get the current time in seconds
      let currentTime = Date.now() * 0.001;

      // Calculate the new Y based on a sine wave.
      let offsetY = Math.sin(currentTime * this.oscillationSpeed + this.column) * this.oscillationAmount;
      this.e.y = this.initialY + offsetY;
    }
    this.e.update(delta);
  }

  this.isTile = function(){
    return true;
  }

}

function getCurveOffset(c, r, maxCols, maxRows) {
    const centerX = maxCols / 2;
    const centerY = maxRows / 2;

    // Parameters that determine the height and width of the bell curve
    const height = 500;  // This determines how much the center tiles will be elevated
    const width = Math.min(maxCols, maxRows) / 3;

    const distSq = (c - centerX) * (c - centerX) + (r - centerY) * (r - centerY);
    const elevation = height * Math.exp(-distSq / (2 * width * width));

    // Since we want the center to be higher and the edges to be lower, subtract the elevation value
    return -elevation;
}

function getElevationOffset(c, r, maxCols, maxRows) {
    const centerX = maxCols / 2;
    const centerY = maxRows / 2;
    const radiusOfInfluence = Math.min(maxCols, maxRows) / 3; // Change this to set the size of the central raised area
    const maxElevation = 12;  // The amount the center tiles will be elevated

    const dist = Math.sqrt((c - centerX) * (c - centerX) + (r - centerY) * (r - centerY));

    if (dist < radiusOfInfluence) {
        return -maxElevation; // Elevate the tiles within the radius of influence
    }
    return 0; // No elevation for tiles outside of the radius
}
