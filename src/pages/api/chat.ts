
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as IOServer, Socket } from "socket.io"
import { Server } from "socket.io"

const PORT = 3000;
export const config = {
    api: {
        bodyParser: false,
    },
}

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO
}
export default function SocketHandler(_req: NextApiRequest, res: NextApiResponseWithSocket) {
    console.log('reached socket server..');
    if (res.socket.server.io) {
        res.status(200).json({ success: true, message: "Socket is already running", socket: `:${PORT + 1}` })
        return
    }

    console.log("Starting Socket.IO server on port:", PORT + 1)

    const io = new Server({ path: "/api/chat", addTrailingSlash: false, cors: { origin: "*" } }).listen(PORT + 1)

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        socket.on('message', (data) => {
            console.log('Received message:', data);
            socket.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    res.socket.server.io = io
    res.status(201).json({ success: true, message: "Socket is started", socket: `:${PORT + 1}` })
}