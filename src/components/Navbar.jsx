import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className='w-full flex justify-between items-center font-semibold'>
            <div className='flex items-center gap-2 '>
                <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                <img onClick={()=>navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
            </div>
          
          {/*  <div className='flex items-center '>
                      <div className='bg-black p-2.5 px-12 rounded-full flex font-semibold '>
                       
                      <img className='w-7 mr-4 bg-[#121212] ' src={assets.search_icon} alt="" />
                        <input className='bg-transparent border-none focus:outline-none' type="text" placeholder='What you want to listen?'/>
                      </div>
            </div>*/}
            
            <div className='flex items-center gap-4 '>
                <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'> Explore premium</p>
                <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
                <div className='cursor-pointer w-12 flex items-center justify-center mt-1  transform-scale-90 transition-all duration-300 ease-in-out hover:brightness-200	 hover:scale-100'>
                <img  src={assets.notification_bell_icon} alt="" />
                </div>
                <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center p-2  '>DC</p>
            </div>

        </div>
      


    </>
  )
}

export default Navbar