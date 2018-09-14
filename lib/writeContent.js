const fs = require("fs");
var decode = require("./decode");
var cheerio = require("cheerio");

function parse(path, str) {
  var $ = cheerio.load(str, { decodeEntities: false });
  var client = $("meta[name=client]").attr("content");
  var content = $("#content");
  var title = $("h2").text();
  var result =
    title +
    "\n\n" +
    decode('<div id="content">' + content.html() + "</div>", client) +
    "\n\n\n\n";
  try {
    fs.writeFileSync(path, result, "utf8");
    return true;
  } catch (e) {
    console.log(e + "");
    return false;
  }
}

module.exports = parse;
