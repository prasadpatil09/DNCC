import React, { useRef, useState, useEffect } from 'react';
import './chat.css';
import Inputchat from './Inputchat';
import socketIOClient from 'socket.io-client';

const Chat = () => {
    const user = JSON.parse(localStorage.getItem('user')).username;
    const [chats, setChats] = useState([]);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const endofmessage = useRef();
    const socket = socketIOClient('https://dncc.onrender.com');

    useEffect(() => {
        socket.on("chat", (chats) => setChats(chats));
        socket.on("message", (msg) => setChats((prev) => [...prev, msg]));
        return () => {
            socket.off("chat");
            socket.off("message");
        };
    }, []);

    useEffect(() => {
        endofmessage.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    const addmessage = (chat) => {
        const newchat = { username: user, message: chat };
        socket.emit("newmessages", newchat);
    };

    const handleSummarize = async () => {
        if (chats.length === 0) {
            alert("No messages to summarize");
            return;
        }
        setIsLoading(true);
        try {
            const textData = chats.map(c => `${c.username}: ${c.message}`).join("\n");
            const response = await fetch("https://dncc.onrender.com/summarizer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ textData })
            });
            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            console.error("Summarizer error:", err);
            setSummary("❌ Failed to generate summary");
        } finally {
            setIsLoading(false);
        }
    };

    const Senderchat = ({ message, username }) => (
        <div className='senderchat'>
            <p><strong>{username}</strong> <br />{message}</p>
        </div>
    );

    const Recieverchat = ({ username, message }) => (
        <div className='recieverchat'>
            <p><strong>{username}</strong> <br />{message}</p>
        </div>
    );

    return (
        <div className='chatcontainer'>
            <div className='chat'>
                {chats.map((c, i) =>
                    c.username === user
                        ? <Senderchat key={i} message={c.message} username={c.username} />
                        : <Recieverchat key={i} message={c.message} username={c.username} />
                )}
                <div ref={endofmessage} />
            </div>

            <button onClick={handleSummarize} disabled={isLoading} className='btn-summ' style={{ margin: "10px" }}>
                {isLoading ? "Ai..." : "Ai"}
            </button>

            {summary && (
                <div className='summary-box'>
                    <h4>📝 Chat Summary:</h4>
                    <p>{summary}</p>
                </div>
            )}

            <Inputchat addmessage={addmessage} />
        </div>
    );
};

export default Chat;
