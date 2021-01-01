# aws-sls-message-dispatcher

# architecture

![architecture diagram](./architecture/aws-sls-message-dispatcher.png "architecture diagram")

# serverless framework

`serverless create --template aws-nodejs`

`serverless deploy`

`serverless export-env`

# call API gateway

`curl -X POST https://xxx.execute-api.us-east-1.amazonaws.com/dev/event-receiver --data '{ "text": "Learn Serverless" }'`


