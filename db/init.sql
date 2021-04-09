DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `menu_name` varchar(255) DEFAULT NULL COMMENT '菜单名，如 客户管理',
  `url` varchar(255) DEFAULT NULL COMMENT '菜单链接地址',
  `parent_id` int(11) DEFAULT NULL COMMENT '父模块ID',
  `orders` int(11) DEFAULT NULL COMMENT '序号，排序用',
  `logo_tag` varchar(255) DEFAULT NULL COMMENT 'LOGO标识',
  `level` int(11) DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',	
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='系统菜单表';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(11) NOT NULL COMMENT '用户名，现统一为手机号',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `salt` varchar(255) NOT NULL COMMENT '密码加密盐值',
  `realname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `sex` int(11) DEFAULT NULL COMMENT '性别',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `level` int(11) DEFAULT NULL COMMENT '用户级别',
  `shop_id` int(11) DEFAULT NULL COMMENT '门店id',
  `shop_name` varchar(255) DEFAULT NULL COMMENT '所属分公司名称-门店名',
  `is_on_duty` tinyint(1)  NOT NULL DEFAULT 1 COMMENT '是否在岗(0-否;1-是)',
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
	`modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `uid_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) NOT NULL COMMENT '角色名称',
  `role_code` varchar(255) NOT NULL COMMENT '角色编码',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '使用状态：1启用 0停用',  
  `note` varchar(255) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
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

DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) NOT NULL COMMENT '店铺',
  `status` tinyint(1) DEFAULT 1 COMMENT '启用1 停用0',
  `note` varchar(255) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='机构表';

DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `file_type` varchar(255) NOT NULL COMMENT '图片类型',
  `file_size` bigint(64) DEFAULT NULL COMMENT '图片大小',
  `file_path` varchar(255) NOT NULL COMMENT '图片url',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '0：未删除，1：已删除',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片存储记录表';

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `goods_code` varchar(255) NOT NULL COMMENT '商品编号',
  `goods_price` decimal(10,2) DEFAULT NULL COMMENT '零售价格',
	`goods_size` varchar(255) DEFAULT NULL COMMENT '商品尺寸',
	`goods_brand` varchar(255) DEFAULT NULL COMMENT '商品品牌',
	`goods_color` varchar(255) DEFAULT NULL COMMENT '商品颜色',
	`goods_cost_price` decimal(10,2) NOT NULL COMMENT '进货价',
	`goods_trade_price` decimal(10,2) DEFAULT NULL COMMENT '批发价',
	`goods_note` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_goods_code` (`goods_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品信息表';

DROP TABLE IF EXISTS `goods_file`;
CREATE TABLE `goods_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `goods_id` int(11) NOT NULL COMMENT '商品id',
	`file_id` int(11) NOT NULL COMMENT '文件id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id_goods_id` (`goods_id`) USING BTREE,
  KEY `id_file_id` (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='商品图片关联表';

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户Id',
  `name` varchar(255) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否启用(0:停用;1:启用)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_name` (`name`) USING BTREE COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='客户信息表';

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
	`order_code` varchar(255) NOT NULL COMMENT '订单编号-uuid',
  `customer_name` varchar(255) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '发货手机号',
	`address` varchar(255) DEFAULT NULL COMMENT '详细地址',

	`sale_type` varchar(255) NOT NULL COMMENT '1零售 2批发 3代卖',
  `express_fee` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '快递费',
	`pay_type` varchar(255) DEFAULT NULL COMMENT '订单支付方式',
	`pay_status` varchar(255) NOT NULL COMMENT '支付状态 1 未支付  2 支付中 3 已经支付  4 退款中 5 已退款',
	`order_status` varchar(255) DEFAULT NULL COMMENT '订单状态 1 发起订单 2 订单处理中 3 订单完成',
	`order_fee` decimal(10,2) NOT NULL COMMENT '订单总额',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_order_code` (`order_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单表';

DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单商品关联id',
  `goods_id` int(11) NOT NULL COMMENT '商品id',
	`order_id` int(11) NOT NULL COMMENT '订单id',
	`goods_num` int(11) NOT NULL COMMENT '商品数量',
	`goods_price` decimal(10,2) NOT NULL COMMENT '商品实际单价',
  `goods_fee` decimal(10,2) NOT NULL COMMENT '该商品实际总额',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id_order_id` (`order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单商品表';
