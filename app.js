const mqtt = require('mqtt');
const express = require('express');

const app = express();
const port = 3000;

// Configurar el cliente MQTT
const client = mqtt.connect('mqtt://broker.hivemq.com');

let messagePayload = { message: "No hay mensajes aún" };

// Conexión al broker MQTT
client.on('connect', () => {
    console.log('Conectado al broker MQTT');

    // Publica un mensaje "Hola Mundo" en formato JSON
    const jsonMessage = JSON.stringify({ message: "Hola Mundo desde MQTT en javascript" });
    client.publish('test/hola', jsonMessage);

    console.log('Mensaje publicado:', jsonMessage);

    // Actualiza el mensaje para el servidor HTTP
    messagePayload = JSON.parse(jsonMessage);
});

// Servidor HTTP que responde en JSON
app.get('/', (req, res) => {
    res.json(messagePayload);
});

// Inicia el servidor HTTP
app.listen(port, () => {
    console.log(`Servidor web corriendo en http://localhost:${port}`);
});
