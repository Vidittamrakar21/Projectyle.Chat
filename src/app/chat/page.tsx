"use client"

import './chat.css';
import React ,{useMemo,useEffect, useState, ChangeEvent,useContext}from 'react';
import { ChatContext } from '@/context/contextapi';
import { io } from "socket.io-client";
import { useRouter ,useSearchParams} from 'next/navigation';

function Chatpage (){
  
  const router = useRouter()
  const data = useContext(ChatContext);
  const searchparams = useSearchParams()
  const [userb, openuser] = useState(false);
  const room = searchparams.get('room')
  const name = searchparams.get('name')

  type chat =  {
    from: string | null,
    msg: string | null
  } 

    const [stat,setstatus] = useState(`${name} is typing...`)
    const [m,g] = useState("")
    const [message,setmsg] = useState("")
    // const [room, setroom] = useState("")
    const [typee, settype] = useState("")
    const [chats, setchats] = useState<chat[] | []>([])
    const [mychats, setmychats] = useState({} )
    const [state,setstate] = useState<string[]>([])

    const socket = useMemo(
      () =>
        io("http://localhost:8080", {
          withCredentials: true,
        }),
      []
    )

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
            setmychats({from: name, msg: e.target.value})
            console.log(mychats)
        }
        
      };

      const sendmessage = ()=>{
        setchats((messages) => [...messages, {from: name, msg: message}]);
        socket.emit("status", { m,room });
        socket.emit("message", { mychats,room });
        setmsg("")
      }

      const joinRoomHandler = () => {
    
        socket.emit("join-room", room);
        
      };

      const openuserbox = ()=>{
        openuser(!userb)
      }
      const closeuserbox = ()=>{
        openuser(false)
      }
   
      
      useEffect(() => {

          // setroom(`${data?.room}`)
          // console.log(data?.room)
          console.log(socket)
          socket.emit("chatstart", name);
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

         
            socket.on("user-joined", (data) => {
              console.log(data);
              setstate((messages) => [...messages, data]);
             
            });

            socket.on("active-user", (data) => {
              console.log(data);
              // setstate((messages) => [...messages, data]);
             
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
               <div id='typing'>
               <h2>Sweet Family</h2>
               <h4>{typee}</h4>
               </div>

               <h4 id='acu' onClick={openuserbox}>Active users</h4>
            </div>

            <div className={userb?"acubox":"gayab"}>

               <div className={"acuboxuser"}>
                  <div id='blue'>
                   </div>
                   <h3>Vidit</h3>
                </div>
              
            </div>
            <div id="chatbox" onClick={closeuserbox}>
              
                {state.map((item)=>(
                   <div id='joined'>
                   <div id='blue'>
                   </div>
                   <h3>{item}</h3>
                 </div>
                ))} 

                {chats.map((item,index)=>(
                     <div className={item.from=== name?"msg dm": "msg"} key={index}>
                     <p><span>{item.from=== name?"me":item.from}</span>{item.msg}</p>
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