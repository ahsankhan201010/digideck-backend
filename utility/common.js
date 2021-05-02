const fs = require("fs");

exports.readFile = (path, format) => {
    return new Promise((res,rej) => {
        fs.readFile(path,format,(err,data) => {
            if(err) rej(err)
            res(JSON.parse(data))
        })
    })
}

exports.writeFile = (path,data) => {
    return new Promise((res,rej) => {
        fs.writeFile(path,JSON.stringify(data),(err) => {
            if(err) rej(err)
            res("done")
        })
    })
}