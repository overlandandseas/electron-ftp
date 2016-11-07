'use strict'
const fs = require('fs')
const shell = require('electron').shell
const os = require('os')

const fileManagerBtn = document.getElementById('open-local-file-manager')

fileManagerBtn.addEventListener('click', event => {
    shell.showItemInFolder(os.homedir())
})
