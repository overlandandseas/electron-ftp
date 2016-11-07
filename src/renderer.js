'use strict'
const       fs = require('fs')
const       os = require('os')
const      Ftp = require('ftp')
const     path = require('path')
const Electron = require('electron')

const FileItem = require('./lib/FileItem')
// const FolderItem = require('./lib/FolderItem')

const shell = Electron.shell

const leftBox = document.getElementById('left-side-file-list')
const rightBox = document.getElementById('right-side-file-list')


window.login = () => {
    let formData = new FormData(document.querySelector('form'))
    c.connect({
        host: formData.get('host'),
        port: formData.get('port'),
        user: formData.get('user'),
        password: formData.get('password')
    })
}

document.getElementById('login').addEventListener('click', window.login)


populateBox(leftBox, __dirname)

// populateBox(rightBox, os.homedir())
window.c = new Ftp()
c.on('ready', function () {
    c.list((err, list) => {
        console.dir(list)
        list.forEach(file => {
            if (file.type === '-') {
                rightBox.appendChild(FileItem.toElement(file.name, { stat: file }))
            } else {
                console.log('probs a directory', file.name)
            }
        })
        c.end()
    })
})



function populateBox(boxElm, dir) {

    boxElm.innerHTML = ""

    fs.readdir(dir, (err, files) => {

        let notDirs = []

        let upDir = document.createElement('option')
        upDir.innerHTML = '../'
        upDir.addEventListener('dblclick', function () {
            populateBox(boxElm, path.dirname(dir))
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

    if (status.isDirectory())
        return () => elm.appendChild(new FolderItem(filePath, status).toElement())

    else if (status.isFile())
        return () => elm.appendChild(FileItem.toElement(filePath, status))

    else
        console.log(filePath, 'not a file.');
}


//for now

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
    populateBox(leftBox, this.absolutePath)

}

FolderItem.toElement = (inPath, stat) => FolderItem.prototype.toElement.call({ name: path.basename(inPath), stat })
