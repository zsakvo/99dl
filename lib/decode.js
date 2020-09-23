var cheerio = require("cheerio");
var client;

base64 = {
  map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  decode: function (a) {
    var b = (d = "");
    for (var i = 0; i < a.length; i++) {
      if (a.substr(i, 1) == "=") {
        break;
      }
      var c = this.map.indexOf(a.charAt(i)).toString(2);
      d +=
        { 1: "00000", 2: "0000", 3: "000", 4: "00", 5: "0", 6: "" }[c.length] +
        c;
    }
    var d = d.match(/[0-1]{8}/g);
    for (var i = 0; i < d.length; i++) {
      b += String.fromCharCode(parseInt(d[i], 2));
    }
    return b;
  },
};

function init(a) {
  this.box = a;
  for (var i = 0; i < this.box.children().length; i++) {
    if (this.box.children()[i].name == "h2") {
      this.star = i + 1;
    }
    if (
      this.box.children()[i].name == "DIV" &&
      this.box.children()[i].attribs.class != "chapter"
    ) {
      break;
    }
  }
  return load();
}

function load() {
  let nodes = [];
  var e = base64.decode(client).split(/[A-Z]+%/);
  var j = 0;
  for (var i = 0; i < e.length; i++) {
    if (e[i] < 3) {
      nodes[e[i]] = this.box
        .children()
        .eq(i + this.star)
        .text();
      j++;
    } else {
      nodes[e[i] - j] = this.box
        .children()
        .eq(i + this.star)
        .text();
      j = j + 2;
    }
  }
  let result = "";
  for (var s = 0; s < nodes.length; s++) {
    result += nodes[s] + "\n";
  }
  return result;
}

function decode(a, b) {
  var $ = cheerio.load(a, { decodeEntities: false });
  $(
    "abbr,bdi,command,footer,keygen,mark,strike,acronym,bdo,big,site,code,dfn,kbd,q,s,samp,tt,u,var,cite,details,figure"
  ).remove();
  client = b;
  return init($("#content"));
}

module.exports = decode;
