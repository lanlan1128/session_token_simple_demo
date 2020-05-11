## session_token_simple_demo

使用 express 实现 session 和 token 两种登录方式，并且比较两种方式的安全性

## 环境

- nodejs

## 启动

### 启动使用 session 登录的服务

进入项目根目录，打开命令行窗口，执行如下命令

```bash
$ npm i
$ node app-session.js
```

浏览器访问 http://127.0.0.1:3000/login，点击页面上的转账按钮，因为没有登录，则会提示“please login in”，输入用户名和密码（只要不为空即可）。登录成功，跳转到主页，点击转账按钮，则会提示“transfer success”。

#### 模拟 csrf 攻击

进入项目根目录的 hack-server 目录，打开命令行窗口，执行如下命令

```bash
$ npm i
$ node app.js
```

浏览器访问 http://127.0.0.1:8000/login，点击页面上的转账按钮，则会提示“transfer success”。此步骤实现了 csrf 攻击

### 启动使用 token 登录的服务

进入项目根目录，打开命令行窗口，执行如下命令

```bash
$ npm i
$ node app-token.js
```

浏览器访问 http://127.0.0.1:3000/login，点击页面上的转账按钮，因为没有登录，则会提示“jwt must be provided”，输入用户名和密码（只要不为空即可）。登录成功，跳转到主页，点击转账按钮，则会提示“transfer success”。

#### 模拟 csrf 攻击

进入项目根目录的 hack-server 目录，打开命令行窗口，执行如下命令

```bash
$ npm i
$ node app.js
```

浏览器访问 http://127.0.0.1:8000/login，点击页面上的转账按钮，则会提示“jwt must be provided”。此步骤说明 csrf 攻击失败
