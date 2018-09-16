var request = require("request");
var rp = require("request-promise");
var fs = require("fs-extra");
var Readable = require("stream").Readable;

var writeStream = fs.createWriteStream("image.jpg", { autoClose: true });

function gc(opt) {
  request(opt).pipe(writeStream);
  writeStream.on("finish", function() {
    console.log("文件写入成功");
  });
}

module.exports = gc;
