const axios = require("axios");
const cheerio = require("cheerio");
const inquirer = require("inquirer");
const getCatalog = require("../dl/getCatalog");
const getTxt = require("../dl/getTxt");
var dl = require("..");

var search = async function (str, page = 1, opt) {
  let config = dl.getConfig();
  let books = [];
  let choices = [];
  let url = encodeURI(
    "https://www.99csw.com/book/search.php?q=" + str + "&page=" + page
  );
  let res = await axios.get(url);
  let $ = cheerio.load(res.data);
  let resBox = $("#right > ul");
  resBox
    .find("li")
    .toArray()
    .map((el) => {
      let $ = cheerio.load(el);
      books.push({
        name: $("h2").text() + " —— " + $("h4 > a").first().text(),
        value: $("h2 > a")
          .attr("href")
          .replace("/book/", "")
          .replace("/index.htm", ""),
      });
    });
  if (page > 1) {
    choices = [
      {
        name: "上一页",
        value: "before",
      },
      new inquirer.Separator(),
    ];
  }
  choices.push(...books);
  if (books.length == 15) {
    choices.push(new inquirer.Separator(), {
      name: "下一页",
      value: "next",
    });
  }
  console.clear();
  inquirer
    .prompt({
      loop: false,
      type: "list",
      name: "value",
      message: `选择要下载的书籍：`,
      pageSize: 8,
      choices: choices,
    })
    .then(async (answers) => {
      if (answers.value === "next") {
        page++;
        search(str, page, opt);
      } else if (answers.value == "before") {
        page--;
        search(str, page, opt);
      } else {
        let bid = answers.value;
        let catalog = await getCatalog(bid, opt);
        if (catalog == null) {
          console.log("\nDownload failed, because the catalog is empty!\n".red);
          process.exit();
        } else {
          getTxt(catalog, opt, config.download);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = search;
