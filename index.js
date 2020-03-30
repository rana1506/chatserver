const app = require('express')()
var bodyParser = require('body-parser');

const http = require('http').createServer(app)

var port    =   process.env.PORT || 8080;
var temp="null data";
app.get('/', (req, res) => {	
    res.send("Node Server is running. Yayy!!  "+ temp)
})
app.get('/something', (req, res) => {
    temp=req.query.color1  // true  
    res.send(temp)  
})
app.post('/something', (req, res) => {
    temp=req.query.color1  // true  
    res.send(temp)  
})
//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


http.listen(port)
