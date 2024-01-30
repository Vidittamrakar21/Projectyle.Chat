import './chat.css';
import React from 'react';
function Chatpage (){

    return(
        <div className="chat">

            <div id="room">
                <div id="logo">
                    <img src="/images/img2.jpeg" alt="" />
                </div>
                <h2>Sweet Family</h2>
            </div>


            <div id="chatbox">
                <div className="msg">
                    <p><span>Vidit</span>hi</p>
                </div>
                <div className="msg dm">
                <p><span>Me</span> hiii how are you ggbkf gvkshkjv kvhksdfjgvhkgvhkhk hjhjkvkjfrfvchsfhekkhekj  hvchehufhdfsdvksk vjhvkhvkkfhksdh vkhshsfkh kvhskjhf kkfkkfh khkfhsf</p>
                </div>
                
            </div>
            <div id="inpbox">
                
                <input type="text" placeholder='&nbsp; Type Something..' />
                <button>Send</button>
            </div>
        </div>
    )
}

export default Chatpage;