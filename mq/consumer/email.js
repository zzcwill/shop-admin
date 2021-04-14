const path = require('path');
const rabbitmq = require('./rabbitmq.js');
const config = require('config-lite')(path.resolve(__dirname, '../'));

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

/**
 * 消费一个死信队列
 * @param { Object } connnection 
 */
let eamilDLX = async ()=> {
    let connnection = await rabbitmq.init()

    const emailExchangeDLX = 'emailExDLX';
    const emailRoutingKeyDLX = 'emailRoutingKeyDLX';
    const emailQueueDLX = 'emailQueueDLX';

    const ch = await connnection.createChannel();

    await ch.assertExchange(emailExchangeDLX, 'direct', { durable: true });
    const queueResult = await ch.assertQueue(emailQueueDLX, {
        exclusive: false,
    });
    await ch.bindQueue(queueResult.queue, emailExchangeDLX, emailRoutingKeyDLX);
    await ch.consume(queueResult.queue, async (msg) => {
        let username = msg.content.toString()

        console.info('consumer email:' + username)

        let option = {
            service: config.eamil.service,
            secure: true,
            auth: {
                user: config.eamil.auth.user,
                pass: config.eamil.auth.pass
            }
        }
        let transporter = mailer.createTransport(smtpTransport(option));

        let from = '<841811316@qq.com>';
        let to = '377950622@qq.com';
        let subject = username;
        let html = '<p>您好： 我是' + username + '</p>';

        await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });
    }, { noAck: true });
}

// 消费消息
module.exports = eamilDLX

