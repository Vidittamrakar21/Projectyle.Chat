"use client"

import './chat.css';
import React ,{useMemo,useEffect, useState, ChangeEvent,MouseEvent}from 'react';
import { io } from "socket.io-client";
function Chatpage (){

    const [stat,setstatus] = useState("typing...")
    const [m,g] = useState("")
    const [message,setmsg] = useState("")
    const [room, setroom] = useState("myroom")
    const [typee, settype] = useState("")
    const [chats, setchats] = useState<string[]>([])

    const handleSubmit = async (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(e.target.value === ""){
            //  setstatus("")
             setmsg("")
            socket.emit("status", { m,room });
        }
        else{
            // setstatus("typing...")
            socket.emit("status", { stat,room });
            setmsg(e.target.value)
        }
        
      };

      const sendmessage = ()=>{
        
        socket.emit("status", { m,room });
        socket.emit("message", { message,room });
        setmsg("")
      }

      const joinRoomHandler = () => {
    
        socket.emit("join-room", room);
        
      };

    const socket = useMemo(
        () =>
          io("http://localhost:8080", {
            withCredentials: true,
          }),
        []
      )
      
      useEffect(() => {
          console.log(socket)
          socket.emit("chatstart", 'hiiii');
          joinRoomHandler()

          socket.on("receive-status", (data) => {
            console.log(data);
            settype(data)
            // setMessages((messages) => [...messages, data]);
          });

          socket.on("receive-message", (data) => {
            console.log(data);
            
            setchats((messages) => [...messages, data]);
          });
      
    
        // return () => {
        //   socket.disconnect();
        // };
      }, []);
    return(
        <div className="chat">

            <div id="room">
                <div id="logo">
                    <img src="/images/img2.jpeg" alt="" />
                </div>
               <div>
               <h2>Sweet Family</h2>
               <h4>{typee}</h4>
               </div>
            </div>


            <div id="chatbox">
                <div className="msg">
                    <p><span>Vidit</span>hi</p>
                </div>
                <div className="msg dm">
                <p><span>Me</span> hiii how are you ggbkf gvkshkjv kvhksdfjgvhkgvhkhk hjhjkvkjfrfvchsfhekkhekj  hvchehufhdfsdvksk vjhvkhvkkfhksdh vkhshsfkh kvhskjhf kkfkkfh khkfhsf</p>
                </div>

                {chats.map((msg)=>(
                     <div className="msg">
                     <p><span>Vidit</span>{msg}</p>
                 </div>
                ))}
                
            </div>
            <div id="inpbox">
                
                <input type="text" placeholder='&nbsp; Type Something..' onChange={handleSubmit} value={message}/>
                <button onClick={sendmessage}>Send</button>
            </div>
        </div>
    )
}

export default Chatpage;