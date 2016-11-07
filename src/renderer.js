'use strict'
const fs = require('fs')
const os = require('os')
const path = require('path')
const Electron = require('electron')

const FileItem = require('./lib/FileItem')

const shell = Electron.shell

const rightBox = document.getElementById('right-side-file-list')

document.getElementById('populate-box').addEventListener('click', event => {

    fs.readdir(__dirname, (err, listOfFiles) => {
        listOfFiles.forEach((value, index) => {
            let status = fs.statSync(path.join(__dirname, value))
            if (status.isFile()) {
                let file = new FileItem(path.join(__dirname, value), status)
                rightBox.appendChild(file.toElement())
            }
        })
    })
})
