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
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `level` int(4) DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',	
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_business_code` (`business_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='系统菜单表';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(40) NOT NULL COMMENT '用户名，现统一为手机号',
  `job_no` varchar(50) DEFAULT NULL COMMENT '工号',
  `user_code` varchar(50) DEFAULT NULL COMMENT '身份证号',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `salt` varchar(255) NOT NULL COMMENT '密码加密盐值',
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
  `is_on_duty` int(11)  NOT NULL DEFAULT '1' COMMENT '是否在岗(0-否;1-是)',
  `status` varchar(255) DEFAULT NULL COMMENT '当前状态：NORMAL,LOCKED,DEAD',
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
	`modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '用户系统范围（app,pc）',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `uid_username` (`username`) USING BTREE,
  KEY `uid_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) NOT NULL COMMENT '角色名称',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `role_code` varchar(50) NOT NULL COMMENT '角色编码',
  `status` int(8) NOT NULL COMMENT '使用状态：1启用 0停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_user_id` (`user_id`) USING BTREE,
  KEY `id_role_id` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `menu_id` int(11) NOT NULL COMMENT '菜单ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_role_id` (`role_id`) USING BTREE,
  KEY `id_menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=121536 DEFAULT CHARSET=utf8 COMMENT='角色菜单关联表';

DROP TABLE IF EXISTS `code_library`;
CREATE TABLE `code_library` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code_id` varchar(500) NOT NULL COMMENT '数据字典所属类型下的Id',
  `code_name` varchar(150) NOT NULL COMMENT '数据字典名称',
  `code_type` varchar(150) NOT NULL COMMENT '数据字典所属类型',
  `sort_no` varchar(9) DEFAULT NULL COMMENT '数据字典排序(一般以1开始);也可作他用',
  `describe` varchar(4000) DEFAULT NULL COMMENT '数据字典说明',
  `is_inuse` tinyint(1) NOT NULL COMMENT '是否启用(0-否;1-是)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_code_id` (`code_id`) USING BTREE,
  KEY `id_code_type` (`code_type`) USING BTREE,
  KEY `id_is_inuse` (`is_inuse`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='数字字典配置表';

DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) NOT NULL COMMENT '机构名称',
  `type` varchar(255) NOT NULL COMMENT '机构类型 company,department,group',
  `parent_id` int(11) NOT NULL COMMENT '上级机构id',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `state` tinyint(1) DEFAULT '0' COMMENT '状态字段 0.未同步 1.同步成功',
  `short_name` varchar(50) DEFAULT NULL COMMENT '机构简称',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_parent_id` (`parent_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='机构表';

DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` bigint(64) NOT NULL COMMENT '雪花ID-UUID',
  `file_type` varchar(100) NOT NULL COMMENT '图片类型',
  `file_size` bigint(30) DEFAULT NULL COMMENT '图片大小',
  `file_path` varchar(255) NOT NULL COMMENT '图片url',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名',
  `original_name` varchar(255) DEFAULT NULL COMMENT '原文件名',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` int(11) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',

  `user_id` bigint(20) DEFAULT NULL COMMENT '上传用户id',
  `deleted_user_id` bigint(20) DEFAULT NULL COMMENT '删除人用户id',
  `sys_type` varchar(50) DEFAULT NULL COMMENT '系统标识',
  `client_serial_num` varchar(100) DEFAULT NULL COMMENT '设备号',		
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片存储记录表';

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `goods_code` varchar(32) NOT NULL COMMENT '商品编号',
  `goods_price` decimal(24,2) NOT NULL COMMENT '零售价格',
	`goods_size` varchar(32) COMMENT '商品尺寸',
	`goods_brand` varchar(32) NOT NULL COMMENT '商品品牌',
	`goods_color` varchar(32) NOT NULL COMMENT '商品颜色',
	`goods_cost_price` decimal(24,2) NOT NULL COMMENT '进货价',
	`goods_trade_price` decimal(24,2) NOT NULL COMMENT '批发价',
	`goods_note` varchar(32) NOT NULL COMMENT '描述',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_goods_code` (`goods_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品信息表';

