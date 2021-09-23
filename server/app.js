//const { Socket } = require('socket.io')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { allowEIO3: true })
const users = require('./users')()
const m = (name, text, id) => ({ name, text, id })

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    
    if (!data.name && !data.room) { return cb('Incorrect data') }

    socket.join(data.room)
    users.remove(socket.id)
    users.add({ name: data.name, id: socket.id, room: data.room })
    
    cb({ userId: socket.id })
    const user = users.get(socket.id)
    io.to(user.room).emit('updateUsers', users.getByRoom(user.room))

    socket.emit('newMessage', m ('admin', 'Вітаю вас ' + data.name) )
    socket.broadcast
    .to(data.room)
    .emit('newMessage', m('admin', `Користувач ${data.name} Ввійшов`))
   
  })
  
  socket.on('createMessage', (data, cb) => {
    
    if (!data.text) {
      return cb('Текста нема')
    }
    const user = users.get(data.id)
    if (user) { io.to(user.room).emit('newMessage', m(user.name, data.text, user.id)) }
    cb()
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    console.log(user)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Користувач ${user.name} вийшов`))
    }
    cb()
  })
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Користувач ${user.name} вийшов`))
    }
  })
})

module.exports = {
    app, server
}