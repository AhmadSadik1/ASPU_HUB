import React, { useState } from "react";

import './Forget.css';
import { Link } from 'react-router-dom' ;
  const steps = 3; // Number of steps

export default function Forget() {
const [activeStep, setActiveStep] = useState(1); // Default active step is 1
    const handleNext = () => {
        setActiveStep((prevStep) => (prevStep < steps ? prevStep + 1 : 1)); // Loop back to step 1 after last step
      };
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
    <h1>foregt Password</h1>
    <p className='Did'>Did you forget your password ?
        <br />
        Don`t worry ... Enter your E-mail <br /> 
         we will send an mail 
         <br />
         to reset your password 
    </p>
    <input type="text" placeholder='Email' className='Re-email' required />
    <Link to='/ResPass'>
    <button className='Next-step'>Next</button>
    </Link>

    <div style={{marginTop :'35px' , gap :'22px' , width :"265px"}} className="flex items-center justify-center space-x-4 mt-10">
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
