import React, {useState, useEffect} from "react";
import crypt from 'cryptico-js'
// const fs = require('fs')
let secret = 'secret_'+parseInt(Math.random()*10)

export let Mkey = crypt.generateRSAKey(secret,1024)
function Encyption ({socket,userName}) {

    let msg = ' this one is encrypted'

    let Pubkey = crypt.publicKeyString(Mkey)

    let Emsg = crypt.encrypt(msg, Pubkey)
    let Dmsg = crypt.decrypt(Emsg.cipher, Mkey)

    // console.log('working', Pubkey)

    // module.export(Pubkey)

   useEffect(( ) => {
    handleSubmit()
   }, [])


    const handleSubmit = (e) => {

        socket.emit("join",{userName:userName,publicKey:Pubkey})
    }

    return(
        <div>

        </div>
    )
}

export default Encyption;
