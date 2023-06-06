import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Message from "../Message/Message";
import './Chat.css'

export default function Chat( {user} ) {
    const [chat, setChat] = useState();
    const readMessages = useRef(10);
    let lastMessageId = undefined;
    let lastReadMessages = undefined;
    const stopAutoScroll = useRef(false);
    const chatEndRef = useRef();

    const fetchChat = async () => {
        try {
            //console.log(`http://localhost:2000/messages?num=${readMessages.current}`)
            const response = await fetch(`http://localhost:2000/messages?num=${readMessages.current}`);
            const data = await response.json();

            /*
            if(data.length && lastMessageId === data[0].id && lastReadMessages === readMessages.current) {
                return;
            }
            lastMessageId = data[0].id;
            lastReadMessages = readMessages.current;
            */
            
            const content = await data.reverse().map((row) => {
                return (
                    <Message id={row.id} key={row.id} user={row.user} text={row.text} date={row.date} sameUser={row.user===user}></Message>
                );
            });
            
            setChat(content);
            console.log("chat fetched");
        }

        catch(error) {
            console.log(error);
        }
    }          

    useEffect(() => {
        fetchChat();
    }, []);

    useEffect(() => {
        if (!stopAutoScroll.current) {
            chatEndRef.current?.scrollIntoView({behavior: "smooth", block: 'center', inline: 'start'});
        }
    }, [chat]);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchChat();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function handleScroll(e) {
        if (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) >= 0.9)
            stopAutoScroll.current = false;
        else
            stopAutoScroll.current = true;

        if (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) <= 0.02) {
            //console.log(e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight));
            readMessages.current += 5;          
        }
    }

    return (
        <div className="chatContainer" onScroll={handleScroll}>
          {chat}
          <div ref={chatEndRef} style={{float: "left"}}></div>
        </div>
    );
}