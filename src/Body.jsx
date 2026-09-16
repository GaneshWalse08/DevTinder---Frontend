import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const Body = () => {
  return (
    <div 
      className="min-h-screen bg-[#080A0A] text-white">
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default Body