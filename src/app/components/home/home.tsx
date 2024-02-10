import './home.css';
import React, { useEffect } from 'react';
import { useContext ,useMemo, useState, ChangeEvent} from 'react';
import { ChatContext } from '@/context/contextapi';
import Link from 'next/link';
import { io } from "socket.io-client";
import {useRouter} from 'next/navigation'
import axios from 'axios';

function Homeplay (){

    const [room,setuserroom] = useState("")
    const [name,setname] = useState("")

    // const socket = useMemo(
    //     () =>
    //       io("http://localhost:8080", {
    //         withCredentials: true,
    //       }),
    //     []
    //   )
    

    const data = useContext(ChatContext);
   const router  = useRouter();

    const handleclick =()=>{
       data?.openlog(true);
    }

    const openchat = async () =>{
       if(!(room && name)){
        alert("All the fields are required !")

       }

       else{
        const newroom = await (await axios.post('http://localhost:8080/roomapi/findroom',{id: room })).data
        if(newroom._id){

           
            router.push(`/chat?room=${newroom._id}&name=${name}&roomname=${newroom.roomname}`)
        }
        else{
            alert("Unable to find the room !, try again with the correct room id.")
        }
       }
    }

    const openbot = () =>{
       
    }

    const handleroom = (e:ChangeEvent<HTMLInputElement>) =>{
      setuserroom(e.target.value)
       
    }

    const handlename = (e:ChangeEvent<HTMLInputElement>) =>{
      setname(e.target.value)
       
    }



    const joinRoomHandler = () => {
    
      
        alert("joined")
      
      
        
      };

    useEffect(()=>{

       
    },[])

    return(
        <div className="home">
       
            <div id="logo">
                <img src="/images/logo.jpeg" alt="" />
            </div>

            <h1>Projectyle <span>.chat</span></h1>

            <div className="box" onClick={handleclick}>
                <div className="chotu">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
                </div>
                <h2>Create a Room</h2>
            </div>
                <h4>Already having a room ? Join it by the Id</h4>
            <div className="join">
                <input type="text" placeholder='&nbsp; Enter room Id' onChange={handleroom}/>    
                <input type="text" placeholder='&nbsp; Enter your name  ' onChange={handlename}/>    
                <button onClick={openchat}>Join</button>
            </div> 

            {/* <Link href={`/chat?room=${room}&name=${name}`}>
            <div className="bot">
                <div className="botimg">
                    <img src="/images/img2.jpeg" alt="" />
                </div>
                <h2>Start Chatting with your friends</h2>
            </div>
            
            </Link> */}

            <Link href={'/bot'}>
            <div className="bot" onClick={openbot}>
                <div className="botimg">
                    <img src="/images/img5.jpg" alt="" />
                </div>
                <h2>Chat with our Chatbot</h2>
            </div>
            </Link>  

        </div>
    )
}

export default Homeplay;