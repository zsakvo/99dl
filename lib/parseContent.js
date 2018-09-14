var cheerio = require("cheerio");
var decode = require("./decode");
var writeContent = require("./writeContent");

function parse(a, b) {
  new Promise((resolve, reject) => {
    var $ = cheerio.load(b, { decodeEntities: false });
    var client = $("meta[name=client]").attr("content");
    var content = $("#content");
    var title = $("h2").text();
    var result =
      title +
      "\n\n" +
      decode('<div id="content">' + content.html() + "</div>", client) +
      "\n\n\n\n";
    writeContent(a, result);
  });

  var $ = cheerio.load(b, { decodeEntities: false });
  var client = $("meta[name=client]").attr("content");
  var content = $("#content");
  var title = $("h2").text();
  var result =
    title +
    "\n\n" +
    decode('<div id="content">' + content.html() + "</div>", client) +
    "\n\n\n\n";
  writeContent(a, result);
}

module.exports = parse;
