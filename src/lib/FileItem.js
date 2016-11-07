'use strict'

const fs = require('fs')
const path = require('path')


function FileItem (inPath, stat) {

    this.stat = stat || fs.statSync(inPath)
    this.name = path.basename(inPath)
    this.extension = path.extname(inPath)
    this.absolutePath = path.resolve(inPath)
}


FileItem.prototype.toElement = function () {
    let elm = document.createElement('option')
    elm.innerHTML = `File: ${this.name} Size: ${Number(this.stat.size) / 1000} KB`
    return elm
}

// Static Methods
FileItem.toElement = (inPath, stat) => FileItem.prototype.toElement.call({ name: path.basename(inPath), stat })


// FileItem.toElementOptions = FileItem.prototype.toElement.call

module.exports = FileItem
