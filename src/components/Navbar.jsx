import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className='mb-2  w-full h-auto hidden justify-between items-center font-semibold 
      sm:flex 	 '>

        <div className='pl-4 flex items-center gap-2 md:mr-[20%] '>
          <img onClick={() => navigate("/")} className='cursor-pointer w-8 h-8' src={assets.spotify_logo_white} alt="" />
          <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
          <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
        </div>

        <div className="flex items-center gap-2 justify-center mt-2 w-[30%]">
  <div
    onClick={() => navigate('/')}
    className="cursor-pointer flex rounded-full bg-[#242424] p-2 justify-center hover:brightness-200 scale-hover"
  >
    <img className="w-10 h-auto" src={assets.home_icon} alt="" />
  </div>

  <div
    className="group flex items-center bg-[#242424] rounded-full p-3 w-[95%] justify-between h-12 border-[3px]
    border-transparent focus-within:border-white"
  >
    <div className="flex items-center justify-start gap-2">
      <img className="w-6 h-6 brightness-75" src={assets.search_icon} alt="" />

      <div className="relative">
        <input
          className="absolute bg-transparent border-none focus:outline-none text-white"
          type="text"
          onChange={handleInputChange}
        />
        <p
          className={`text-[#b0b0b0] font-normal sm:text-[0px] md:text-[10px] lg:text-[15px] ${
            inputValue ? 'invisible' : ''
          }`}
        >
          What you want to hear?
        </p>
      </div>
    </div>
    <div className="flex">
      <hr className="hidden sm:block w-[1.5px] h-8 bg-[#b0b0b0]" />
      <img
        className="min-w-10 max-w-10 cursor-pointer scale-hover"
        src={assets.browse_icon}
        alt=""
      />
    </div>
  </div>
</div>



        <div className='flex items-center pt-2 gap-4 '>
          <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer scale-hover'> Explore premium</p>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer text-white scale-hover'>Install App</p>
          <div className='scale-hover cursor-pointer w-12 flex items-center justify-center mt-1  scale-hover brightness-hover '>
            <img src={assets.notification_bell_icon} alt="" />
          </div>
          <p className='cursor-pointer bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center p-2 mr-2 '>DC</p>
        </div>

      </div>



    </>
  )
}

export default Navbar