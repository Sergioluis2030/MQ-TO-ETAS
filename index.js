// Cargar variables de entorno
require('dotenv').config();
const mq = require('ibmmq');
const MQC = mq.MQC;

// Leer las variables de entorno
const MQ_MANAGER = process.env.MQ_MANAGER;
const MQ_HOST = process.env.MQ_HOST;
const MQ_PORT = process.env.MQ_PORT;
const MQ_CHANNEL = process.env.MQ_CHANNEL;

// Verificar si todas las variables de entorno están definidas
if (!MQ_MANAGER || !MQ_HOST || !MQ_PORT || !MQ_CHANNEL) {
    console.error("Error: Una o más variables de entorno no están definidas.");
    process.exit(1);
}

// Crear objetos para la conexión
const cno = new mq.MQCNO();
cno.Options = MQC.MQCNO_NONE;

const cd = new mq.MQCD();
cd.ChannelName = MQ_CHANNEL;
cd.ConnectionName = `${MQ_HOST}(${MQ_PORT})`;

cno.ClientConn = cd;

console.log("Iniciando intento de conexión a MQ...");

mq.Connx(MQ_MANAGER, cno, (err, conn) => {
    if (err) {
        console.error("Error al conectar con MQ:", err);
    } else {
        console.log("Conectado exitosamente a MQ!");

        mq.Disc(conn, (err) => {
            if (err) {
                console.error("Error al desconectar de MQ:", err);
            } else {
                console.log("Desconectado de MQ exitosamente.");
            }
        });
    }
});
