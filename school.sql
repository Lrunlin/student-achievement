/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027 (8.0.27)
 Source Host           : localhost:3306
 Source Schema         : school

 Target Server Type    : MySQL
 Target Server Version : 80027 (8.0.27)
 File Encoding         : 65001

 Date: 17/05/2024 14:25:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for achievement
-- ----------------------------
DROP TABLE IF EXISTS `achievement`;
CREATE TABLE `achievement`  (
  `stucode` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `vue` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `node` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `marx` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `innovate` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mysql` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `math` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`stucode`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of achievement
-- ----------------------------
INSERT INTO `achievement` VALUES ('1', '测试', '1', '9', '1', '1', '1', '1', '2021-03-29 22:12:41');
INSERT INTO `achievement` VALUES ('s02b51a99867c4bdaa87bd5e1a1e1f12a', '呜呜呜', '', '', '', '', '', '', '2023-06-06 14:08:49');
INSERT INTO `achievement` VALUES ('s1617439829582', '21', '', '', '', '', '', '', '2021-04-03 16:50:29');
INSERT INTO `achievement` VALUES ('s1617440174382', '1212', '', '', '', '', '', '', '2021-04-03 16:56:14');

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '1', '2021-03-21 16:06:50');
INSERT INTO `admin` VALUES ('11', '11', NULL);
INSERT INTO `admin` VALUES ('2', '2', NULL);

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `settime` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mes` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `state` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES ('1618928901233', '1617206400000', '', '通过', '123456', '2021-04-20 22:28:21');
INSERT INTO `apply` VALUES ('1618928953737', '1617379200000', '12', '待处理', '123456', '2021-04-20 22:29:13');
INSERT INTO `apply` VALUES ('1618928967720', '1617292800000', '', '待处理', '123456', '2021-04-20 22:29:27');
INSERT INTO `apply` VALUES ('1618930971847', '1619193600000', '', '通过', '123456', '2021-04-20 23:02:51');

-- ----------------------------
-- Table structure for isshow
-- ----------------------------
DROP TABLE IF EXISTS `isshow`;
CREATE TABLE `isshow`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `watch` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of isshow
-- ----------------------------
INSERT INTO `isshow` VALUES ('show', 'true');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `text` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1617074215693', '这是一条测试通告', '这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告', '2021-03-30 11:16:55');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '1', '测试', '男', '13333311111', '软件工程1班', '2021-03-29 22:12:41');
INSERT INTO `student` VALUES ('s02b51a99867c4bdaa87bd5e1a1e1f12a', '123456', '呜呜呜', '男', '13122212311', '软件工程1班', '2023-06-06 14:08:49');
INSERT INTO `student` VALUES ('s1617439824558', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:24');
INSERT INTO `student` VALUES ('s1617439827390', '123456', '1', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:27');
INSERT INTO `student` VALUES ('s1617439829582', '123456', '21', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:29');
INSERT INTO `student` VALUES ('s1617439831774', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:31');
INSERT INTO `student` VALUES ('s1617439834766', '123456', '123', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:34');
INSERT INTO `student` VALUES ('s1617439837766', '123456', '1231', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:37');
INSERT INTO `student` VALUES ('s1617439840534', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:40');
INSERT INTO `student` VALUES ('s1617439843174', '123456', '123213', '男', '13111111111', '软件工程2班', '2021-04-03 16:50:43');
INSERT INTO `student` VALUES ('s1617439849150', '123456', '123啊', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:49');
INSERT INTO `student` VALUES ('s1617439851406', '123456', '2131', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:51');
INSERT INTO `student` VALUES ('s1617439853534', '123456', '321', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:53');
INSERT INTO `student` VALUES ('s1617439856366', '123456', '啊', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:56');
INSERT INTO `student` VALUES ('s1617439858454', '123456', '21321', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:58');
INSERT INTO `student` VALUES ('s1617440174382', '123456', '1212', '男', '15111111111', '软件工程1班', '2021-04-03 16:56:14');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subject` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('123456', '1', '教师1', '男', '13111111111', 'Node.js', '2021-03-23 13:46:44');
INSERT INTO `teacher` VALUES ('t1616478414455', '1', '教师2', '女', '13232424324', '马克思主义思想', '2021-03-23 13:46:54');
INSERT INTO `teacher` VALUES ('t1617074167708', '123456', '测试教师543454', '男', '15211111111', '创新与实践', '2021-03-30 11:16:07');
INSERT INTO `teacher` VALUES ('t1680610563295', '123456', '我我', '男', '13111111111', '创新与实践', '2023-04-04 20:16:03');
INSERT INTO `teacher` VALUES ('t1680610701719', '123456', '1撒的', '男', '14111111111', 'Node.js', '2023-04-04 20:18:21');
INSERT INTO `teacher` VALUES ('ta1a5ec88db164983892fd5a67dc343cf', '123456', '123', '男', '13111111111', '创新与实践', '2023-04-01 21:59:42');

-- ----------------------------
-- Table structure for time
-- ----------------------------
DROP TABLE IF EXISTS `time`;
CREATE TABLE `time`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `end` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of time
-- ----------------------------
INSERT INTO `time` VALUES ('settime', '1618243200000', '1619193600000', '2021-03-29 21:38:23');

SET FOREIGN_KEY_CHECKS = 1;
