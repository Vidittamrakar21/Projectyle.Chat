"use client"

import './chat.css';
import React ,{useMemo,useEffect, useState, ChangeEvent,useContext, KeyboardEvent}from 'react';
import { ChatContext } from '@/context/contextapi';
import { io } from "socket.io-client";
import { useRouter ,useSearchParams} from 'next/navigation';
import EmojiPicker , {Theme}from 'emoji-picker-react';

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
    const [left,isleft] = useState<string[]>([])
    const [active,isactive] = useState<string[]>([`${name}`])

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

      const [isroom , setroom] = useState(true);

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

        let isMounted = true;
          // setroom(`${data?.room}`)
          // console.log(data?.room)
          console.log(socket)
          socket.emit("chatstart", name);

          if(isMounted){

            joinRoomHandler()
          }

          socket.on("receive-status", (data) => {
           if(isMounted){
            console.log(data);
            settype(data)
           }
            // setMessages((messages) => [...messages, data]);
          });

          socket.on("receive-message", (data) => {
            if(isMounted){
              console.log(data);
            setchats((messages) => [...messages, data]);
            }
          });

         
            socket.on("user-joined", (data) => {
              if(isMounted){
                console.log(data);
              setstate((messages) => [...messages, data]);

              socket.emit('send-name', {room, name});
              }
             
            });

            socket.on("user-left", (data) => {
              if(isMounted){
                console.log(data);
              isleft((messages) => [...messages, data]);
              }
             
            });

            socket.on("my-name", (data) => {
              if(isMounted){
                // console.log("myname",data);
                isactive((messages) => [...messages, data]);
             
              }
             
            });

            socket.on("active-user", (data) => {
              console.log(data);
              // setstate((messages) => [...messages, data]);
             
            });

            socket.on("leeft", (data) => {
              if(isMounted){
               
                isactive( active.filter(item => item !== data))
             
              }
             
            });

            
            // socket.emit('user-disconnect', name)
            
           
          
            return () => {
              isMounted = false;
              socket.offAnyOutgoing()
              // Additional cleanup logic if needed
            };

       
      }, [socket]);
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

              {active.map((item)=>(
                 <div className={"acuboxuser"}>
                 <div id='blue'>
                  </div>
                  <h3>{item}</h3>
               </div>
              ))}
              
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

                 {left.map((item)=>(
                   <div id='joined'>
                   <div id='red'>
                   </div>
                   <h3>{item}</h3>
                 </div>
                ))} 
                
               
                
            </div>
            <div id="inpbox">
                {/* <EmojiPicker open={true} width={550} height={300}/> */}
                <input type="text" placeholder='&nbsp; Type Something..' onChange={handleSubmit} value={message}/>
                <button onClick={sendmessage} >Send</button>
            </div>
        </div>
    )
}

export default Chatpage;