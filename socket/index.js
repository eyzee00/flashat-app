const { Server } = require('socket.io');

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("addNewUser", (userId) => {
 
        if (!onlineUsers.some((user) => user.userId === userId) && userId) { 
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const recipient = onlineUsers.find((user) => user.userId === message.recipientId);
        if (recipient) {
            io.to(recipient.socketId).emit("getMessage", message);
            io.to(recipient.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});


io.listen(3080);