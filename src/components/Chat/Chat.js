import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Message from "../Message/Message";
import './Chat.css'

export default function Chat( {user} ) {
    const [chat, setChat] = useState();
    let lastMessageId = undefined;
    const stopAutoScroll = useRef(false);
    const chatEndRef = useRef();

    const fetchChat = async () => {
        try {
            const response = await fetch("http://localhost:2000/messages");
            const data = await response.json();
            /*
            if(data.length && lastMessageId === data[0].id) {
                return;
            }
            lastMessageId = data[0].id;
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
            chatEndRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [chat]);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchChat();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function handleScroll(e) {
        if (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) >= 0.9 )
            stopAutoScroll.current = false;
        else
            stopAutoScroll.current = true;
    }

    return (
        <div className="chatContainer" onScroll={handleScroll}>
          {chat}
          <div ref={chatEndRef} style={{float: "left"}}></div>
        </div>
    );
}