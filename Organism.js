// requires Tools.js

function Plant (color = 0) {
  this.name = 'plant'
  this.asText = function () { return 'P' + this.size }
  this.size = 1
  this.tile = {}
  this.color = color
  this.doneGrowing = false

  this.propagate = function () {
    if (this.doneGrowing) return
    let neighbors = this.tile.world.getNeighbors(this.tile.xloc, this.tile.yloc)
    let openNeighbors = neighbors.filter(e => !e.obj)
    if (openNeighbors.length < 1) {
      this.doneGrowing = true
      return
    }
    let index = Tools.getRand(0, openNeighbors.length - 1)
    let chosenTile = openNeighbors[index]
    if (Tools.roll(5)) {
      // how fast the plant color mutates
      let newColor = this.color + Tools.getRand(-75, 75)
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
}

function Barrier () {
  this.name = 'barrier'
  this.asText = '<>'
  this.tile = {}

  this.onTimeStep = () => {}
}

console.log('Organism.js loaded')
