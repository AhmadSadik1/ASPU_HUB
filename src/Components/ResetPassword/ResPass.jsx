import React from 'react'
import { Link } from 'react-router-dom' ;
import { useState } from 'react';

export default function ResPass() {
  const steps = 3; // Number of steps
    const [activeStep, setActiveStep] = useState(2); 
     
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
    <div className='Forget-Password'>
    <h1>PassWord Reset Code</h1>
    <p className='Did'>
       Please enter the 6-digit code <br />
       to reset your password
    </p>
    <input type="password" placeholder='Code' className='Re-email' required />
    <p className='Did'>Didn`t Recieve a code ?</p>
    <Link to='/NewPass'>
    <button className='Next-step'>Next</button>
    </Link>

{/*   THE STEPS */}


    <div style={{marginTop :'45px' , gap :'22px' , width :"265px"}} className="flex items-center justify-center space-x-4 mt-10">
      {[...Array(steps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 w-16 rounded-full transition-colors duration-300 ${
            activeStep - 1 === index
              ? "bg-yellow-500"
              : "bg-yellow-200"
          }`}
        ></div>
      ))}
    </div>
    </div>
    </div>
)
  }