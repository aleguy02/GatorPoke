const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const WebSocket = require('ws')
const server = http.createServer(app)

const users = []
const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws) {
    console.log('A new client connected!')
    ws.send('Welcome New Client!')

    users.push('username')
    console.log(users)

    ws.on('message', function message(message) {
        console.log('message received: %s', message);
        users.push(message)
        console.log(users)
    });

    ws.on('close', function close(ws) {
        console.log('connection closed')
        users.pop()
        console.log(users)
    })
});



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
    // res.redirect('/new')
})

const newRouter = require("./routes/new")
const exp = require('constants')

app.use('/new', newRouter)

app.listen(3500)

server.listen(3000, () => {
    console.log('Running on port 3000')
})