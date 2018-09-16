const fs = require("fs");
var decodeE = require("./decodeEpub");
var cheerio = require("cheerio");

function parse(path, str) {
  var $ = cheerio.load(str, { decodeEntities: false });
  var client = $("meta[name=client]").attr("content");
  var content = $("#content");
  var result = {};
  result["title"] = $("h2").text();
  result["data"] = decodeE(
    '<div id="content">' + content.html() + "</div>",
    client
  );
  try {
    fs.writeFileSync(path, JSON.stringify(result), "utf8");
    return true;
  } catch (e) {
    console.log(e + "");
    return false;
  }
}

module.exports = parse;
