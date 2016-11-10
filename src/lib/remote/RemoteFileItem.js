'use strict'

const Ftp = require('ftp')
const path = require('path')

function RemoteFileItem (name) {
    this.name = name
    this.extension = path.extname(name)
}


RemoteFileItem.prototype.toElement = function (){
    let elm = document.createElement('option')
    elm.innerHTML = this.name
    return elm
}

module.exports = RemoteFileItem
