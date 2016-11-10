'use strict'

const Ftp = require('ftp')
const path = require('path')

const RemoteFileItem = require('./RemoteFileItem')

function RemoteFolderItem(inPath) {
    this.name = path.basename(inPath)
    this.absolutePathpath = inPath
}

RemoteFolderItem.prototype.toElement = function (boxElm) {
    let elm = document.createElement('option')
    elm.innerHTML = `${this.name}/`
    elm.addEventListener('dblclick', () => {
        RemoteFolderItem.populateBox(boxElm, this.name)
    })
    return elm
}

RemoteFolderItem.populateBox = (boxElm, dir) => {
    c.cwd(dir, () => {

        boxElm.innerHTML = ""

        RemoteFolderItem.arr = []

        let notDirs = []
        c.pwd((err, pwd) => {
            c.list( (err, list) => {
                if (pwd !== '/'){
                    let upDir = document.createElement('option')
                    upDir.innerHTML = '../'
                    upDir.addEventListener('dblclick', () => {
                        RemoteFolderItem.populateBox(boxElm, '..')
                    })

                    boxElm.appendChild(upDir)
                }

                list.forEach(value => {

                    if (value.type === 'd') mkRemoteFileElmAppender(boxElm, value)()
                    notDirs.push(mkRemoteFileElmAppender(boxElm, value))
                })
                notDirs.forEach(func => func())

            })
        })
    })
}

function mkRemoteFileElmAppender(elm, file) {
    if (file.type === 'd'){
        let folderObj = new RemoteFolderItem(file.name)
        return () => elm.appendChild(folderObj.toElement(elm))
    }
    else if (file.type === '-'){
        let fileObj = new RemoteFileItem(file.name)
        RemoteFolderItem.arr.push(fileObj)
        return () => elm.appendChild(fileObj.toElement(elm))
    } else
        console.log(file, 'not a file.')
}
module.exports = RemoteFolderItem
