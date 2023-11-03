const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'login',
});

exports.history_list = (req, res) => {
  const sql1 = `SELECT history_id
                FROM form_history
                where userId = ?`;
  db.query(sql1, (err, results) => {
    if (err) {
      return res.cc('获取历史记录失败', 400);
    }
    const searchHistory = results.map((row) => row.history_lists);

    return res.cc(searchHistory, 0);
  });
};
