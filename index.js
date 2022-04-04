const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const getConnection = require('./db.connection');

// get config vars env
dotenv.config({ path: './config.env' });

// init server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// when user connect to web socket
io.on('connection',  async (socket) => {

  const db = await getConnection()

  const sendData = async (collectionName, socketEvent) => {
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();
    socket.emit(socketEvent, data)
  }

  // send data to client socket, then every two seconds send again
  sendData('sensor_data', 'sensor_data')
  sendData('sensor_ultrasonic', 'sensor_ultrasonic_data')

  setInterval(() => { 
    sendData('sensor_data', 'sensor_data')
    sendData('sensor_ultrasonic', 'sensor_ultrasonic_data')
  }, 2000);

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));