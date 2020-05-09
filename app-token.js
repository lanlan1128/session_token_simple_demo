/**
 * Created by tjm on 9/7/2017.
 */

var express = require("express");
var session = require("express-session");
var bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

var app = express();

// 下面三行设置渲染的引擎模板
app.set("views", __dirname + "/token-page"); //设置模板的目录
app.set("view engine", "html"); // 设置解析模板文件类型：这里为html文件
app.engine("html", require("ejs").__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
  next();
});

const firewall = (req, res, next) => {
  const authorization = req.headers.authorization;
  const pToken = req.query && req.query.csrftoken;

  token = authorization ? authorization : pToken;

  try {
    var decoded = jwt.verify(token, "secret");
    req.decoded = decoded;
    next();
  } catch (err) {
    res.json(err);
  }
};

// 获取登录页面
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/token-page/login.html");
});

// 主页
app.get("/", firewall, (req, res) => {
  res.render("home", { username: req.decoded.username });
});

// 用户登录
app.post("/login", function (req, res) {
  if (req.body.username && req.body.pwd) {
    let rule = {
      name: req.body.username,
    };
    var token = jwt.sign(rule, "secret", { expiresIn: 60 * 60 });

    res.json({
      token: token,
      retmsg: "登录成功",
    });
  } else {
    res.json({ retflag: false, retmsg: "请输入用户名和密码" });
  }
});

app.post("/api/transfer", firewall, (req, res) => {
  res.send("transfer success");
});

// 退出
app.get("/logout", function (req, res) {
  // token失效
  res.redirect("login");
});

app.listen(3000, function () {
  console.log("http://127.0.0.1:3000");
});
