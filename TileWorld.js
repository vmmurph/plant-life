/*
add barriers
*/

/*
have an organism object with functions
  asText
  onTimestep
  locx, locy
*/

function Tile () {
  return this
}

function TileWorld (width, height) {
  this.width = width
  this.height = height
  this.grid = []
  this.flatGrid = []

  for (let x = 0; x < width; x++) {
    this.grid[x] = []
    for (let y = 0; y < height; y++) {
      let t = new Tile()
      t.xloc = x
      t.yloc = y
      t.obj = null
      t.world = this
      this.grid[x][y] = t
      this.flatGrid.push(t)
    }
  }

  this.getTile = function (x, y) {
    return this.grid[x][y]
  }

  this.display = function () {
    let displayString = ''
    for (let y = 0; y < this.grid[0].length; y++) {
      for (let x = 0; x < this.grid.length; x++) {
        let tile = this.getTile(x, y)
        if (tile.obj)
          displayString += tile.obj.asText() + ' '
        else
          displayString += '__ '
      }
      displayString += '\n'
    }
    console.log(displayString)
  }

  this.timeStep = function () {
    const objs = []
    this.flatGrid.forEach(tile => {
      if (tile.obj) objs.push(tile.obj)
    })
    objs.forEach(obj => {
      obj.onTimeStep()
    })
  }

  this.insert = function (obj, x, y) {
    let tile = this.getTile(x, y)
    obj.tile = tile
    tile.obj = obj
  }

  this.getNeighbors = function (x, y) {
    let list = []
    if (x > 0) list.push(this.grid[x-1][y])
    if (y > 0) list.push(this.grid[x][y-1])
    if (x < width - 1) list.push(this.grid[x+1][y])
    if (y < height - 1) list.push(this.grid[x][y+1])
    return list
  }
}


/*
- make it so you call al.TileWorld(10, 10) and it gives you a 10 by 10 world of null values
- create a display function where null is 0
- create a plant object that has a size attribute
- get display function to show plant objects as P2 or P9
*/

console.log('TileWorld.js loaded')