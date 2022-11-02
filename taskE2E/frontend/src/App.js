import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import Encyption from "./enc";

import crypt from 'cryptico-js'
import { Mkey } from "./enc";

// to establish connection
const socket = io('http://localhost:4000')
// generate user name
const userName = 'User_'+parseInt(Math.random()*10)

function App() {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [publicKey,setPublickey] = useState([])
  const [friend,setFriend] = useState("")

  socket.on('message', payload => {
    // console.log(Mkey)
    let Dmsg = crypt.decrypt(payload.msg, Mkey)

    // console.log("message from server",payload, Dmsg)
    setChat([...chat, {userName:payload.userName, msg: Dmsg.plaintext}])
  })

  socket.on("new_user",data=> {
      setPublickey([...data])
  })


  useEffect(() => {
    socket.connect()

  },[])
  useEffect(() => {
    let cp =  publicKey.find(data => data.userName !== userName)
    if(cp){
      setFriend(cp.userName)
    }
  }, [publicKey])


  const sendMessage = (e) => {
    e.preventDefault();
    console.log(publicKey,friend)

    let key = publicKey.find(data=>data.userName===friend)
    if(!key || key.userName === userName){
      console.log("No other user joined")
      return
    }

    let Emsg = crypt.encrypt(message, key.publicKey)
    console.log(Emsg,key)
    socket.emit('message',{userName, msg: Emsg.cipher})
    setMessage('')
  };
  return (
    <div className="App">
      <h1>Welcome to chat app</h1>
      <h1> {userName}</h1>
      <Encyption socket={socket}  userName={userName}/>
      <select onChange={(e)=>setFriend(e.target.value)}>
      {publicKey.map((data,i)=><option key={i} value={data.userName}>{data.userName}</option>)}
      </select>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button type='submit'>Send</button>
      </form>

      {chat.map((payload, index)=>{
        return(
          <h3 key={index}>{payload.userName}: <span>{payload.msg}</span></h3>
        )
      })}
    </div>
  );
}

export default App;
