'use strict'

const fs = require('fs')
const path = require('path')


function FileItem (inPath) {


    this.name = path.basename(inPath)
    this.extension = path.extname(inPath)
    this.absolutePath = path.resolve(inPath)
}


FileItem.prototype.toElement = function () {
    let elm = document.createElement('option')
    elm.innerHTML = `${this.name}`
    return elm
}

// Static Methods
// FileItem.toElement = (inPath, stat) => FileItem.prototype.toElement.call({ name: path.basename(inPath), stat })
// FileItem.toElementOptions = FileItem.prototype.toElement.call



module.exports = FileItem
