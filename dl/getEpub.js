var fs = require("fs-extra");
var path = require("path");
var rp = require("request-promise");
var writeContent = require("../lib/writeEpubContent");
var initPb = require("../lib/progressBar");
var op = require("../lib/outputEpub");
// var initPb = require("../lib/progressBar");
var gc = require("../lib/getCover");

var bid;
var bookName;
var author;
var cover;
var epubDetails;
var content;
var limit;
var dlDir;
var tmpDir;
var failed = [];

let mapLimit = (list, limit, asyncHandle) => {
  let recursion = arr => {
    return asyncHandle(arr.shift()).then(() => {
      if (arr.length !== 0) return recursion(arr);
    });
  };

  let listCopy = [].concat(list);
  let asyncList = [];
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);
};

async function tryAgain(catalog, opt) {
  await sleep(700);
  failed = [];
  for (let i = 0; i < catalog.length; i++) {
    let curItem = catalog[i];
    opt["uri"] = curItem;
    opt["timeout"] = opt.timeout + 1000;
    let tmpPath = path.join(
      tmpDir,
      curItem.substring(curItem.indexOf(bid + "/") + bid.length + 1)
    );
    await rp(opt)
      .then(res => {
        writeContent(tmpPath, res);
        bar.tick();
      })
      .catch(e => {
        failed.push(opt.uri);
      });
  }
  if (failed.length != 0) {
    tryAgain(failed, opt);
  } else {
    op(bookName, author, cover, catalogs, tmpDir, dlDir);
    console.log("download success!\n".green);
  }
}

function get(catalog, opt, config) {
  bar = initPb(catalog[1], catalog.length - 2);
  console.log("");
  bar.tick();
  if (bid == null) bid = catalog[0];
  if (bookName == null) bookName = catalog[1];
  if (author == null) author = catalog[2];
  if (cover == null) cover = catalog[3];
  if (dlDir == null) dlDir = config.dlDir;
  if (limit == null) limit = config.thread;
  if (tmpDir == null) tmpDir = path.join(config.tmpDir, bid);
  if (!fs.existsSync(dlDir)) fs.mkdirsSync(dlDir);
  if (!fs.existsSync(tmpDir)) fs.mkdirsSync(tmpDir);
  if (!catalog[0].includes("http")) catalog.splice(0, 4);
  opt["uri"] = cover;
  var writeStream = fs.createWriteStream(path.join(tmpDir, "cover.jpg"), {
    autoClose: true
  });
  rp(opt).pipe(writeStream);
  writeStream.on("finish", function() {
    bar.tick();
    mapLimit(catalog, limit, curItem => {
      let tmpPath = path.join(
        tmpDir,
        curItem.substring(curItem.indexOf(bid + "/") + bid.length + 1)
      );
      opt["uri"] = curItem;
      return rp(opt)
        .then(res => {
          writeContent(tmpPath, res);
          bar.tick();
        })
        .catch(e => {
          failed.push(curItem);
        });
    }).then(() => {
      if (failed.length != 0) {
        tryAgain(failed, opt);
      } else {
        op(bookName, author, cover, catalog, tmpDir, dlDir);
        console.log("download success!\n".green);
      }
    });
  });
}
module.exports = get;
