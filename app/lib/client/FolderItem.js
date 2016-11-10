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
    elm.innerHTML = `${this.name}/`
    elm.addEventListener('dblclick', () => {
        FolderItem.populateBox(boxElm, this.absolutePath);
    })
    return elm
}

// FolderItem.prototype.cdDirectory = function (boxElm) {
//     FolderItem.populateBox(boxElm, this.absolutePath)
//
// }

FolderItem.populateBox = function(boxElm, dir) {

    boxElm.innerHTML = ""

    fs.readdir(dir, (err, files) => {

        let notDirs = []
        FolderItem.arr = []

        let upDir = document.createElement('option')
        upDir.innerHTML = '../'
        upDir.addEventListener('dblclick', function () {
            FolderItem.populateBox(boxElm, path.dirname(dir))
        })

        boxElm.appendChild(upDir)

        files.forEach(value => {

                let status = fs.statSync(path.join(dir, value))

                if (status.isDirectory())
                    mkFileElmAppender(boxElm, path.join(dir, value), status)()

                else if (status.isFile())
                    notDirs.push(mkFileElmAppender(boxElm, path.join(dir, value), status))

        })
        notDirs.forEach(func => func())
    })
}


function mkFileElmAppender(elm, filePath, status) {

    if (status.isDirectory()){
        let fobj = new FolderItem(filePath, status)
        return () => elm.appendChild(fobj.toElement(elm))
    }

    else if (status.isFile() ) {
        let fobj = new FileItem(filePath, status)
        FolderItem.arr.push(fobj)
        return () => elm.appendChild(fobj.toElement())
    }


    else
        console.log(filePath, 'not a file.');
}

// FolderItem.toElement = (inPath, stat) => FolderItem.prototype.toElement.call({ name: path.basename(inPath), stat })


module.exports = FolderItem
