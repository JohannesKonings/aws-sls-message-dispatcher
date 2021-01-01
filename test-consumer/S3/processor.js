'use strict';
const AWS = require('aws-sdk');

module.exports.processTopic1 = async event => {

  console.log("region", process.env.region);
  console.log("bucket", process.env.bucket);
  const s3 = new AWS.S3();
  const bucket = process.env.bucket;
  const s3key = 'eventFile.json';

  const messageString = event.Records[0].body;
  const messageJson = JSON.parse(messageString);

  const uploadParams = {
    Bucket: bucket,
    Key: s3key,
    Body: messageJson.Message
  };

  await s3.upload(uploadParams).promise().then(function (data) {
    console.log(`File uploaded successfully. ${data.Location}`);
  }, function (err) {
    console.error("Upload failed", err);
  })


  console.log("event", event);
  console.log("messageString", messageString);
  console.log("messageJson", messageJson);
  console.log("message", messageJson.Message);

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
