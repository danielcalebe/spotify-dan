// SidebarRight.jsx
import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import { assets } from '../assets/assets';

function SidebarRight() {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    
    <div>
      <div
        className={`fixed top-0 right-0 w-[18%] h-full flex-col gap-2 text-white px-3 py-2 ml-10
            transition-all duration-300 ease-in-out transform ${
          isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
        }`}

      >
   
   


    
               <div className=' bg-[#121212] h-[90%] rounded flex flex-col justify-around'>
          
   
   
                   </div>
   
           </div>
      </div>
   
  );
}

export default SidebarRight;
