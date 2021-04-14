const rabbitmq = require('./rabbitmq.js');

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

/**
 * 消费一个死信队列
 * @param { Object } connnection 
 */
async function eamilDLX(username) {
    let connnection = await rabbitmq.init()

    const emailExchange = 'emailEx';
    const emailQueue = 'emailQu';
    const emailExchangeDLX = 'emailExDLX';
    const emailRoutingKeyDLX = 'emailRoutingKeyDLX';
    
    const ch = await connnection.createChannel();

    await ch.assertExchange(emailExchange, 'direct', { durable: true });
    const queueResult = await ch.assertQueue(emailQueue, {
        exclusive: false,
        deadLetterExchange: emailExchangeDLX,
        deadLetterRoutingKey: emailRoutingKeyDLX,
    });
    await ch.bindQueue(queueResult.queue, emailExchange);

    console.info('producer email:' + username);
    await ch.sendToQueue(queueResult.queue, Buffer.from(username), {
        expiration: '10000'
    });
    
    ch.close();
}

// 消费消息
module.exports = eamilDLX

