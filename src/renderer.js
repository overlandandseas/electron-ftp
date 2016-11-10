'use strict'
const       fs = require('fs')
const       os = require('os')
const      Ftp = require('ftp')
const     path = require('path')
const Electron = require('electron')

const FileItem = require('./lib/client/FileItem')
const FolderItem = require('./lib/client/FolderItem')

const RemoteFileItem = require('./lib/remote/RemoteFileItem')
const RemoteFolderItem = require('./lib/remote/RemoteFolderItem')

const shell = Electron.shell

const leftBox = document.getElementById('left-side-file-list')
const rightBox = document.getElementById('right-side-file-list')


window.login = e => {
    e.preventDefault()
    let formData = new FormData(document.querySelector('form'))
    c.connect({
        host: formData.get('host'),
        port: formData.get('port'),
        user: formData.get('user'),
        password: formData.get('password')
    })
}

document.getElementById('login').addEventListener('click', window.login)


FolderItem.populateBox(leftBox, __dirname)


window.c = new Ftp()
c.on('ready', function () {
    RemoteFolderItem.populateBox(rightBox, '~')
})


// put link
document.getElementById('put-link').addEventListener('click', e => {

    e.preventDefault()

    let selectedToNames = Array.prototype.filter
        .call(leftBox.querySelectorAll('option'), i => i.selected)
        .map(i => i.innerHTML)

    let paths = FolderItem.arr
        .filter(file => selectedToNames.includes(file.name))
        .map(file => new Promise(res => c.put(file.absolutePath, file.name, err => res())))

    c.pwd((err, pwd) => {
        Promise.all(paths).then(() => {
            RemoteFolderItem.populateBox(rightBox, pwd)
        })
    })
})


// get link
document.getElementById('get-link').addEventListener('click', e => {

    e.preventDefault()

    let pwd = path.dirname(FolderItem.arr[0].absolutePath)

    let selectedToNames = Array.prototype.filter
        .call(rightBox.querySelectorAll('option'), i => i.selected)
        .map(i => i.innerHTML)

    let paths = RemoteFolderItem.arr
        .filter(file => selectedToNames.includes(file.name))
        .map(file => new Promise(res => c.get(file.name, (err, stream) => {
            stream.once('close', res)
            stream.pipe(fs.createWriteStream(path.join(pwd, file.name)))
        })))



    Promise.all(paths).then(() => FolderItem.populateBox(leftBox, pwd))

})
