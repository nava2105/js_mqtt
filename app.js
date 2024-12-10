const mqtt = require('mqtt');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Configuring the MQTT client
const client = mqtt.connect('mqtt://broker.hivemq.com');

let messagePayload = { message: "No messages yet" };

// Connection to the MQTT broker
client.on('connect', () => {
    console.log('Connected to the MQTT broker');

    // Post a "Hello World" message in JSON format
    const jsonMessage = JSON.stringify({ message: "Hello World from MQTT in javascript" });
    client.publish('test/hola', jsonMessage);

    console.log('Posted message:', jsonMessage);

    // Update the message to the HTTP server
    messagePayload = JSON.parse(jsonMessage);
});

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'MQTT + Express API',
            version: '1.0.0',
            description: 'API that publishes an MQTT message and provides an HTTP response in JSON.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./app.js'], // Ubicación de las rutas documentadas con Swagger
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the last message posted via MQTT.
 *     description: Returns a JSON message with the last published payload.
 *     responses:
 *       200:
 *         description: Last message posted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World from MQTT in javascript
 */
app.get('/', (req, res) => {
    res.json(messagePayload);
});

// Inicia el servidor HTTP
app.listen(port, () => {
    console.log(`Web server running on: http://localhost:${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api-docs`);
});
