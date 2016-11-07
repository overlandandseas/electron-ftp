'use strict'

const fs = require('fs')
const path = require('path')


class FileItem {

    constructor(inPath, stat) {

        if (stat)
            this.stat = stat
        else
            this.stat = fs.statSync(inPath);

            this.name = path.basename(inPath)
            this.extension = path.extname(inPath)
            this.absolutePath = path.resolve(inPath)

    }

    toElement() {
        let elm = document.createElement('p')
        elm.innerHTML = `File: ${this.name} Size: ${this.stat.size / 1000} KB`
        return elm
    }
}

module.exports = FileItem
