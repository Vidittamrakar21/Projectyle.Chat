import { ChatContext } from '@/context/contextapi';
import './card.css';
import React from 'react';
import { useRef,useState, useContext, RefObject } from 'react';




function Card (){

    const data = useContext(ChatContext);
   

    const ava1: RefObject<HTMLDivElement> = useRef(null)
    const ava2: RefObject<HTMLDivElement>  = useRef(null)
    const ava3: RefObject<HTMLDivElement>  = useRef(null)
    const ava4: RefObject<HTMLDivElement>  = useRef(null)

   
    const [c ,m] = useState(true)
    const [isconfirm ,setconfirm] = useState(false)

 

    const mark = (x: RefObject<HTMLDivElement | null>)=>{
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

        }
        else if(x === ava2){
            currentDiv.style.border = '2px solid coral';
            dava1.style.border = 'none';
            dava3.style.border = 'none';
            dava4.style.border = 'none';

        }
        else if(x === ava3){

            currentDiv.style.border = '2px solid coral';
            dava2.style.border = 'none';
            dava1.style.border = 'none';
            dava4.style.border = 'none';
        }
        else if(x === ava4){
            currentDiv.style.border = '2px solid coral';
            dava2.style.border = 'none';
            dava3.style.border = 'none';
            dava1.style.border = 'none';
        }
       
        }
       
    }

    const handleclick = () =>{

     setconfirm(true)
    }

    const handleconfirm = () =>{

     data?.openopt(false);
     setconfirm(false)
    }

    return(
        <div className={data?.opt?"outer": "gayab"}>
            {!isconfirm? <div className="dibba">
                <div id="avatars">
                    <div className={c?"ava light": "ava"} ref={ava1} onClick={()=>{mark(ava1)}}> <img src="/images/img1.jpeg" alt=""/></div>
                    <div className="ava" ref={ava2} onClick={()=>{mark(ava2)}}> <img src="/images/img2.jpeg" alt="" /></div>
                    <div className="ava" ref={ava3} onClick={()=>{mark(ava3)}}> <img src="/images/img3.jpeg" alt="" /></div>
                    <div className="ava" ref={ava4} onClick={()=>{mark(ava4)}}> <img src="/images/img4.jpeg" alt=""/></div>
                </div>
                <input type="text" placeholder='&nbsp; Give a name for your room'/>
                <input type="text" placeholder='&nbsp; Enter Admin name'/>
                <button onClick={handleclick}>Create</button>
            </div> :  <div className="dibba">
                <div id="tars">
                    <h2>Room Created Successfully !</h2>
                </div>

                <div id="tars">
                    <h2>Room ID - 545dsg24sg4 </h2>
                </div>
                
                <button onClick={handleconfirm}>Done</button>
            </div>}

           

    </div>
    )
}


export default Card;