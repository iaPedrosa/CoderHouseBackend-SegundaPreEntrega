const socket = io();

let username = null;

//Usamos sweetalert para pedir el nombre de usuario

if(!username) {
    Swal.fire({
        title: 'Bienvenido al chat!',
        text: 'Ingrese su nombre de usuario:',
        input: 'text',
        inputValidator: (value) =>{
            if(!value) return 'Tu nombre de usuario es obligatorio'
        },
        allowOutsideClick: false,
    })
    .then((input)=>{
        user = input.value;
        socket.emit('newUser', user);
    })
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', sendMessage);


//Evento keydown
message.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage();
    }
});


function sendMessage() {
    const messageText = message.value.trim(); // Eliminar espacios en blanco al inicio y al final

    if (messageText === '') {
        Swal.fire('Error', 'No se puede enviar un mensaje vacío', 'error');
        return; // Detener la ejecución si el mensaje está vacío
    }

    socket.emit('chat:message', {
        message: messageText,
        user: user
    });
    message.value = '';
}

socket.on('messages', (arrayMsgs)=>{
    actions.innerHTML = ''
    const chatRender = arrayMsgs.map((msg)=>{
        return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`
    }).join(' ')
    output.innerHTML = chatRender
})


socket.on('newUserNoti', (user) => {
    Toastify({
        text: `🟢 ${user} se unio al chat`,
        duration: 6000,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
   
      }).showToast();
})



message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username)
})

socket.on('chat:typing', (user)=>{
    actions.innerHTML = `<p>${user} esta escriendo un mensaje...</p>`
})