/*
 *  DEPRICATED
 *  (for now)
 *
 *
'use strict'

const fs = require('fs')
const path = require('path')

const FileItem = require('./FileItem')

function FolderItem (inPath, stat) {

    this.stat = stat || fs.statSync(inPath)
    this.name = path.basename(inPath)
    this.extension = path.extname(inPath)
    this.absolutePath = path.resolve(inPath)

}

FolderItem.prototype.toElement = function (boxElm) {
    let elm = document.createElement('option')
    elm.innerHTML = `Directory: ${this.name}/`
    elm.addEventListener('dblclick', () => {
        this.cdDirectory(boxElm);
    })
    return elm
}

FolderItem.prototype.cdDirectory = function (boxElm) {
    let elm = document.createElement('select')
    fs.readdir(this.absolutePath, (err, files) => {
        elm.appendChild(FileItem.toElement())


    })

}

FolderItem.toElement = (inPath, stat) => FolderItem.prototype.toElement.call({ name: path.basename(inPath), stat })



module.exports = FolderItem
*/
