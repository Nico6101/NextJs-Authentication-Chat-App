
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Layout } from './chat/Layout';

const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const PORT = 3000;
    // await fetch("http://localhost:3000/api/chat");   
    const socket: Socket = io(`:${PORT + 1}`, { path: "/api/chat", addTrailingSlash: false }); // Connect to the server-side Socket.IO server

    useEffect(() => {
        socket.on("connect_error", async err => {
            try {
                console.log(`connect_error due to ${err.message}`)
                await fetch("/api/chat");
                socket.connect();
            }
            catch (error) {
                console.error("error in connect_error: ", error)
            }
        });
        socket.on("connect", () => {
            console.log('connected: ', socket.id);
        })
        socket.on('message', (message) => {
            console.log('receiving message from server..');
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleMessageSubmit = () => {
        socket.emit('message', messageInput);
        setMessageInput('');
    };

    return (
        <Layout>
            <div>
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={handleMessageSubmit}>Send</button>
            </div>
        </Layout>
    );
};

export default Chat;
