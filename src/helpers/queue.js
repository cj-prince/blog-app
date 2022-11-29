const amqp = require('amqplib');
const config = require('../config/rabbitMQ');
const logger = require('../config/logger/index');

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Queue {
  channel;
  exchangeName = config.rabbitMQ.exchangeName;

  // async createChannel() {
  //   const connection = await amqp.connect(config.rabbitMQ.url);
  //   this.channel = await connection.createChannel();
  // }

  async publishMessage(message) {
    // const connect = await this.createChannel();
    
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();

    let queue = 'Blog';
    let msg = JSON.stringify(message);

    await this.channel.assertQueue(queue, {
      durable: false,
    });

    this.channel.sendToQueue(queue, Buffer.from(msg, 'utf8'));
    console.log(' [x] Sent %s', msg);
  }

  async consumeMessages() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();

    let queue = 'Blog';
    await this.channel.assertQueue(queue, {
      durable: false,
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    this.channel.consume(
      queue,
      (msg) => {
        let data = msg.content.toString();
        console.log(' [x] Received %s', data);
      },
      {
        noAck: true,
      }
    );
  }
}

module.exports = Queue;
