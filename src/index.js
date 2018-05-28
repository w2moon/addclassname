

var through = require('through2');
var gutil = require('gulp-util');
var stream = require('stream');


var PluginError = gutil.PluginError;


function addClassName(str) {
  let reg = /__extends\(([\w_\/]+)\, _super\)\;/gi;
  let regImport = /[\w_\/]+/gi;
  let arr = reg.exec(str);
  let replace = [];
  let ostr = str;
  while (arr) {
    let moduleName = arr[1];
    let o = str.substr(arr.index, arr[0].length);
    ostr = ostr.replace(o, o + moduleName + ".dname=\"" + moduleName + "\";");
    arr = reg.exec(str);
  }
  return ostr;

}

// 常量
const PLUGIN_NAME = 'addclassname';


// 插件级别函数 (处理文件)
function gulpAddClassName() {



  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      file.contents = new Buffer(addClassName(file.contents.toString()));
      this.push(file);
      return cb();
    }

    if (file.isStream()) {

      var converter = new stream.Writable();
      let data = []; 
      converter._write = function (chunk,enc,done) {
        data.push(chunk);
        done();
      };
      converter.on('finish', () =>{ 
        file.contents = new Buffer(addClassName(Buffer.concat(data).toString()));
        this.push(file);
        cb();
      });
      file.contents.pipe(converter);
     
    }




  });

}

// 暴露（export）插件的主函数
module.exports = gulpAddClassName;