const { io } = require("socket.io-client");

console.log(" Iniciando app...");

const socket = io("https://servidor-ws-prueba.onrender.com");
// Simulamos lo que leería la cámara de React Native al escanear el QR
const qrEscaneado = "sala_de_prueba";
const miSala = qrEscaneado;

socket.on("connect", () => {
    console.log("[MÓVIL] Conectado al servidor en la nube.");

    socket.emit("unirse_partida", miSala);

    setTimeout(() => {
        socket.emit("orden_desde_movil", {
            sala: miSala,
            payload: {
                accion: "CURAR",
                actorId: "CRwgqvdYhYho1j1b",
                hp: 25
            }
        });

        console.log(`[MÓVIL] Orden enviada a la sala ${miSala}`);
    }, 2000);
});

socket.on("datos_para_movil", (payload) => {
    if (payload.accion === "ACTUALIZAR_UI") {
        console.log(`\n[NOTIFICACIÓN FOUNDRY] El personaje ${payload.actorId} ahora tiene ${payload.hp} HP.`);
    }
});
