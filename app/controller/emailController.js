const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = global.config;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const { ParameterException } = global.help.httpCode;
const mq = require('../producer');

const { resOk } = global.help.resData;

module.exports = {
	send: async (req, res, next) => {
		let ruleData = {
			title: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return
		}

		let getData = req.body;
		let username = res.user.username;

		var option = {
				service: config.eamil.service,
				secure: true,
				auth: {
					user: config.eamil.auth.user,
					pass: config.eamil.auth.pass
				}	
		}
		var transporter = mailer.createTransport(smtpTransport(option));

    var from = '<841811316@qq.com>';
    var to = '377950622@qq.com';
    var subject = getData.title;
		var html = '<p>您好： 我是' + username + '</p>';
		
		var data = await transporter.sendMail({
			from,
			to,
			subject,
			html,
		});

		if(data) {
			res.json(resOk({
				isOK: 1
			},'邮件发送成功'))			
		}
	},
	sendMq: async (req, res, next) => {
		let ruleData = {
			title: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return
		}

		let getData = req.body;
		let username = res.user.username;

		await mq.eamilDLX(username)

		res.json(resOk({
			isOK: 1
		},'邮件发送成功'))
	}	
}