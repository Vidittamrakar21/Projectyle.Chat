"use client"

import './chat.css';
import React ,{useMemo,useEffect, useState, ChangeEvent,useContext, KeyboardEvent}from 'react';
import { ChatContext } from '@/context/contextapi';
import { io } from "socket.io-client";
import { useRouter ,useSearchParams} from 'next/navigation';
import EmojiPicker , {Theme}from 'emoji-picker-react';
import axios from 'axios';

// let room: string;

function Chatpage (){

  type Item = {
    name: string
    room: string
    id: string
  }
 
  const router = useRouter()
  const data = useContext(ChatContext);
  const searchparams = useSearchParams()
  const [userb, openuser] = useState(false);
  const roomid = searchparams.get('room')
  const name = searchparams.get('name')
  // let room: string;
  const room= searchparams.get('roomname')

  type chat =  {
    from: string | null,
    msg: string | null
  } 

    const [stat,setstatus] = useState(`${name} is typing...`)
    const [m,g] = useState("")
    const [message,setmsg] = useState("")
    // const [room, setroomo] = useState("")
    const [typee, settype] = useState("")
    const [chats, setchats] = useState<chat[] | []>([])
    const [mychats, setmychats] = useState({} )
    const [state,setstate] = useState<string[]>([])
    const [left,isleft] = useState<Item[]>([])
    const [active,isactive] = useState<Item[]>([{name: "",room: "", id:""}])

    const socket = useMemo(
      () =>
        io("https://projectyle-chat-backend.vercel.app"),
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
    
      
          socket.emit("join-room", {room, name});
        
        
      };

      const openuserbox = ()=>{
        openuser(!userb)
      }
      const closeuserbox = ()=>{
        openuser(false)
      }
   
      const [imagepath, seturl] = useState("");

      const findroom = async () =>{
        const newroom = await (await axios.post('https://projectyle-chat-backend.vercel.app/roomapi/findroom',{id: roomid })).data
        if(newroom){
            if(!(newroom.roomname === room && newroom._id === roomid)){
              alert("Invalid room!")
              router.push('/')
            }
            else{
              seturl(newroom.imageurl)

            }
        
          
        }
        else{
            alert("Unable to find the room ., try again !")
        }
    }

   
      
      useEffect(() => {

        let isMounted = true;
          // setroom(`${data?.room}`)
          // console.log(data?.room)
          console.log(socket)
          socket.emit("chatstart", name);

          if(isMounted){
            // findroom()
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
             
                isleft(data);
              // isleft((messages) => [...messages, data]);
              }
             
            });

            socket.on("my-name", (data) => {
              if(isMounted){
                // console.log("myname",data);
                // isactive((messages) => [...messages, data]);
             
              }
             
            });

            socket.on("active-user", (data) => {
              if(isMounted){
              console.log("allusers",data);
              // setstate((messages) => [...messages, data]);
              isactive(data);
              }
            });

            socket.on("leeft", (data) => {
              if(isMounted){
               console.log("current user",data)
               
               isactive(data);
                // isactive( active.filter(item => item !== data))
             
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
                    <img src={imagepath} alt="" />
                </div>
               <div id='typing'>
               <h2>{room}</h2>
               <h4>{typee}</h4>
               </div>

               <h4 id='acu' onClick={openuserbox}>Active users</h4>
            </div>

            <div className={userb?"acubox":"gayab"}>

              {active.map((item: Item , index)=>(
              
                <div className={item.room === room ? "acuboxuser": "gayab"} key={index}>
                 <div id='blue'>
                  </div>          
                 <h3>{item.name}</h3>
               </div>
              ))}
              
            </div>
            <div id="chatbox" onClick={closeuserbox}>

              <h3 id='cdel'>Chats will be deleted automatically after viewing.</h3>
              
                {state.map((item, index)=>(
                   <div id='joined' key={index}>
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

                 {left.length>0?left.map((item ,index)=>(
                   <div id='joined' key={index}>
                   <div id='red'>
                   </div>
                   <h3>{item.name} left {item.room}</h3>
                 </div>
                )): <></>} 
                
               
                
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