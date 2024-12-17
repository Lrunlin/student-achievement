const express = require("express");
const router = express.Router();
const db = require("../../mysql");

// 根据反馈 ID 修改教师反馈内容的路由
router.put("/feedback/:id", async (req, res) => {
  const feedbackId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: "教师反馈内容不能为空" });
  }

  try {
    const sql = "UPDATE feedback SET teacher_content = ? WHERE id = ?";

    let [result] = await db.query(sql, [content, feedbackId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "未找到对应的反馈记录" });
    }
    res.json({ success: true, message: "教师反馈内容已更新" });
  } catch (error) {
    console.error("更新教师反馈内容时出错:", error);
    return res.status(500).json({ success: false, message: "内部服务器错误" });
  }

});

module.exports = router;
