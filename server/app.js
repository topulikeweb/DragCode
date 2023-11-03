const express = require('express');
const router = require('./router/index');
const app = express();
// 允许跨域
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./config/config');
app.use(bodyParser.json());
app.use(cors());

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
/**
 * 解析token的中间件
 */
app.use((req, res, next) => {
  if (req.path !== '/login' || req.path !== '/register') {
    const token = req.headers.authorization; // 获取 Authorization 头的值
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // 令牌验证失败
          return res.status(403).json({ message: '令牌无效', err });
        }
        // 令牌验证成功，将用户信息添加到请求中，挂载到req的user上
        req.user = decoded;
        next();
      });
    } else {
      // 如果没有令牌，返回未授权
      return res.status(401).json({ message: '未提供令牌' });
    }
  }
});
app.use(express.json());
app.use('/api', router);
app.listen('3001', () => {
  console.log('成功开启：http://127.0.0.1:3001');
});
