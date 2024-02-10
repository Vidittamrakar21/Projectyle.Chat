import { ChatContext } from '@/context/contextapi';
import './card.css';
import React from 'react';
import { useRef,useState, useContext, RefObject } from 'react';
import axios from 'axios';




function Card (){

    const data = useContext(ChatContext);
   

    const ava1: RefObject<HTMLDivElement> = useRef(null)
    const ava2: RefObject<HTMLDivElement>  = useRef(null)
    const ava3: RefObject<HTMLDivElement>  = useRef(null)
    const ava4: RefObject<HTMLDivElement>  = useRef(null)
    const roomname: RefObject<HTMLInputElement>  = useRef(null)
    const name: RefObject<HTMLInputElement>  = useRef(null)

   
    const [c ,m] = useState(true)
    const [isconfirm ,setconfirm] = useState(false)
    const [imgurl ,setimg] = useState("/images/img1.jpeg");
    const [id ,setid] = useState("");

 

    const mark = (x: RefObject<HTMLDivElement | null>, y: string)=>{
        m(false);
        const currentDiv = x.current as HTMLDivElement | null;
        const dava1 = ava1.current as HTMLDivElement | null;
        const dava2 = ava2.current as HTMLDivElement | null;
        const dava3 = ava3.current as HTMLDivElement | null;
        const dava4 = ava4.current as HTMLDivElement | null;
        if(currentDiv !== null && dava2 !== null && dava1 !== null && dava3 !== null && dava4 !== null){

        if(x === ava1){
            currentDiv.style.border = '2px solid coral';
            dava2.style.border = 'none';
            dava3.style.border = 'none';
            dava4.style.border = 'none';
            setimg(y)

        }
        else if(x === ava2){
            currentDiv.style.border = '2px solid coral';
            dava1.style.border = 'none';
            dava3.style.border = 'none';
            dava4.style.border = 'none';
            setimg(y)

        }
        else if(x === ava3){

            currentDiv.style.border = '2px solid coral';
            dava2.style.border = 'none';
            dava1.style.border = 'none';
            dava4.style.border = 'none';
            setimg(y)
        }
        else if(x === ava4){
            currentDiv.style.border = '2px solid coral';
            dava2.style.border = 'none';
            dava3.style.border = 'none';
            dava1.style.border = 'none';
            setimg(y)
        }
       
        }
       
    }

    const handleclick = async() =>{

        if(!(roomname.current?.value && name.current?.value)){
            alert("All the fields are required !")
        }
        else{
            const newroom = await (await axios.post('http://localhost:8080/roomapi/createroom',{roomname: roomname.current.value, adminname: name.current.value, imageurl: imgurl})).data;
            if(newroom){
                console.log("rooom",newroom);
                setid(newroom._id);
                setconfirm(true)
            }
        }

     
    }

    const handleconfirm = () =>{

     data?.openopt(false);
     setconfirm(false)
    }

    const [copied, iscopy] = useState(false);

    const copytext = () =>{
        navigator.clipboard.writeText(id)
        iscopy(true);
    }

    return(
        <div className={data?.opt?"outer": "gayab"}>
            {!isconfirm? <div className="dibba">
                <div id="avatars">
                    <div className={c?"ava light": "ava"} ref={ava1} onClick={()=>{mark(ava1,"/images/img1.jpeg")}}> <img src="/images/img1.jpeg" alt=""/></div>
                    <div className="ava" ref={ava2} onClick={()=>{mark(ava2,"/images/img2.jpeg")}}> <img src="/images/img2.jpeg" alt="" /></div>
                    <div className="ava" ref={ava3} onClick={()=>{mark(ava3,"/images/img3.jpeg")}}> <img src="/images/img3.jpeg" alt="" /></div>
                    <div className="ava" ref={ava4} onClick={()=>{mark(ava4,"/images/img4.jpeg")}}> <img src="/images/img4.jpeg" alt=""/></div>
                </div>
                <input type="text" placeholder='&nbsp; Give a name for your room' ref={roomname}/>
                <input type="text" placeholder='&nbsp; Enter Admin name' ref={name}/>
                <button onClick={handleclick}>Create</button>
            </div> :  <div className="dibba">
                <div id="tars">
                    <h2>Room Created Successfully !</h2>
                </div>

                <div id="tars">
                    <h2>Room ID - {id} </h2>

                    {!copied?  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="coral" onClick={copytext}  viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                        </svg>: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="coral"  viewBox="0 0 16 16">
                       <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                    </svg>}
                   
                        
                </div>
                
                <button onClick={handleconfirm}>Done</button>
            </div>}

           

    </div>
    )
}


export default Card;