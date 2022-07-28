const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const pubSubClient = new PubSub({
  credentials: {
    type: process.env.PUBSUB_TYPE,
    private_key: process.env.PUBSUB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.PUBSUB_CLIENT_EMAIL,
    client_id: process.env.PUBSUB_CLIENT_ID,
  },
  projectId: process.env.PUBSUB_PROJECT_ID,
});

module.exports = pubSubClient;
