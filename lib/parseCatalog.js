var cheerio = require("cheerio");

function parse(str) {
  var $ = cheerio.load(str);
  var title99 = $("#dir");
  var logs = $("dd", title99);
  var catalogs = [];
  var author = "";
  $("a", $("h4", str).first()).each((i, elem) => {
    author += elem.children[0].data + " ";
  });
  catalogs.push($("h2", str).text());
  catalogs.push(author);
  catalogs.push(
    $("img", str)
      .first()
      .attr("src")
  );
  logs.each((i, elem) => {
    catalogs.push($("a", elem).attr("href"));
  });
  return catalogs;
}

module.exports = parse;
