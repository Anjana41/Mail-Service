const AWS = require('aws-sdk'); 

const htmlTemplate = (data) => {
  return `
    <p><strong>Message:</strong> ${data.emailbody}</p>
  `;
};

module.exports.sendMail = (sender, receivers, data, cloudwatchconfig) => {
  const params = {
    Destination: {
      ToAddresses: receivers
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'Aws'
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate(data)
        }
      }
    },
    Source: sender,
    ConfigurationSetName: cloudwatchconfig,
    ReplyToAddresses: [
     'anjana.saini@netleon.com',
    ],
  };
  
  const sendPromise = new AWS.SES().sendEmail(params).promise();

  return sendPromise
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
};

