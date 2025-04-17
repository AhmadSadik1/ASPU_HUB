import { Profiler, useState } from 'react'
import './App.css'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Forget from './Components/Forget'
import ResPass from './Components/ResetPassword/ResPass'
//import NewPass from './Components/NewPass/NewPass'
import Home from './Components/Home/Home'
import Verify from './Verify'
import Profile from './Components/profile/Profile'
function App() {

return (
  <Routes>
<Route path='/' element ={<Register />} />
<Route path='/login' element ={<Login />} />
<Route path='/login/Home' element ={<Home/>} />
<Route path='/Profile' element ={<Profile/>} />
<Route path='/Forget' element ={<Forget/>} />
<Route path='/ResPass' element ={<ResPass/>} />

{/*
<Route path='/NewPass' element ={<NewPass/>} />
*/}

  <Route path='/Verify' element ={<Verify />} /> 
 </Routes>
  
)

}

export default App
