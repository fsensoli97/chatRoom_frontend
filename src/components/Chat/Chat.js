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
    const scrollPosition = useRef(1.0);
    const sameLastMessage = useRef(false);

    const fetchChat = async () => {
        try {
            //console.log(`http://localhost:2000/messages?num=${readMessages.current}`)
            const response = await fetch(`http://localhost:2000/messages?num=${readMessages.current}`);
            const data = await response.json();

            sameLastMessage.current = (lastMessageId === data[0].id);
            if(data.length && lastMessageId === data[0].id && lastReadMessages === readMessages.current) {
                //return;
            }
            lastMessageId = data[0].id;
            lastReadMessages = readMessages.current;
            
            const content = await data.reverse().map((row) => {
                return (
                    <Message className="messageContainer" id={row.id} key={row.id} user={row.username} text={row.text} date={row.date} sameUser={row.username===user}></Message>
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
        /*
        if (scrollPosition.current >= 0.9 && !sameLastMessage.current) {
            chatEndRef.current?.scrollIntoView({behavior: "smooth", block: 'center', inline: 'start'});
        }
        */
    }, [chat]);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchChat();

            if (scrollPosition.current <= 0.8) {
                readMessages.current += 100;
            }

            const messagesCont = document.getElementsByClassName("chatContainer")[0];
            const messages = document.getElementsByClassName("messageContainer");
            //console.log(messagesCont.clientHeight + messagesCont.scrollTop, messages[messages.length - 1].offsetTop - messages[messages.length - 1].clientHeight)
            
            if (messagesCont.clientHeight + messagesCont.scrollTop >= messages[messages.length - 1].offsetTop - 1.5 * messages[messages.length - 1].clientHeight) {
                stopAutoScroll.current = false;
            }

        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function handleScroll(e) {
        /*
        if (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) >= 0.98) {
            //console.log(e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight));
            stopAutoScroll.current = false;
        }
        else
            stopAutoScroll.current = true;
        */

        scrollPosition.current = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);

        stopAutoScroll.current = true;

        //console.log(e.target.scrollTop, e.target.scrollHeight, e.target.clientHeight);

        if (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) <= 0.02) {
            //console.log(e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight));
            //readMessages.current += 5;          
        }
    }

    return (
        <div className="chatContainer" onScroll={handleScroll}>
          {chat}
          <div ref={chatEndRef} style={{float: "left"}}></div>
        </div>
    );
}