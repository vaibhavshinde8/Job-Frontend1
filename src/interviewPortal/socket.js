import {io} from 'socket.io-client';
const socket=io('https://abundant-forgiveness-production.up.railway.app/')
socket.on('connect',()=>{
    console.log();
    console.log('Connected');
  })
  socket.on('disconnect',()=>{
    console.log('Disconnected');
  })
export default socket;