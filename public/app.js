const socket = io();

// Generar ID único para cada usuario (cada pestaña será un usuario distinto)
const usuarioId = Math.random().toString(36).substring(2, 9);

// ===== ENVIAR MENSAJE =====
function enviarMensaje(){

    let input = document.getElementById("mensaje");
    let texto = input.value;

    if(texto.trim() === "") return;

    // Enviar objeto con usuario + mensaje
    socket.emit("mensaje", {
        usuario: usuarioId,
        texto: texto
    });

    input.value = "";
}

// ===== RECIBIR MENSAJE =====
socket.on("mensaje", (data)=>{

    // Si el mensaje es mío → derecha
    if(data.usuario === usuarioId){
        agregarMensaje(data.texto, "enviado");
    }
    // Si es de otro usuario → izquierda
    else{
        agregarMensaje(data.texto, "recibido");
    }

});

// ===== AGREGAR MENSAJE AL CHAT =====
function agregarMensaje(texto, tipo){

    let chatBox = document.getElementById("chatBox");

    let div = document.createElement("div");
    div.classList.add("mensaje");
    div.classList.add(tipo);

    div.textContent = texto;

    chatBox.appendChild(div);

    // Scroll automático
    chatBox.scrollTop = chatBox.scrollHeight;
}
