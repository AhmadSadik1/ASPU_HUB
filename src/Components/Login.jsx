import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import HeaderApp from './HeaderApp/HeaderApp';

export default function Login() {
    const [email , setemail] =useState();
    const [password , setpassword] =useState();

 
              axios.post ("url" , {"email" : email , "password" : password})
       .then(res => console.log(res))
            const SendData = (event) =>{
                event.preventDefault();
            }
                 
  return (
        <div className='register'>
    <div className='Welcome'>
    <div className="circle yellow-circle"></div>
    <div className="circle blue-circle"></div>
<h2 className='Title'>Welcome to ASPU hub</h2>
<p className='explain'>Lorem ipsum dolor sit amet consectetur adipisicing elit
    . Asperiores, aliquam ab dolores quod atque excepturi 
ut aperiam commodi veritatis tempore architecto ipsum, 
    repellendus ullam. Sit sint rerum quibusdam. Labore, aspernatur?
    asdoasjudklashdjkashjkdhsajhdjakshdkjashdasjkhdjskahdjkashdjkashd
    </p>            
    </div>

    <div className='Accounts-Log'>
        <h1 className='Title'>Hello Again</h1>
        <h3 className='space'>Please enter Your
        <br/> 
    Email and Password
         </h3>
         <form onSubmit={()=>SendData(event)}>
        <input className='same-Log' type='text' placeholder='Email' 
         onChange={(event)=>setemail(event.target.value)}
         required
         />

        <input className='same-Log' type="Password" placeholder='Password' 
         onChange={(event)=>setpassword(event.target.value)}
         required
         />

        <div className='Forget'>
        <Link to='/Forget'><p>Forget Your Password ?</p></Link>
         <p>Keep LogIn</p>
         <input type="checkbox"/>
        </div>
        <Link to='/login/Home'>
        <button className='Login-Btn'>Login</button>
        </Link>

        </form>
   <footer>
      Dont Have an Account ?
      <Link to='/'>Register</Link>
    </footer>

        </div>
        </div>
  )
}

