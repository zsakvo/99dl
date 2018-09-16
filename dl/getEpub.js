var fs = require("fs-extra");

var bookName;
var author;
var cover;
var content;
var dlDir;

function get(catalog, opt, config) {
  console.log("Epub");
  if (bookName == null) bookName = catalog[1];
  if (author == null) author = catalog[2];
  if (cover == null) cover = catalog[3];
  if (dlDir == null) dlDir = config.dlDir;
  if (!fs.existsSync(dlDir)) fs.mkdirsSync(dlDir);
}
module.exports = get;
