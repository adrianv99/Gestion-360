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
  const sensorData = db.collection('sensor_data'); 

  const sendSensorData = async () => {
    let data = await sensorData.find().toArray();
    socket.emit('sensor_data', data)
  }

  sendSensorData()

  // send sensor data to client socket every two seconds 
  setInterval(() => { sendSensorData() }, 2000);

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));