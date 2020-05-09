/**
 * Created by tjm on 9/7/2017.
 */

var express = require("express");
var session = require("express-session");
var bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

var app = express();

// 下面三行设置渲染的引擎模板
app.set("views", __dirname + "/session-page"); //设置模板的目录
app.set("view engine", "html"); // 设置解析模板文件类型：这里为html文件
app.engine("html", require("ejs").__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

const firewall = (req, res, next) => {
  const authorized = req.session.username;
  if (!authorized) return res.json("please login in");
  next();
};

// 使用 session 中间件
app.use(
  session({
    secret: "secret", // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
  })
);

// 获取登录页面
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/session-page/login.html");
});

// 获取主页
app.get(
  "/",
  firewall, // firewall middleware that handles uses req.session
  (req, res) => {
    res.render("home", { username: req.session.username });
  }
);

// 用户登录
app.post("/login", function (req, res) {
  if (req.body.username && req.body.pwd) {
    req.session.username = req.body.username; // 登录成功，设置 session
    res.json({
      retflag: true,
      retmsg: "登录成功",
    });
  } else {
    res.json({ retflag: false, retmsg: "请输入用户名和密码" });
  }
});

// 转账
app.post(
  "/api/transfer",
  firewall, // firewall middleware that handles uses req.session
  (req, res) => {
    res.send("transfer success");
  }
);

// 退出
app.get("/logout", function (req, res) {
  req.session.username = null; // 删除session
  res.redirect("/login");
});

app.listen(3000, function () {
  console.log("http://127.0.0.1:3000");
});
