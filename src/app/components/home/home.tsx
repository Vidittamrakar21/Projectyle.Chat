import './home.css';
import React from 'react';
import { useContext } from 'react';
import Sign from '../sign/sign'
import { ChatContext } from '@/context/contextapi';
import Link from 'next/link';

function Homeplay (){

    const data = useContext(ChatContext);
   

    const handleclick =()=>{
       data?.openlog(true);
    }

    const openchat = () =>{
      
    }

    const openbot = () =>{
       
    }

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
                <input type="text" placeholder='&nbsp; Enter room Id'/>    
                <Link href={'/chat'}><button onClick={openchat}>Join</button></Link>
            </div>  
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