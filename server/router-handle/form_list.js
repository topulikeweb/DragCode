const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'login',
});

exports.history_list = (req, res) => {
  const sql1 = `SELECT history_lists
                FROM form_history
                where userId = ?`;
  db.query(sql1, [req.user.user.userId], (err, results) => {
    if (err) {
      return res.cc('获取历史记录失败', 400);
    }
    console.log(results);
    return res.cc(results, 0);
  });
};
