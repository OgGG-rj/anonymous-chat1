
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const users = {};

io.on('connection', (socket) => {
    const userId = socket.id;
    const username = "User_" + Math.floor(Math.random() * 10000);
    users[userId] = username;

    socket.on('chat message', (msg) => {
        io.emit('chat message', { user: users[userId], text: msg });
    });

    socket.on('disconnect', () => {
        delete users[userId];
    });
});

http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
