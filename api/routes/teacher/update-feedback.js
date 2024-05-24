const express = require("express");
const router = express.Router();
const db = require("../../mysql");

// 根据反馈 ID 修改教师反馈内容的路由
router.put("/feedback/:id", (req, res) => {
  const feedbackId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: "教师反馈内容不能为空" });
  }

  const sql = "UPDATE feedback SET teacher_content = ? WHERE id = ?";

  // 执行 SQL 查询
  db.query(sql, [content, feedbackId], function (err, result) {
    if (err) {
      console.error("更新教师反馈内容时出错:", err);
      return res.status(500).json({ success: false, message: "内部服务器错误" });
    }

    // 检查是否成功更新
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "未找到对应的反馈记录" });
    }

    res.json({ success: true, message: "教师反馈内容已更新" });
  });
});

module.exports = router;
