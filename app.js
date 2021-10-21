const cors = require(`cors`)
const express = require('express')

const app = express()
const port = 3000
const router = require(`./routes`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(router)

io.on('connection', socket => {
  console.log('connection')
  socket.on('sendMessage', (data) => {
    
    console.log(data)
    socket.broadcast.emit('broadcastMessage', data)
  })
})

server.listen(port, () => {
    console.log(`This app is listening on port ${port} - Josep Immanuel`)
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })