/*
 Navicat Premium Data Transfer

 Source Server         : mysql-local
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : 127.0.0.1:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 31/03/2021 14:20:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `sys`;
CREATE TABLE `sys` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sys_type` varchar(255) DEFAULT NULL,
  `sys_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='系统表';

DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统类型，默认为shop，以后新加系统以此字段区分',
  `menu_name` varchar(255) DEFAULT NULL COMMENT '菜单名，如 客户管理',
  `menu_type` varchar(255) DEFAULT NULL COMMENT '菜单类型：URL,BUTTON',
  `url` varchar(255) DEFAULT NULL COMMENT '菜单链接地址',
  `parent_id` int(11) DEFAULT NULL COMMENT '父模块ID',
  `business_code` varchar(64) DEFAULT NULL COMMENT '同菜单编码',
  `orders` int(4) DEFAULT NULL COMMENT '序号，排序用',
  `logo_tag` varchar(255) DEFAULT NULL COMMENT 'LOGO标识',
  `menu_group` varchar(255) DEFAULT NULL COMMENT '所属按钮组',
	`modify_time` datetime NOT NULL COMMENT '修改时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `level` int(4) DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',	
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_business_code` (`business_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='系统菜单表';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(40) DEFAULT NULL COMMENT '用户名，现统一为手机号',
  `job_no` varchar(50) DEFAULT NULL COMMENT '工号',
  `user_code` varchar(50) DEFAULT NULL COMMENT '身份证号',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `salt` varchar(255) DEFAULT NULL COMMENT '密码加密盐值',
  `realname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `sex` int(8) DEFAULT NULL COMMENT '性别',
  `age` int(8) DEFAULT NULL COMMENT '年龄',
  `permissions` varchar(1000) DEFAULT NULL COMMENT '保留字段，特殊权限列表，英文逗号分隔',
  `level` int(4) DEFAULT NULL COMMENT '保留字段，用户级别',
  `company_id` int(11) DEFAULT NULL COMMENT '分公司ID，分公司就是门店',
  `department_id` int(11) DEFAULT NULL COMMENT '所属部门ID,例如销售部，财务部',
  `group_id` int(11) DEFAULT NULL COMMENT '所属业务组ID 例如销售一组',
  `company_name` varchar(255) DEFAULT NULL COMMENT '所属分公司名称-门店名',
  `department_name` varchar(255) DEFAULT NULL COMMENT '所属部门名称',
  `group_name` varchar(255) DEFAULT NULL COMMENT '所属业务组名称',
  `addr_province` varchar(255) DEFAULT NULL,
  `addr_city` varchar(255) DEFAULT NULL,
  `addr_area` varchar(255) DEFAULT NULL,
  `addr_detail` varchar(255) DEFAULT NULL COMMENT '详情地址，带上省市区',
  `is_on_duty` int(11) NOT NULL DEFAULT '1' COMMENT '是否在岗(0-否;1-是)',
  `status` varchar(255) DEFAULT NULL COMMENT '当前状态：NORMAL,LOCKED,DEAD',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
	`modify_time` datetime NOT NULL COMMENT '修改时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '用户系统范围（app,pc）',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `uid_username` (`username`) USING BTREE,
  KEY `uid_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` datetime NOT NULL COMMENT '修改时间',
  `role_code` varchar(50) DEFAULT NULL COMMENT '角色编码',
  `status` int(8) DEFAULT NULL COMMENT '使用状态：1启用 0停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_user_id` (`user_id`) USING BTREE,
  KEY `id_role_id` (`role_id`) USING BTREE,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `menu_id` int(11) DEFAULT NULL COMMENT '菜单ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_role_id` (`role_id`) USING BTREE,
  KEY `id_menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=121536 DEFAULT CHARSET=utf8 COMMENT='角色菜单关联表';

DROP TABLE IF EXISTS `code_library`;
CREATE TABLE `code_library` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code_id` varchar(500) DEFAULT NULL COMMENT '数据字典所属类型下的Id',
  `code_name` varchar(150) DEFAULT NULL COMMENT '数据字典名称',
  `code_type` varchar(150) DEFAULT NULL COMMENT '数据字典所属类型',
  `sort_no` varchar(9) DEFAULT NULL COMMENT '数据字典排序(一般以1开始);也可作他用',
  `describe` varchar(4000) DEFAULT NULL COMMENT '数据字典说明',
  `is_inuse` tinyint(1) DEFAULT NULL COMMENT '是否启用(0-否;1-是)',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `id_code_id` (`code_id`) USING BTREE,
  KEY `id_code_type` (`code_type`) USING BTREE,
  KEY `id_is_inuse` (`is_inuse`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='数字字典配置表';

DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '机构名称',
  `type` varchar(255) DEFAULT NULL COMMENT '机构类型 company,department,group',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级机构id',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` datetime NOT NULL COMMENT '修改时间',
  `state` tinyint(1) DEFAULT '0' COMMENT '状态字段 0.未同步 1.同步成功',
  `short_name` varchar(50) DEFAULT NULL COMMENT '机构简称',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_parent_id` (`parent_id`) USING BTREE,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='机构表';

DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` bigint(64) NOT NULL COMMENT '雪花ID-UUID',
  `file_type` varchar(100) DEFAULT NULL COMMENT '图片类型',
  `file_size` bigint(30) DEFAULT NULL COMMENT '图片大小',
  `file_path` varchar(255) DEFAULT NULL COMMENT '图片url',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名',
  `original_name` varchar(255) DEFAULT NULL COMMENT '原文件名',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` int(11) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',

  `user_id` bigint(20) DEFAULT NULL COMMENT '上传用户id',
  `deleted_user_id` bigint(20) DEFAULT NULL COMMENT '删除人用户id',
  `sys_type` varchar(50) DEFAULT NULL COMMENT '系统标识',
  `client_serial_num` varchar(100) DEFAULT NULL COMMENT '设备号',		
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图片存储记录表';

DROP TABLE IF EXISTS `document_dir`;
CREATE TABLE `document_dir` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL COMMENT '目录code',
  `directory_path` varchar(900) DEFAULT NULL COMMENT '目录名称',
  `directory_full_name` varchar(255) DEFAULT NULL COMMENT '多媒体资料全称',
  `parent_dir_id` bigint(20) DEFAULT NULL COMMENT '上级目录id',
  `dir_code` varchar(300) DEFAULT NULL COMMENT '同目录编码',
  `dir_class` varchar(150) DEFAULT NULL COMMENT '目录分类（1：电子签约资料，2：书面签约资料，3：汽车消费分期资料，4：二手车评估报告，0：其他）',
  `doc_type` varchar(30) DEFAULT NULL COMMENT '目录存放的文件类型（1：图片，2：视频，3：pdf，4：word）',
  `max_file_limit` int(11) DEFAULT NULL COMMENT '最大文件数量限制',
  `max_size_per_file` int(4) DEFAULT NULL COMMENT '单个文件大小限制，单位M',
  `can_supply` tinyint(4) DEFAULT NULL COMMENT '是否可上传：1是；0否',
  `sort` int(10) DEFAULT NULL COMMENT '序号，排序用',
  `is_inuse` tinyint(1) DEFAULT NULL COMMENT '是否可用:1是，0否',
  `chk_disabled` tinyint(1) DEFAULT NULL COMMENT '是否可选中（1:是，0:否）',
	`level` int(4) DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_parent_dir_id` (`parent_dir_id`) USING BTREE,
  KEY `id_dir_code` (`dir_code`) USING BTREE,
  KEY `id_code` (`code`) USING BTREE,
  KEY `id_is_inuse` (`is_inuse`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='多媒体目录表';

DROP TABLE IF EXISTS `document_file`;
CREATE TABLE `document_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dir_id` bigint(20) NOT NULL COMMENT '目录id',
	`file_id` bigint(20) NOT NULL COMMENT '文件id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `id_dir_id` (`dir_id`) USING BTREE,
  KEY `id_file_id` (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='目录图片关联表'


DROP TABLE IF EXISTS `goods_info`;
CREATE TABLE `goods_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `project_no` varchar(32) NOT NULL COMMENT '商品编号',
  `credit_id` bigint(20) NOT NULL COMMENT '征信Id',
  `customer_id` bigint(20) DEFAULT NULL COMMENT '客户Id',
  `customer_name` varchar(32) NOT NULL COMMENT '客户名称',
  `car_dealer_social_code` bigint(20) DEFAULT NULL COMMENT '车商社会信用统一代码',
  `auth_type` varchar(4) DEFAULT NULL COMMENT '鉴权类型(见数据字典)',
  `cert_type` varchar(4) NOT NULL COMMENT '证件类型(身份证01,其他见数据字典)',
  `cert_no` varchar(32) NOT NULL COMMENT '证件号码',
  `biz_type` varchar(4) NOT NULL COMMENT '业务类型(汽车消费分期01 其他见数据字典)',
  `biz_product_type` varchar(16) DEFAULT NULL COMMENT '业务品种类型(如0101:新车;0102:二手车;其余见数据字典))',
  `sign_type` int(11) NOT NULL COMMENT '签约类型(1:电子签约;2:纸质)',
  `agency_org_id` bigint(20) NOT NULL COMMENT '合作单位Id',
  `agency_org_name` varchar(32) NOT NULL COMMENT '合作单位名称',
  `branch_org_id` bigint(20) DEFAULT NULL COMMENT '分行级机构Id',
  `branch_org_name` varchar(32) DEFAULT NULL COMMENT '分行级机构名称',
  `sub_org_id` bigint(20) DEFAULT NULL COMMENT '支行级机构Id',
  `sub_org_name` varchar(32) DEFAULT NULL COMMENT '支行级机构名称',
  `apply_time` datetime NOT NULL COMMENT '进件时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_project_no` (`project_no`) USING BTREE,
  KEY `idx_credit_id` (`credit_id`) USING BTREE,
  KEY `idx_cert_no` (`cert_no`) USING BTREE,
  KEY `idx_cccb` (`customer_name`,`cert_type`,`cert_no`,`biz_type`) USING BTREE COMMENT '证件类型、证件号码、姓名、业务类型联合索引',
  KEY `idx_sub_org_id` (`sub_org_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品信息表';
