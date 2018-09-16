const fs = require("fs-extra");
const path = require("path");
var Epub = require("epub-gen");

var content = [];
var option = {};

function outPut(bookName, author, cover, catalog, tmpDir, dlDir) {
  var catalogs = [];
  for (let i = 0; i < catalog.length; i++) {
    let url = catalog[i];
    let chapters = url.split("/");
    let chapter = chapters[chapters.length - 1];
    catalogs.push(chapter);
  }
  try {
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    for (var i = 0; i < catalogs.length; i++) {
      content.push(JSON.parse(fs.readFileSync(path.join(tmpDir, catalogs[i]))));
    }
    option["title"] = bookName;
    option["author"] = author;
    option["cover"] = path.join(tmpDir, "cover.jpg");
    option["content"] = content;
    new Epub(option, path.join(dlDir, bookName + ".epub"));
  } catch (e) {
    console.log(e);
  }

  //   fs.emptyDirSync(path.dirname(tmpDir));
}

module.exports = outPut;
