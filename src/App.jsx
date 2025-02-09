import { Profiler, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/profile/profile'
import Forget from './Components/Forget'
import ResPass from './Components/ResetPassword/ResPass'
import NewPass from './Components/NewPass/NewPass'
import Home from './Components/Home/Home'

function App() {

return (
  <Routes>
<Route path='/' element ={<Register />} />
<Route path='/login' element ={<Login />} />
<Route path='/login/Home' element ={<Home/>} />
<Route path='/Profile' element ={<Profile/>} />
<Route path='/Forget' element ={<Forget/>} />
<Route path='/ResPass' element ={<ResPass/>} />
<Route path='/NewPass' element ={<NewPass/>} />

 </Routes>
  
)

}

export default App
