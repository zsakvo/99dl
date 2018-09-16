var parse = require("../lib/parseCatalog");
var rp = require("request-promise");

async function getCatalog(bid, opt) {
  var catalogs = [];
  catalogs.push(bid);
  var bookUrl = "http://www.99lib.net/book/" + bid + "/index.htm";
  opt["uri"] = bookUrl;
  return rp(opt)
    .then(res => {
      var catalog = parse(res);
      for (var i = 0; i < catalog.length; i++) {
        var contentUrl;
        if (i < 3) {
          contentUrl = catalog[i];
        } else {
          contentUrl = "http://www.99lib.net" + catalog[i];
        }
        catalogs.push(contentUrl);
      }
      return catalogs;
    })
    .catch(function(err) {
      console.log("\n" + err);
      return null;
    });
}

module.exports = getCatalog;
