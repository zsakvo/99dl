var progressBar = require("progress");

function initPb(bookName, contentNum) {
  return new progressBar(bookName + " [:bar] :percent", {
    complete: "=",
    incomplete: "",
    width: 40,
    total: contentNum
  });
}

module.exports = initPb;
