const fs = require("fs-extra");
const path = require("path");

var content = "";

function outPut(bookName, catalog, tmpDir, dlDir) {
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
      content += fs.readFileSync(path.join(tmpDir, catalogs[i]));
    }
    fs.writeFileSync(path.join(dlDir, bookName + ".txt"), content, "utf-8");
  } catch (e) {
    console.log(e);
  }

  fs.emptyDirSync(path.dirname(tmpDir));
}

module.exports = outPut;
