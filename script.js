
const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

function getOrCreateUsername() {
  let username = localStorage.getItem('anon_username');
  if (!username) {
    username = 'Anon' + Math.floor(Math.random() * 10000);
    localStorage.setItem('anon_username', username);
  }
  return username;
}

const username = getOrCreateUsername();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { username, msg: input.value });
    input.value = '';
  }
});

socket.on('chat message', function ({ username, msg }) {
  const item = document.createElement('li');
  item.textContent = `${username}: ${msg}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
