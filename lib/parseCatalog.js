var cheerio = require("cheerio");

function parse(str) {
  var $ = cheerio.load(str);
  var title99 = $("#dir");
  var logs = $("dd", title99);
  var catalogs = [];
  catalogs.push($("h2", str).text());
  logs.each((i, elem) => {
    catalogs.push($("a", elem).attr("href"));
  });
  return catalogs;
}

module.exports = parse;
