const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { secretKey } = require('../config/config');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'login',
});

exports.login = (req, res) => {
  const { username, password } = req.body;
  // 创建sql语句
  const sql = `SELECT *
               FROM logininfo
               WHERE username = ?
                 AND password = ?`;
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('登录时出错:', err);
      return res.status(500).json({ message: '登录失败' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: '用户名或密码不正确' });
    }

    const user = results[0];
    // 生成 JWT
    const token = jwt.sign({ user }, secretKey, { expiresIn: '2h' });
    res.status(200).json({ token, message: '登录成功' });
  });
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  const sql1 = `SELECT *
                FROM logininfo
                WHERE username = ?`;

  db.query(sql1, [username], (err, results) => {
    if (results.length > 0) {
      return res.cc('用户名被占用，注册失败', 1);
    }
    if (!password || !username) {
      return res.cc('用户名或密码不能为空', 1);
    }
    if (err) {
      return res.cc('注册失败', 1);
    }

    const sql2 = `INSERT INTO logininfo
                  SET ?`;

    db.query(
      sql2,
      {
        password: password,
        username: username,
      },
      (err, result) => {
        if (result.affectedRows !== 1) {
          return res.cc('注册失败', 1);
        }
        if (err) {
          return res.cc(err, 1);
        }
        return res.cc('注册成功!', 0);
      },
    );
  });
};
