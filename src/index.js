const pubSubClient = require('./config/PubSub');
const uuid = require('uuid');

async function quickstart(topicNameOrId = 'user', subscriptionName = 'UserSubscription') {
  // Subscribes to the topic
  const subscription = pubSubClient.subscription(subscriptionName);

  const topic = pubSubClient.topic(topicNameOrId);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());

    // Acknowledges the message so that it is not received again.
    message.ack();

    // Turn off application after receiving a message
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);

    // Turn off application after receiving a error message
    process.exit(1);
  });

  const message = {
    id: uuid.v4(),
    name: 'Lucca Bassoli',
    created_at: new Date().toISOString(),
  };

  // Publishes a message to the topic
  topic.publishMessage({
    data: Buffer.from(JSON.stringify(message)),
    attributes: {
      origin: 'poc-pubsub',
    },
  });
}

quickstart();
