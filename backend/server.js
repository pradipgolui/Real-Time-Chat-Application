const express = require('express');
const http = require('http');
const connectDB = require('./config/database');
const socketIO = require('socket.io');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3000;

const app = express();  
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH']
    }
}); 

connectDB();  
 
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);


io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('sendMessage',(data)=>{
        io.emit('receiveMessage', data)
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});


server.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});
