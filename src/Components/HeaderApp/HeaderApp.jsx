'use client'
import './HeaderApp.css'
import { FaHome, FaRoad, FaClock, FaUser, FaSearch, FaBell,} from 'react-icons/fa'
import { MdGroups2 } from "react-icons/md";
import { Link } from 'react-router-dom';
export default function HeaderApp() {
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <div className="search-container">
            <input className="aheadLogo" placeholder="Search" />
            <span className="search-icon"><FaSearch /></span>
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/login/Home" className="text-gray-900 flex flex-col items-center text-sm font-semibold">
            <FaHome className="size-6" />
            <span>Home</span>
          </Link>
          <Link href="/Roadmap" className="text-gray-900 flex flex-col items-center text-sm font-semibold">
            <FaRoad className="size-6" />
            <span>Roadmap</span>
          </Link>
          <Link href="/Groups" className="text-gray-900 flex flex-col items-center text-sm font-semibold">
            <MdGroups2 className="size-6"/> 
            <span>Groups</span>
          </Link>
          <Link to="/Profile" className="text-gray-900 flex flex-col items-center text-sm font-semibold">
            <FaUser className="size-6" />
            <span>Account</span>
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-6 items-center">
          <button className="text-blue-900">
            <FaBell className="size-6" />
          </button>
          <button className="profile-btn">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Profile" />
          </button>
        </div>
      </nav>
    </header>
  )
}

