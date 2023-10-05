// Importar as bibliotecas
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');

const { messageNatChl, message2NatChl, natChileVitor } = require('./mocks');

dotenv.config();

// Configurar as credenciais da AWS
const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configurar a região
AWS.config.update({ region: process.env.AWS_REGION, credentials });

// URL da fila da Amazon SQS
const queueUrl = process.env.SQS_QUEUE_URL;

// Função para enviar a mensagem para a fila
function sendMessageToQueue(message) {
    const sqs = new AWS.SQS();

    const params = {
        MessageBody: message,
        MessageAttributes: {
            CountryId: {
                DataType: 'String',
                StringValue: 'NATCHL',
            }
        },
        QueueUrl: queueUrl,
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Erro ao enviar a mensagem para a fila:', err);
        } else {
            console.log('Mensagem enviada com sucesso:', data.MessageId);
            console.log(data)
        }
    });
}

sendMessageToQueue(JSON.stringify(natChileVitor));