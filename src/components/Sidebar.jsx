import React, { useEffect, useState } from 'react';
import { albumsData, artistData, assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { handleTabClick } from '../tabUtils';
import { useSidebarLeft } from '../context/SidebarLeftContext';

function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarLeft();

  const [combinedData, setCombinedData] = useState([]); // State for shuffled data

  const navigate = useNavigate();

  useEffect(() => {
    // Apply tab click logic (assumed to be handled elsewhere)

    // Function to shuffle the data (unchanged)
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Combine and shuffle artists and albums (unchanged)
    const shuffledData = shuffleArray(
      artistData.map((item) => ({ ...item, type: 'artist' }))
        .concat(
          albumsData.map((item) => ({ ...item, type: 'album' }))
        )
    );

    setCombinedData(shuffledData);
  }, []); // Runs only on component mount

  return (
    <div
      className={`mt-2  scale2 transition-all duration-300 ease-in-out md:block hidden
        transform bg-[#121212] mr-3 sticky h-full rounded scrollbar-hidden  ${
        isSidebarCollapsed ? 'translate-x-0 overflow-hidden '  : 'translate-x-1 overflow-auto min-w-[20%]'
        
      }`}
    >
      <div className='scale2 p-4 flex items-center justify-between'>
        <div  onClick={toggleSidebar}  className='scale2 flex items-center gap-3 cursor-pointer brightness-75 hover:brightness-100'>
          <img className='w-8' src={assets.stack_icon} alt="" />
          <p className={`scale2 font-semibold text-white ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            Your Library
          </p>
        </div>
        <div className='scale2 flex items-center gap-3'>
          <img className={`w-5 ${isSidebarCollapsed ? 'hidden' : 'block'}`} src={assets.arrow_icon} alt="" />
          <img className={`w-5 ${isSidebarCollapsed ? 'hidden' : 'block'}`} src={assets.plus_icon} alt="" />
        </div>
      </div>

      {/* Render shuffled data (unchanged) */}
      {combinedData.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            item.type === 'album'
              ? navigate(`/album/${item.id}`)
              : navigate(`/artist/${item.id}`)
          }
          className="scale2 p-3  group items-center hover:bg-[#242424] rounded font-semibold flex items-start justify-start gap-1 pl-4 cursor-pointer"
        >
          <div className={`relative ${isSidebarCollapsed ? 'w-12 h-12' : 'w-12 h-12'}`}>
            <div
              className={`w-full h-full ${item.type === 'artist' ? 'group-hover:bg-[#12121280]' : ''}`}
            >
              <img
                className={`${isSidebarCollapsed ? 'pl-10' : 'pl-10'}group-hover:opacity-50 absolute w-full h-full p-[1%] ${
                  item.type === 'artist' ? 'rounded-full' : 'rounded'
                }`}
                src={item.image}
                alt={item.name}
              />
            </div>
            <img
              className={`hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2`}
              src={assets.play_icon}
              alt="Play Icon"
            />
          </div>
          <div className={`flex flex-col ml-2 justify-center ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            <h1 className='text-white'>{item.name}</h1>
            <p className="font-bold text-[#6f7371] text-xs mt-0.3">    {item.type === 'album' ? 'Album' : 'Artist'}
          </p>
        </div>
      </div>
    ))}
    <div className='h-20'></div>
  </div>
);
}
export default Sidebar;