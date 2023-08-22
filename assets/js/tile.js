function Tile(id, size, x, y, angle, type, solid, column, row, scale) {
  this.id = id;
  // Used to pair up a tile and an object sitting on it.
  this.obj=null;
  // Add some height to the map
  this.up=getElevationOffset(column, row, colz, colz);
  y += this.up;

  // Drop height for intro (Tiles fall from the sky)
  this.drop = getCurveOffset(column, row, colz, colz);
  this.e = new entity(size, size, x, y, angle, type, "", scale, 0, 0);
  // Make grass dark
  if(this.up>=0&&type==types.GRASS){
    this.e.sx=16;
    this.e.sy=16;
  } else if(this.up==-12&&type==types.GRASS){
    this.e.sx=32;
    this.e.sy=16;
  }
  this.column = column;
  this.row = row;
  this.active = true;
  if(type==types.GRASS) this.e.y -= 4;
  // Water is generated after the entities are made.
  if(type==types.SND) this.e.y +=2;

  // SEA
  this.oscillationSpeed = 0.8;  // How fast it moves up and down.
  this.oscillationAmount = 7;  // How much it moves up and down.
  this.initialY = this.e.y;    // Store the initial Y position to use it as a reference.

  // Set new height to drop from.
  this.e.y=this.e.y+this.drop;

  this.update = function(delta) {
    this.e.y = lerp(this.e.y,this.initialY,.08);

    if (this.e.type == types.SEA) {
      // Get the current time in seconds
      let currentTime = Date.now() * 0.001;

      // Calculate the new Y based on a sine wave.
      let offsetY = Math.sin(currentTime * this.oscillationSpeed + this.column) * this.oscillationAmount;
      this.e.offsetY=0;
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

    // Define the size of the central raised areas
    const innerRadiusOfInfluence = Math.min(maxCols, maxRows) / 4;
    const outerRadiusOfInfluence = Math.min(maxCols, maxRows) / 3;

    // Define the elevation amounts
    const maxInnerElevation = 24;
    const maxOuterElevation = 12;

    // Add randomness to the tile's position
    const randomOffset = (Math.random() - 0.5) * 2; // range [-1, 1]
    const perturbedC = c + randomOffset;
    const perturbedR = r + randomOffset;

    const dist = Math.sqrt((perturbedC - centerX) * (perturbedC - centerX) + (perturbedR - centerY) * (perturbedR - centerY));

    // Elevate the tiles based on which radius of influence they fall into
    if (dist < innerRadiusOfInfluence) {
        return -maxInnerElevation;
    } else if (dist < outerRadiusOfInfluence) {
        return -maxOuterElevation;
    }
    return 0; // No elevation for tiles outside of both radii
}


// function getElevationOffset(c, r, maxCols, maxRows) {
//     const centerX = maxCols / 2;
//     const centerY = maxRows / 2;
//     const radiusOfInfluence = Math.min(maxCols, maxRows) / 3; // Change this to set the size of the central raised area
//     const maxElevation = 12;  // The amount the center tiles will be elevated
//
//     const dist = Math.sqrt((c - centerX) * (c - centerX) + (r - centerY) * (r - centerY));
//
//     if (dist < radiusOfInfluence) {
//         return -maxElevation; // Elevate the tiles within the radius of influence
//     }
//     return 0; // No elevation for tiles outside of the radius
// }
