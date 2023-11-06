const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'login',
});

exports.history_list = (req, res) => {
  const sql1 = `SELECT history_lists, search_time
                FROM form_history
                where userId = ?`;
  // token解析出来后数据挂载到req.user.user.userId
  db.query(sql1, [req.user.user.userId], (err, results) => {
    if (err) {
      return res.cc('获取历史记录失败', 0);
    }
    // 格式化时间信息
    const originalDate = new Date(results[0].search_time);

    const year = originalDate.getUTCFullYear();
    const month = originalDate.getUTCMonth() + 1; // 月份从0开始，所以要加1
    const day = originalDate.getUTCDate();
    const formattedDateStr = `${year.toString()}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    results[0].search_time = formattedDateStr;
    return res.cc(results, 0);
  });
};

exports.updateHistory_list = (req, res) => {
  let { elementList, desc } = req.body;
  const sql1 = `SELECT history_lists
                FROM form_history
                WHERE userId = ?`;
  db.query(sql1, [req.user.user.userId], (err, results) => {
    if (err) {
      return res.cc('创建失败', 0);
    }

    // 默认为空数组
    let existingList = [];
    if (desc === '') {
      desc = '快速创建的表单';
    }
    if (results[0].history_lists) {
      try {
        existingList = JSON.parse(results[0].history_lists); // 解析已有的列表
      } catch (error) {
        // 处理 JSON 解析错误，此时 existingList 仍然为空
        console.error('解析历史列表时出错:', error);
      }
    }
    // 判断有无数据传入
    if (elementList) {
      // 获取当前时间
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并且确保是两位数
      const day = currentDate.getDate().toString().padStart(2, '0'); // 日期需要确保是两位数

      const formattedDate = `${year}-${month}-${day}`;
      // 创建一个对象，包含创建表单的时间，数据，描述等
      const obj = {};
      obj['elementList'] = elementList;
      obj['desc'] = desc;
      obj['createTime'] = formattedDate;
      existingList.push(obj); // 将新元素添加到列表
      // 更新对应userId的history_lists的数据
      const sql2 = `UPDATE form_history
                    SET history_lists = ?
                    WHERE userId = ?`;
      db.query(sql2, [JSON.stringify(existingList), req.user.user.userId], (err, results) => {
        if (err) {
          return res.cc('添加记录失败', 0);
        }
        return res.cc('更新成功', 1);
      });
    } else {
      return res.cc('没有数据传入', 0);
    }
  });
};

exports.clearAllHistoryList = (req, res) => {
  const sql = `UPDATE form_history
               SET history_lists = NULL
               WHERE userId = ?;
  `;
  db.query(sql, [req.user.user.userId], (err, result) => {
    if (err) {
      return res.cc('清除失败' + err, 0);
    }
    res.cc('清除成功', 1);
  });
};
