const socketController = (socket) => {
  //   console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    // console.log('Cliente desconectado', socket.id);
  });

  socket.on('send-msg', (payload, callback) => {
    socket.broadcast.emit('send-msg', payload);

    callback({ id: payload.id, date: new Date().getTime() });
  });

  //   socket.on('another-msg', (payload) => {
  //     console.log(`Mensaje ${payload} recibido en el server`);
  //   });
};

module.exports = socketController;
