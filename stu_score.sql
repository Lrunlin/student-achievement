/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027 (8.0.27)
 Source Host           : localhost:3306
 Source Schema         : stu_score

 Target Server Type    : MySQL
 Target Server Version : 80027 (8.0.27)
 File Encoding         : 65001

 Date: 30/12/2024 23:20:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` bigint NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '111111');

-- ----------------------------
-- Table structure for class_list
-- ----------------------------
DROP TABLE IF EXISTS `class_list`;
CREATE TABLE `class_list`  (
  `id` bigint NOT NULL,
  `major_id` bigint NOT NULL COMMENT '所属专业',
  `index` int NOT NULL COMMENT '第几班',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '专业下的班级' ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of class_list
-- ----------------------------
INSERT INTO `class_list` VALUES (219911921760, 195478482272, 1);
INSERT INTO `class_list` VALUES (219912003163, 195478482272, 2);
INSERT INTO `class_list` VALUES (219912086563, 195478482272, 3);
INSERT INTO `class_list` VALUES (219912170961, 195478482272, 4);
INSERT INTO `class_list` VALUES (219912255663, 195478482272, 5);
INSERT INTO `class_list` VALUES (219912408160, 195478482272, 6);
INSERT INTO `class_list` VALUES (219912501961, 195478482272, 7);

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college`  (
  `id` bigint NOT NULL COMMENT '学院ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学院名称',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES (193119321961, '计算机与软件学院', '2024-12-23 16:26:33');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` bigint NOT NULL COMMENT 'ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程名称',
  `credit` int NOT NULL COMMENT '学分',
  `total_score` int NOT NULL COMMENT '总分多少',
  `major` bigint NOT NULL COMMENT '所属专业',
  `semester` int NOT NULL COMMENT '第几学期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (218407318663, '数据结构', 2, 100, 195478482272, 2);

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major`  (
  `id` bigint NOT NULL COMMENT '专业ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专业名称',
  `college_id` bigint NOT NULL COMMENT '所属学院ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES (195478482272, '计算机科学与技术', 193119321961, '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` bigint NOT NULL COMMENT 'ID',
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `major_id` json NOT NULL COMMENT '发给那些学院',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '通知内容',
  `isTop` tinyint NULL DEFAULT NULL COMMENT '是否置顶',
  `target` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学生还是教师还是all',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (256037719661, '计算机毕设代写', '[]', '<p>写毕业设计、论文、课设或者其他项目</p><p>Vue.js、Node.js、Python、Java、小程序均可</p><p>同时提供详解、PPT的服务</p><p>联系方式:</p><p><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: 24px;\">QQ:1974109227 </span></p><p><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: 24px;\">微信:webzhizuo</span></p>', 1, 'teacher', '2024-12-30 23:12:57');
INSERT INTO `notice` VALUES (256043054492, '计算机毕设代写', '[]', '<p style=\"text-align: left;\">写毕业设计、论文、课设或者其他项目</p><p style=\"text-align: left;\">Vue.js、Node.js、Python、Java、小程序均可</p><p style=\"text-align: left;\">同时提供详解、PPT的服务</p><p style=\"text-align: left;\">联系方式:</p><p style=\"text-align: left;\"><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: 24px;\">QQ:1974109227</span></p><p style=\"text-align: left;\"><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: 24px;\">微信:webzhizuo</span></p>', 1, '', '2024-12-30 23:13:50');

-- ----------------------------
-- Table structure for notice_history
-- ----------------------------
DROP TABLE IF EXISTS `notice_history`;
CREATE TABLE `notice_history`  (
  `id` bigint NOT NULL,
  `notice_id` bigint NOT NULL COMMENT '通知ID',
  `user_id` bigint NOT NULL COMMENT '店铺ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of notice_history
-- ----------------------------

-- ----------------------------
-- Table structure for options
-- ----------------------------
DROP TABLE IF EXISTS `options`;
CREATE TABLE `options`  (
  `id` bigint NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置key',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '配置value',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of options
-- ----------------------------
INSERT INTO `options` VALUES (1, 'semester', '2');
INSERT INTO `options` VALUES (2, '毕设、项目、论文', '微信:webzhizuo,QQ:1974109227');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `id` bigint NOT NULL COMMENT '成绩ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `score` int NOT NULL COMMENT '分数',
  `student_id` bigint NOT NULL COMMENT '学生ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 218407318663, 59, 2, '2024-12-29 14:01:07');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` bigint NOT NULL COMMENT '学号',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `age` int NOT NULL COMMENT '年龄',
  `sex` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '男' COMMENT '性别',
  `major_id` bigint NOT NULL COMMENT '专业ID',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `class_id` bigint NOT NULL COMMENT '班级ID',
  `create_time` datetime NOT NULL COMMENT '入学时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (2, 'test', 20, '女', 195478482272, '111111', 219911921760, '2024-12-29 17:53:23');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` bigint NOT NULL COMMENT '教师ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `age` int NOT NULL COMMENT '年龄',
  `sex` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '男' COMMENT '性别',
  `college_id` bigint NOT NULL COMMENT '所属学院ID',
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, '王老师', 20, '男', 193119321961, '111111', '2024-12-29 14:13:42');

-- ----------------------------
-- Table structure for teacher_course
-- ----------------------------
DROP TABLE IF EXISTS `teacher_course`;
CREATE TABLE `teacher_course`  (
  `id` bigint NOT NULL,
  `teacher_id` bigint NOT NULL COMMENT '教师ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `class_id` json NULL COMMENT '班级ID数组',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '教师所教授的课程' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_course
-- ----------------------------
INSERT INTO `teacher_course` VALUES (0, 1, 218407318663, '[219911921760, 219912501961, 219912003163, 219912086563, 219912408160, 219912255663, 219912170961]');

SET FOREIGN_KEY_CHECKS = 1;
