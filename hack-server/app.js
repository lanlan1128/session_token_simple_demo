/**
 * Created by tjm on 9/7/2017.
 */

var express = require("express");
var app = express();

// 下面三行设置渲染的引擎模板
app.set("views", __dirname); //设置模板的目录
app.set("view engine", "html"); // 设置解析模板文件类型：这里为html文件
app.engine("html", require("ejs").__express); // 使用ejs引擎解析html文件中ejs语法

// 主页
app.get("/", function (req, res) {
  res.render("home");
});

app.listen(8000, function () {
  console.log("http://127.0.0.1:8000");
});
