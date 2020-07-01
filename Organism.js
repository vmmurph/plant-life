// requires Tools.js

function Plant (color = 0) {
  this.name = 'Plant'
  this.asText = function () { return 'P' + this.size }
  this.size = 1
  this.tile = {}
  this.color = color

  this.propagate = function () {
    let neighbors = this.tile.world.getNeighbors(this.tile.xloc, this.tile.yloc)
    let index = Math.floor(Math.random() * neighbors.length)
    let chosenTile = neighbors[index]
    if (!chosenTile.obj) {
      // how fast the plant color mutates
      let newColor = this.color + Tools.getRand(-100, 100)
      // these should correlate to the steps in Tools.getHexColor
      if (newColor < 0) newColor = 999
      if (newColor > 999) newColor = 0
      this.tile.world.insert(new Plant(newColor), chosenTile.xloc, chosenTile.yloc)
    }
  }

  this.grow = function () {
    if (this.size < 4 && Tools.roll(50) ) {
      this.size++
    }
  }

  this.onTimeStep = () => {
    this.propagate()
    this.grow()
  }

  return this
}

console.log('Organism.js loaded')
