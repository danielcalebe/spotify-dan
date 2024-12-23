import React from 'react'
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {


    const navigate = useNavigate();
    return (
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>  {/*sidebar */}
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold'>Home</p>
                </div>


                <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.search_icon} alt="" />
                    <p className='font-bold'>Search</p>
                </div>

            </div>


            <div className='bg-[#121212] h-[100%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />

                    </div>


                </div>

                <div className='relative flex items-center justify-center gap-2 pl-3 mb-3 font-semibold'>
                    <button
                        id='arrow-left'
                        className=' hidden ml-2 absolute left-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center z-10 shadow-md'
                        onClick={() => {
                            const container = document.getElementById('scrollable-container');
                            const arrowRight = document.getElementById("arrow-right");
                            const arrowLeft = document.getElementById("arrow-left");

                            if (container) {
                                container.scrollBy({ left: -100, behavior: 'smooth' });

                                arrowRight.style.display = "inline"
                                arrowLeft.style.display = "none"
                            }
                        }}
                    >
                        <img className=' w-8 bg-[#242424] p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                    </button>

                    <div id='scrollable-container' className='flex gap-2 overflow-x-auto scrollbar-hide '>
                        <p className=' cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full'>Playlists</p>
                        <p className='cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full'>Podcasts</p>
                        <p className='cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full'>Albuns</p>
                        <p className='cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full'>Artists</p>
                    </div>

                    <button
                        id='arrow-right'
                        className=' absolute right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center z-10 shadow-md'
                        onClick={() => {
                            const container = document.getElementById('scrollable-container');
                            const arrowRight = document.getElementById("arrow-right");
                            const arrowLeft = document.getElementById("arrow-left");

                            if (container) {
                                container.scrollBy({ left: 100, behavior: 'smooth' });

                                arrowRight.style.display = "none"
                                arrowLeft.style.display = "inline"
                            }

                        }}
                    >
                        <img className='   w-8 bg-[#242424] p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
                    </button>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='m-2 ml-4 mb-4 cursor-pointer flex items-center justify-center rounded-full w-7 h-7 hover:bg-[#242424]'>
                        <img className='w-4 ' src={assets.search_icon} alt="" />
                    </div>

                    <div className='m-2 mb-4 flex items-center'>
                        <p className='whitespace-nowrap text-[#73777a] hover:text-white font-light '>Recents</p>
                        <img className='w-4 ml-2 mt-1' src={assets.ham_menu_icon} alt="" />

                    </div>
                </div>


                {/** <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                    <h1>Create your first playlist</h1>
                    <p className='font-light'>It's easy we will help you</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 '>Crate Playlist</button>
                </div> */}



                <div className='p-3 group items-center hover:bg-[#242424]    rounded font-semibold flex  items-start justify-start gap-1 pl-4'>
                    <div className='relative w-12 h-12 '>
                        <img className='rounded absolute w-full h-full' src={assets.liked_songs_icon} alt="Liked Songs" />

                        <img className='hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2' src={assets.play_icon} alt="Play Icon" />
                    </div>
                    <div className='flex flex-col ml-2 justify-center '>
                        <h1>Liked Songs</h1>
                        <p className='font-bold text-[#6f7371] text-xs	mt-0.3'>Playlist ● 55 songs</p>
                    </div>
                </div>

                <div className='p-3 group items-center hover:bg-[#242424]  rounded font-semibold flex  items-start justify-start gap-1 pl-4'>
                    <div className='relative w-12 h-12 '>
                        <img className='rounded absolute w-full h-full' src={assets.img3} alt="Liked Songs" />

                        <img className='hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2' src={assets.play_icon} alt="Play Icon" />
                    </div>
                    <div className='flex flex-col ml-2 justify-center '>
                        <h1>Nevermind</h1>
                        <p className='font-bold text-[#6f7371] text-xs	mt-0.3'>Album ● 40 songs</p>
                    </div>
                </div>


                <div className='p-3 group items-center hover:bg-[#242424]  rounded font-semibold flex  items-start justify-start gap-1 pl-4'>
                    <div className='relative w-12 h-12 '>
                        <img className='rounded-full absolute w-full h-full' src={assets.img11} alt="Liked Songs" />

                        <img className='hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2' src={assets.play_icon} alt="Play Icon" />
                    </div>
                    <div className='flex flex-col ml-2 justify-center '>
                        <h1>Deftones</h1>
                        <p className='font-bold text-[#6f7371] text-xs	mt-0.3'>Artist </p>
                    </div>
                </div>



                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                    <h1>Let's find some podacsts to follow</h1>
                    <p className='font-light'>We'll keep you update on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 '>Browse podcast</button>
                </div>
                

            </div>

        </div>


    )
}

export default Sidebar  