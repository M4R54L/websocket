const socket = io();

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

socket.on('connect', () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  lblOffline.style.display = '';
  lblOnline.style.display = 'none';
});

socket.on('send-msg', (payload) => {
  if (payload.id !== socket.id)
    console.log(`Otro usuario envio: ${payload.msg}`);
});

btnSend.addEventListener('click', () => {
  const msg = txtMessage.value;
  const payload = {
    msg,
    id: socket.id,
    date: new Date().getTime(),
  };

  socket.emit('send-msg', payload, (id) => {
    console.log('Desde el server: ', id);
  });

  //   socket.emit('another-msg', 'Este es otro mensaje');
});

txtMessage.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSend.click();
  }
});
