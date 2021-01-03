'use strict';
const AWS = require('aws-sdk');

module.exports.processTopic2 = async event => {

  console.log("region", process.env.region);
  console.log("tableName", process.env.tableName);

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const messageString = event.Records[0].body;
  const messageJson = JSON.parse(messageString);
  const timestamp = new Date().toISOString();

  const eventData = {
    pk: "topic2",
    sk: timestamp,
    message: messageJson.Message,
  };

  const params = {
    TableName: process.env.tableName,
    Item: eventData,
  };

  await dynamoDb.put(params).promise().then(function (data) {
    console.log('put to dynamoDB succesfull');
  }, function (err) {
    console.error("put to dynamoDB", err);
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
