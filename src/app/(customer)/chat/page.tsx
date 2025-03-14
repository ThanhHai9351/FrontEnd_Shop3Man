"use client"
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
let socket: Socket;

interface Message {
    senderId: string;
    content: string;
    timestamp: string;
}

export default function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Message[]>([]);

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');

        const conversationId = '67c2c4737da22c2cbec63c8a';
        socket.emit('joinRoom', conversationId);

        socket.on('messageReceived', (data: Message) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const data = {
            conversationId: '67c2c4737da22c2cbec63c8a',
            senderId: Cookies.get("userid"),
            content: message,
        };
        socket.emit('sendMessage', data);
        setMessage('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 className='text-2xl font-bold text-gray-700'>Chat Room (room1)</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    height: '300px',
                    overflowY: 'scroll',
                    marginBottom: '20px'
                }}
            >
                {chat.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                        <strong className='text-gray-700'>{msg.senderId}:</strong>
                        <span className='text-gray-700'>{msg.content}</span>
                        <small className='text-gray-500'>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                ))}
            </div>
            <input
                type="text"
                className='border-2 border-gray-300 rounded-md p-2 text-gray-700'
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ padding: '8px', width: '300px', marginRight: '10px' }}
            />
            <button onClick={sendMessage} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                Send
            </button>
        </div>
    );
}
