/*
* 编译
*
*/

var fs = require('fs');
var path = require('path');

var rmdirSync = (function () {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);//收集目录
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path, dirs) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }
    return function (dir, cb) {
        cb = cb || function () { };
        var dirs = [];

        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();



function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws);
}


function copyFolder(srcDir, tarDir, cb) {
    fs.readdir(
        srcDir,
        function (err, files) {
            var count = 0
            var checkEnd = function () {
                ++count == files.length && cb && cb()
            }
            if (err) {
                checkEnd()
                return
            }

            files.forEach(function (file) {
                var srcPath = path.join(srcDir, file)
                var tarPath = path.join(tarDir, file)
                fs.stat(srcPath, function (err, stats) {
                    if (stats.isDirectory()) {
                        if (!fs.existsSync(tarPath)) {
                            fs.mkdirSync(tarPath);
                        }
                        copyFolder(srcPath, tarPath, checkEnd);
                    } else {
                        if (!file.match(/^.*?\.(jpe?g|png|bmp|gif|less|css|scss|eot|svg|ttf|woff|json|js)$/)) {
                            return;
                        }
                        copyFile(srcPath, tarPath, checkEnd);
                    }
                })
            })

            //为空时直接回调
            files.length === 0 && cb && cb()
        })
}


const sourcePath = path.resolve(__dirname, '../src/lib');
const targetPath = path.resolve(__dirname, '../lib');

if (!fs.existsSync(sourcePath)) {
    console.log('error')
}
if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
}
else {
    rmdirSync(targetPath);
    fs.mkdirSync(targetPath);
}

copyFolder(sourcePath, targetPath, function (err) {
    if (err) {
        console.log(err);
        return
    }
    //continue
})


