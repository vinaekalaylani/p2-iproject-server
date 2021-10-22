if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require(`cors`)
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const router = require(`./routes`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(router)

io.on('connection', socket => {
  socket.on('sendMessage', (data) => {
    socket.broadcast.emit('broadcastMessage', data)
  })
  socket.on('sendUser', (data) => {
    socket.broadcast.emit('broadcastUser', data)
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })