const express = require('express')
const app = express()

app.use(express.urlencoded());

const http = require('http').createServer(app)

var port    =   process.env.PORT || 8080;
var temp="null data";
app.get('/', (req, res) => {	
    res.send("Node Server is running. Yayy!!  "+ temp)
})
app.get('/something', (req, res) => {
    temp=req.query.color  // true  
    res.send(temp)  
})
app.post('/something', (req, res) => {
    temp=req.body.color  // true  
    res.send(temp)  
})
//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})




http.listen(port)
