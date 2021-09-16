-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2021-05-14 04:30:38
-- 服务器版本： 5.7.26
-- PHP 版本： 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `school`
--

-- --------------------------------------------------------

--
-- 表的结构 `achievement`
--

DROP TABLE IF EXISTS `achievement`;
CREATE TABLE IF NOT EXISTS `achievement` (
  `stucode` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `vue` varchar(100) NOT NULL,
  `node` varchar(100) NOT NULL,
  `marx` varchar(100) NOT NULL,
  `innovate` varchar(100) NOT NULL,
  `mysql` varchar(100) NOT NULL,
  `math` varchar(100) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`stucode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `achievement`
--

INSERT INTO `achievement` (`stucode`, `name`, `vue`, `node`, `marx`, `innovate`, `mysql`, `math`, `time`) VALUES
('1', '测试', '1', '99', '1', '1', '1', '1', '2021-03-29 22:12:41'),
('s1617439824558', '12', '', '100', '', '', '', '', '2021-04-03 16:50:24'),
('s1617439827390', '1', '', '12', '', '', '', '', '2021-04-03 16:50:27'),
('s1617439829582', '21', '', '', '', '', '', '', '2021-04-03 16:50:29'),
('s1617439831774', '12', '', '', '', '', '', '', '2021-04-03 16:50:31'),
('s1617439834766', '123', '', '', '', '', '', '', '2021-04-03 16:50:34'),
('s1617439837766', '1231', '', '', '', '', '', '', '2021-04-03 16:50:37'),
('s1617439840534', '12', '', '', '', '', '', '', '2021-04-03 16:50:40'),
('s1617439843174', '123213', '', '', '', '', '', '', '2021-04-03 16:50:43'),
('s1617439849150', '123啊', '', '', '', '', '', '', '2021-04-03 16:50:49'),
('s1617439851406', '2131', '', '', '', '', '', '', '2021-04-03 16:50:51'),
('s1617439853534', '321', '', '', '', '', '', '', '2021-04-03 16:50:53'),
('s1617439856366', '啊', '', '', '', '', '', '', '2021-04-03 16:50:56'),
('s1617439858454', '21321', '', '', '', '', '', '', '2021-04-03 16:50:58'),
('s1617440174382', '1212', '', '', '', '', '', '', '2021-04-03 16:56:14');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `password`, `time`) VALUES
('1', '1', '2021-03-21 16:06:50');

-- --------------------------------------------------------

--
-- 表的结构 `apply`
--

DROP TABLE IF EXISTS `apply`;
CREATE TABLE IF NOT EXISTS `apply` (
  `id` varchar(100) NOT NULL,
  `settime` varchar(100) NOT NULL,
  `mes` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `teacher` varchar(40) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `apply`
--

INSERT INTO `apply` (`id`, `settime`, `mes`, `state`, `teacher`, `time`) VALUES
('1618928901233', '1617206400000', '', '通过', '123456', '2021-04-20 22:28:21'),
('1618928953737', '1617379200000', '12', '待处理', '123456', '2021-04-20 22:29:13'),
('1618928967720', '1617292800000', '', '待处理', '123456', '2021-04-20 22:29:27'),
('1618930971847', '1619193600000', '', '通过', '123456', '2021-04-20 23:02:51');

-- --------------------------------------------------------

--
-- 表的结构 `isshow`
--

DROP TABLE IF EXISTS `isshow`;
CREATE TABLE IF NOT EXISTS `isshow` (
  `id` varchar(100) NOT NULL,
  `watch` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `isshow`
--

INSERT INTO `isshow` (`id`, `watch`) VALUES
('show', 'false');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` varchar(100) NOT NULL,
  `title` varchar(500) NOT NULL,
  `text` mediumtext NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`id`, `title`, `text`, `time`) VALUES
('1617074215693', '这是一条测试通告', '这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告这是一条测试通告', '2021-03-30 11:16:55');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sex` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `class` varchar(100) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `password`, `name`, `sex`, `tel`, `class`, `time`) VALUES
('1', '1', '测试', '男', '13333311111', '软件工程1班', '2021-03-29 22:12:41'),
('s1617439824558', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:24'),
('s1617439827390', '123456', '1', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:27'),
('s1617439829582', '123456', '21', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:29'),
('s1617439831774', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:31'),
('s1617439834766', '123456', '123', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:34'),
('s1617439837766', '123456', '1231', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:37'),
('s1617439840534', '123456', '12', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:40'),
('s1617439843174', '123456', '123213', '男', '13111111111', '软件工程2班', '2021-04-03 16:50:43'),
('s1617439849150', '123456', '123啊', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:49'),
('s1617439851406', '123456', '2131', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:51'),
('s1617439853534', '123456', '321', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:53'),
('s1617439856366', '123456', '啊', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:56'),
('s1617439858454', '123456', '21321', '男', '13111111111', '软件工程1班', '2021-04-03 16:50:58'),
('s1617440174382', '123456', '1212', '男', '15111111111', '软件工程1班', '2021-04-03 16:56:14');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sex` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`id`, `password`, `name`, `sex`, `tel`, `subject`, `time`) VALUES
('123456', '1', '教师1', '男', '13111111111', 'Node.js', '2021-03-23 13:46:44'),
('t1616478414455', '1', '教师2', '女', '13232424324', '马克思主义思想', '2021-03-23 13:46:54'),
('t1617074167708', '123456', '测试教师543454', '男', '15211111111', '创新与实践', '2021-03-30 11:16:07');

-- --------------------------------------------------------

--
-- 表的结构 `time`
--

DROP TABLE IF EXISTS `time`;
CREATE TABLE IF NOT EXISTS `time` (
  `id` varchar(100) NOT NULL,
  `start` varchar(500) NOT NULL,
  `end` mediumtext NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `time`
--

INSERT INTO `time` (`id`, `start`, `end`, `time`) VALUES
('settime', '1618243200000', '1619193600000', '2021-03-29 21:38:23');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
