const { PubSub } = require('@google-cloud/pubsub');
const uuid = require('uuid');

require('dotenv').config();

async function quickstart(topicNameOrId = 'user', subscriptionName = 'UserSubscription') {
  // Instantiates a client
  const pubsub = new PubSub({
    credentials: {
      type: process.env.PUBSUB_TYPE,
      private_key: process.env.PUBSUB_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.PUBSUB_CLIENT_EMAIL,
      client_id: process.env.PUBSUB_CLIENT_ID,
    },
    projectId: process.env.PUBSUB_PROJECT_ID,
  });

  // Subscribes to the topic
  const subscription = pubsub.subscription(subscriptionName);

  const topic = pubsub.topic(topicNameOrId);

  // Creates a new topic
  //   const [topic] = await pubsub.createTopic(topicNameOrId);
  //   console.log(`Topic ${topic.name} created.`);

  //   // Creates a subscription on that new topic
  //   const [subscription] = await topic.createSubscription(subscriptionName);

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
    name: 'John Doe',
    created_at: new Date().toISOString(),
  };

  // Publishes a message to the topic
  await topic.publish(Buffer.from(JSON.stringify(message)));
}

quickstart();
