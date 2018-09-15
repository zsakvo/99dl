var fs = require("fs-extra");
var op = require("../lib/outPut");
var path = require("path");
var rp = require("request-promise");
var writeContent = require("../lib/writeContent");
var initPb = require("../lib/progressBar");
require("colors");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

var bookName;
var catalogs;
var bar;
var bid;
var tmpDir;
var dlDir;
var limit;
var failed = [];

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
    op(bookName, catalogs, tmpDir, dlDir);
    console.log("download success!\n".green);
  }
}

function get(catalog, opt, config) {
  bar = initPb(catalog[1], catalog.length - 1);
  console.log("");
  bar.tick();
  failed = [];
  if (bookName == null) bookName = catalog[1];
  if (bid == null) bid = catalog[0];
  if (catalogs == null) catalogs = catalog;
  if (tmpDir == null) tmpDir = path.join(config.tmpDir, bid);
  if (dlDir == null) dlDir = config.dlDir;
  if (!fs.existsSync(tmpDir)) fs.mkdirsSync(tmpDir);
  if (!fs.existsSync(dlDir)) fs.mkdirsSync(dlDir);
  if (limit == null) limit = config.thread;
  if (!catalog[0].includes("http")) catalog.splice(0, 2);
  mapLimit(catalog, limit, curItem => {
    let tmpPath = path.join(
      tmpDir,
      curItem.substring(curItem.indexOf(bid + "/") + bid.length + 1)
    );
    opt["uri"] = curItem;
    opt["timeout"] = 700;
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
      op(bookName, catalog, tmpDir, dlDir);
      console.log("download success!\n".green);
    }
  });
}

module.exports = get;
