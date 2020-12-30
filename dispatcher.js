'use strict';
const AWS = require("aws-sdk");

module.exports.dispatch = async event => {
  let snsOpts = {
    region: process.env.region,
  };

  let sns = new AWS.SNS(snsOpts);

  let topicArnFromEnv;

  switch (event.headers.type) {
    case "topic1":
      topicArnFromEnv = process.env.dispatchTopic1;
    case "topic2":
      topicArnFromEnv = process.env.dispatchTopic1;
    default:
      console.log("no valid event type:", event.headers.type);
  }

  console.log("topicArnFromEnv", topicArnFromEnv);

  let messageData = {
    Message: event.body,
    TopicArn: topicArnFromEnv,
  };

  function json(statusCode, data, headers = {}) {
    return ({
      statusCode,
      headers: Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }, headers),
      body: JSON.stringify(data),
    });
  }

  console.log("header type", event.headers.type)
  console.log("PUBLISHING MESSAGE TO SNS:", messageData);

  try {
    await sns.publish(messageData).promise();
    console.log("PUBLISHED MESSAGE TO SNS:", messageData);
    return json(200, {});
  }
  catch (err) {
    console.log(err);
    return json(400, err);
  }
};