DROP TABLE IF EXISTS `goods_file`;
CREATE TABLE `goods_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `goods_id` bigint(20) NOT NULL COMMENT '商品id',
	`file_id` bigint(20) NOT NULL COMMENT '文件id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_goods_id` (`goods_id`) USING BTREE,
  KEY `id_file_id` (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='商品图片关联表';

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '客户Id',
  `customer_no` varchar(32) DEFAULT NULL COMMENT '客户编号',
  `customer_name` varchar(32) NOT NULL COMMENT '客户姓名',
  `customer_en_name` varchar(64) DEFAULT NULL COMMENT '英文名',
  `cert_type` varchar(4) DEFAULT NULL COMMENT '证件类型(身份证01,其他见数据字典)',
  `cert_no` varchar(25) DEFAULT NULL COMMENT '证件号码',
  `cert_valid_start_date` varchar(16) DEFAULT NULL COMMENT '证件有效期起始日',
  `cert_valid_end_date` varchar(16) DEFAULT NULL COMMENT '证件有效期截止日',
  `licence_issuing_authority` varchar(32) DEFAULT NULL COMMENT '发证机关',
  `mobile_phone` varchar(16) DEFAULT NULL COMMENT '手机号',
  `birthday` varchar(16) DEFAULT NULL COMMENT '出生日期(yyyy-MM-dd)',
  `gender` int(11) DEFAULT NULL COMMENT '性别(1:男;2:女)',
  `marital_status` int(11) DEFAULT NULL COMMENT '婚姻状态1:未婚(无配偶)2:已婚(有配偶)3:分居;4:离异5:丧偶6:其他',
  `spouse_name` varchar(32) DEFAULT NULL COMMENT '配偶姓名',
  `spouse_en_name` varchar(64) DEFAULT NULL COMMENT '配偶英文名',
  `spouse_cert_type` varchar(4) DEFAULT NULL COMMENT '配偶证件类型(身份证01,其他见数据字典)',
  `spouse_cert_no` varchar(25) DEFAULT NULL COMMENT '配偶证件号码',
  `spouse_cert_valid_start_date` varchar(16) DEFAULT NULL COMMENT '配偶证件有效期起始日',
  `spouse_cert_valid_end_date` varchar(16) DEFAULT NULL COMMENT '配偶证件有效期截止日',
  `spouse_licence_issuing_authority` varchar(32) DEFAULT NULL COMMENT '配偶发证机关',
  `spouse_mobile_phone` varchar(16) DEFAULT NULL COMMENT '配偶手机号',
  `spouse_birthday` varchar(16) DEFAULT NULL COMMENT '配偶出生日期',
  `spouse_gender` int(11) DEFAULT NULL COMMENT '配偶性别(1:男;2:女)',
  `native_place` varchar(128) DEFAULT NULL COMMENT '籍贯',
  `domicile_type` int(10) DEFAULT NULL COMMENT '户籍性质1:农业,2,非农',
  `education` int(10) DEFAULT NULL COMMENT '学历(1:初中及以下;2:高中;3:大专;4:本科;5:硕士及以上)',
  `degree` int(10) DEFAULT NULL COMMENT '学位(0:无;1:学士;2:硕士;3:博士)',
  `housing_status` int(10) DEFAULT NULL COMMENT '住房情况(1:自有住房;2:贷款购房;3:租房;4:其他)',
  `driver_licence` int(1) DEFAULT NULL COMMENT '驾照情况(0:无;1:有)',
  `personal_monthly_income` decimal(12,4) DEFAULT NULL COMMENT '个人月收入(元)',
  `household_monthly_income` decimal(12,4) DEFAULT NULL COMMENT '家庭月收入(元)',
  `personal_yearly_income` decimal(12,4) DEFAULT NULL COMMENT '个人年收入(元)',
  `household_yearly_income` decimal(12,4) DEFAULT NULL COMMENT '家庭年收入(元)',
  `personal_asset_sum` decimal(12,4) DEFAULT NULL COMMENT '个人总资产(元)',
  `personal_debt_balance` decimal(12,4) DEFAULT NULL COMMENT '个人总负债(元)',
  `housing_provident_fund_monthly_payment` decimal(12,4) DEFAULT NULL COMMENT '住房公积金月缴总额(元)',
  `housing_provident_fund_year` int(11) DEFAULT NULL COMMENT '住房公积金缴纳年限(0:无;1:一年以内;2:1年-3年;3:3年以上)',
  `social_insurance_monthly_payment` decimal(12,4) DEFAULT NULL COMMENT '社保月缴总额(元)',
  `social_insurance_year` int(11) DEFAULT NULL COMMENT '社保缴纳年限(0:无;1:一年以内;2:1年-3年;3:3年以上)',
  `industry_code` varchar(16) DEFAULT NULL COMMENT '行业编码',
  `industry_name` varchar(32) DEFAULT NULL COMMENT '行业名称',
  `profession_code` varchar(16) DEFAULT NULL COMMENT '职业编码',
  `profession_name` varchar(32) DEFAULT NULL COMMENT '职业名称',
  `post_code` varchar(16) DEFAULT NULL COMMENT '职务编码',
  `post_name` varchar(32) DEFAULT NULL COMMENT '职务名称',
  `work_unit_nature_code` varchar(16) DEFAULT NULL COMMENT '工作单位性质编码',
  `work_unit_nature_name` varchar(32) DEFAULT NULL COMMENT '工作单位性质名称',
  `work_unit_name` varchar(64) DEFAULT NULL COMMENT '工作单位名称',
  `work_unit_phone` varchar(32) DEFAULT NULL COMMENT '工作单位固定电话',
  `work_unit_postcode` varchar(32) DEFAULT NULL COMMENT '工作单位邮编',
  `work_unit_address_pid` varchar(16) DEFAULT NULL COMMENT '工作单位地址省Id',
  `work_unit_address_pname` varchar(32) DEFAULT NULL COMMENT '工作单位地址省名',
  `work_unit_address_cid` varchar(16) DEFAULT NULL COMMENT '工作单位地址市Id',
  `work_unit_address_cname` varchar(32) DEFAULT NULL COMMENT '工作单位地址市名',
  `work_unit_address_rid` varchar(16) DEFAULT NULL COMMENT '工作单位地址区Id',
  `work_unit_address_rname` varchar(32) DEFAULT NULL COMMENT '工作单位地址区名',
  `work_unit_address_detail` varchar(128) DEFAULT NULL COMMENT '工作单位详细地址',
  `work_unit_induction_time` date DEFAULT NULL COMMENT '工作单位入职时间',
  `home_phone` varchar(32) DEFAULT NULL COMMENT '家庭固定电话',
  `home_postcode` varchar(32) DEFAULT NULL COMMENT '家庭住址邮编',
  `home_address_pid` varchar(16) DEFAULT NULL COMMENT '家庭地址省Id',
  `home_address_pname` varchar(32) DEFAULT NULL COMMENT '家庭地址省名',
  `home_address_cid` varchar(16) DEFAULT NULL COMMENT '家庭地址市Id',
  `home_address_cname` varchar(32) DEFAULT NULL COMMENT '家庭地址市名',
  `home_address_rid` varchar(16) DEFAULT NULL COMMENT '家庭地址区Id',
  `home_address_rname` varchar(32) DEFAULT NULL COMMENT '家庭地址区名',
  `home_address_detail` varchar(128) DEFAULT NULL COMMENT '家庭详细地址',
  `habitation_phone` varchar(32) DEFAULT NULL COMMENT '邮寄地址固定电话',
  `habitation_postcode` varchar(32) DEFAULT NULL COMMENT '邮寄地址邮编',
  `habitation_address_pid` varchar(16) DEFAULT NULL COMMENT '邮寄地址省Id',
  `habitation_address_pname` varchar(32) DEFAULT NULL COMMENT '邮寄地址省名',
  `habitation_address_cid` varchar(16) DEFAULT NULL COMMENT '邮寄地址市Id',
  `habitation_address_cname` varchar(32) DEFAULT NULL COMMENT '邮寄地址市名',
  `habitation_address_rid` varchar(16) DEFAULT NULL COMMENT '邮寄地址区Id',
  `habitation_address_rname` varchar(32) DEFAULT NULL COMMENT '邮寄地址区名',
  `habitation_address_detail` varchar(128) DEFAULT NULL COMMENT '邮寄地址详细地址',
  `is_inuse` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用(0:停用;1:启用)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_customer_name` (`customer_name`) USING BTREE COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='客户信息表';

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
	`order_code` varchar(32) NOT NULL COMMENT '订单编号',
  `customer_name` varchar(32) NOT NULL COMMENT '客户姓名',
  `phone` varchar(16) DEFAULT NULL COMMENT '发货手机号',
  `address_pid` varchar(16) DEFAULT NULL COMMENT '邮寄地址省Id',
  `address_pname` varchar(32) DEFAULT NULL COMMENT '邮寄地址省名',
  `address_cid` varchar(16) DEFAULT NULL COMMENT '邮寄地址市Id',
  `address_cname` varchar(32) DEFAULT NULL COMMENT '邮寄地址市名',
  `address_rid` varchar(16) DEFAULT NULL COMMENT '邮寄地址区Id',
  `address_rname` varchar(32) DEFAULT NULL COMMENT '邮寄地址区名',
	`address_detail` varchar(128) DEFAULT NULL COMMENT '邮寄地址详细地址',

	`pay_type` varchar(16) DEFAULT NULL COMMENT '订单支付方式',
	`pay_status` varchar(16) DEFAULT NULL COMMENT '支付状态 1 未支付  2 支付中 3 已经支付  4 退款中 5 已退款',
	`order_status` varchar(16) DEFAULT NULL COMMENT '订单状态 1 发起订单 2 订单处理中 3 订单完成',
	`order_fee` decimal(24,2) DEFAULT NULL COMMENT '订单总费用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_order_code` (`order_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单表';

DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `goods_id` bigint(20) NOT NULL COMMENT '商品id',
	`order_id` bigint(20) NOT NULL COMMENT '订单id',
	`goods_num` bigint(20) NOT NULL COMMENT '商品数量',
	`goods_price` decimal(24,2) NOT NULL COMMENT '订单价-实际价格',
	`sale_type` varchar(128) DEFAULT NULL COMMENT '1零售 2批发',
	`express_fee` decimal(24,2) DEFAULT NULL COMMENT '快递费',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_order_id` (`order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单商品表';
