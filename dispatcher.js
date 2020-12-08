'use strict';
const AWS = require("aws-sdk");

module.exports.dispatch = async event => {
  let snsOpts = {
    region: process.env.region,
  };

  let sns = new AWS.SNS(snsOpts);

  let messageData = {
    Message: event.body,
    TopicArn: process.env.dispatchTopic1,
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
