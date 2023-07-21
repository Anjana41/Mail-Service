const AWS = require('aws-sdk'); 


const config = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // hardcoding credentials is a bad practice
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY, // please use env vars instead
    region: "us-east-1",
  };
  AWS.config.update(config);
  AWS.config.update({ region: "us-east-1" });

  const cloudwatch = new AWS.CloudWatch(config);

  module.exports = {
    getMetricData() {
    // console.log("cloudwatch");
    // console.log(accessKeyId);
     const dateObj = new Date()
     const params = {
      StartTime: new Date(new Date().setHours(0, 0, 0, 0)),
      EndTime: dateObj,
      MetricDataQueries: [
        // {
        //     Id: 'm9',
        //     MetricStat: {
        //      Metric: {
        //       Dimensions: [
        //        {
        //         Name: 'promotional',
        //         Value: 'Promotional-Email',
        //        },
        //       ],
        //     //   MetricName: 'Delivery',
        //     //   MetricName: 'Sends',
        //       MetricName: 'Opens',
        //       Namespace: 'AWS/SES',
        //      },
        //      Period: 86400,     
        //      Stat: 'Sum',
        //      Unit:'Count',
    
        //     },
        //    },
           {
            Id: 'm1',
            MetricStat: {
             Metric: {
              Dimensions: [
               {
                Name: 'promotional',
                Value: 'Promotional-Email',
               },
              ],
            //   MetricName: 'Delivery',
            //   MetricName: 'Sends',
              MetricName: 'Open',
              Namespace: 'AWS/SES',
             },
             Period: 86400,     
             Stat: 'Sum',
             Unit:'Count',
        //   stacked: false,
        //   view: "timeSeries",


    
            },
            
           },
       {
        Id: 'm10',
        MetricStat: {
         Metric: {
          Dimensions: [
           {
            Name: 'promotional',
            Value: 'Promotional-Email',
           },
          ],
          MetricName: 'Delivery',
        //   MetricName: 'Opens',
        //   MetricName: 'Click',

          Namespace: 'AWS/SES',
         },
         Period: 86400,
         Stat: 'Sum',
        //  Stat: 'Opens',

        },
       },
      ],
     }
     return new Promise((resolve, reject) => {cloudwatch.getMetricData(params, (err, data) => {
       if (err) {
        reject(err)
       } // an error occurred
       resolve(data.MetricDataResults)
      })
     })
    },
   }
