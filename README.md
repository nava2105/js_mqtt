# js_mqtt
## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)

## General Info
***  
This project is a basic **MQTT client** integrated with an **Express.js server**. It connects to an MQTT broker, publishes a simple "Hello World" message in JSON format, and serves the last published message through an HTTP GET endpoint.

- **MQTT Publish**:
  - Topic: `test/hola`
  - Message: `{"message": "Hola Mundo desde MQTT en javascript"}`

- **HTTP Endpoint**:
  - Route: `/`
  - Response: Returns the last MQTT message in JSON format.

## Technologies
***  
A list of technologies used within the project:
* [Node.js](https://nodejs.org): Version 20.0.0
* [Express.js](https://expressjs.com): Version 4.x
* [MQTT.js](https://www.npmjs.com/package/mqtt): Version 4.x

## Installation
***  
Follow these steps to install and run the project:

### Via GitHub
Ensure you have Node.js installed on your machine:
```
node --version  
npm --version
```
Copy the repository
```
git clone https://github.com/nava2105/js_mqtt.git
```
Enter the directory
```
cd ../js_mqtt
```
Install the dependencies
```
npm install  
```
Run the server
```
node app.js
```
Open a browser and enter to
Server: [http://localhost:3000](http://localhost:3000)
### Via Docker-hub
Pull the image from Docker-hub
```
docker pull na4va4/js_mqtt
```
Start a container from the image
```
docker run -p 3000:3000 na4va4/js_mqtt
```
Open a browser and enter to
Server: [http://localhost:3000](http://localhost:3000)