const AWS = require('aws-sdk');

AWS.config.update({ region: 'sa-east-1' });

  const sns = new AWS.SNS();
  
  const publishNotification = (message, topicArn) => {
      const params = {
          Message: message,
          TopicArn: topicArn
            

      };
  
      sns.publish(params, (err, data) => {
          if (err) {
              console.error("Error sending message: ", err);
          } else {
              console.log("Message sent: ", data);
          }
      });
  };

module.exports = function(app,banco){

    app.post('/Not/doar',(request,response) =>{
        console.log("rota => POST: /Notificacoes");
        const mensagem = request.body.message
        const topicArn = process.env.SNS_TOPIC_ARN

        publishNotification(mensagem,topicArn)

        response.status(200).send({ mensagem: 'Doação realizada com sucesso!' });
    })

}