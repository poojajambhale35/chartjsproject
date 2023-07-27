//Connection file
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Add middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup 
mongoose.connect('mongodb://localhost:27017/liveChartData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Socket.io setup
io.on('connection', socket => {
  console.log('A client has connected.');

  // Handle live data updates here
  
  socket.on('disconnect', () => {
    console.log('A client has disconnected.');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
