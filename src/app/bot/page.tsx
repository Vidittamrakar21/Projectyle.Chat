"use client"
import './bot.css';
import React, {useState,useEffect, ChangeEvent} from 'react';

type chatarr = {
    from: string,
    msg: string
}

function Botpage (){

    const [msg1, setmsg1] = useState(false)
    const [msg2, setmsg2] = useState(false)
    const [chat, setchat ]= useState<chatarr[]>([])
    const [m, setm ]= useState('')

    useEffect(()=>{

        setTimeout(()=>{setmsg1(true)}, 800)
        setTimeout(()=>{setmsg2(true)}, 1500)
    },[])

    
    // const chatms = useRef()

    const handlemsg = (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setm(e.target.value)
    }

    const sendmsg = () =>{
        setchat(chat.concat({from: "me", msg: m }))
        setm("")
    }

    return(
        <div className="chat">

            <div id="room">
                <div id="logo">
                    <img src="/images/img5.jpg" alt="" />
                </div>
                <h2>Projectyle &apos;s Chat Bot</h2>
            </div>


            <div id="chatbox">
                <div className={msg1?"msg" : "gayab"}>
                    <p><span>Chat Bot</span>Hii , hope you are doing well !</p>
                </div>

                <div className={msg2?"msg" : "gayab"}>
                    <p><span>Chat Bot</span>How can I help you ?</p>
                </div>
                {/* <div className="msg dm">
                <p><span>Me</span> hiii how are you ggbkf gvkshkjv kvhksdfjgvhkgvhkhk hjhjkvkjfrfvchsfhekkhekj  hvchehufhdfsdvksk vjhvkhvkkfhksdh vkhshsfkh kvhskjhf kkfkkfh khkfhsf</p>
                </div> */}

                {chat.map((cht,index)=>(
                     <div className={cht.from === 'me'? "msg dm": "msg"} key={index}>
                     <p><span>{cht.from}</span>{cht.msg}</p>
                 </div>
                ))}
                
            </div>  
            <div id="inpbox">
                
                <input type="text" placeholder='&nbsp; Type Something..' onChange={handlemsg} value={m}/>
                <button onClick={sendmsg}>Send</button>
            </div>
        </div>
    )
}

export default Botpage;