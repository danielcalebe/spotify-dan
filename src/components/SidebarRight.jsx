import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarRightContext';
import { assets, songsData, artistData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

function SidebarRight({ activeContent, closeSidebar, isSongPage }) {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { playWithId, track, playStatus } = useContext(PlayerContext);

  const [artist, setArtist] = useState({ banner: "", name: "" });

  useEffect(() => {
    // Encontrar o artista com base no id_artist do track
    if (track) {
      console.log(track.id_artist)
      const artistInfo = artistData.find(artist => artist.id === track.id_artist); // Encontre o artista correspondente
      setArtist(artistInfo);
    }
  }, [track]); // Quando o track mudar, atualiza as informações do artista


  const nextTrack = songsData[(track.id + 1) % songsData.length];


  
  // Conteúdo para cada botão, agora com estrutura HTML
  const contents = {
    playingNow: (
      <div id='playingNow' className="w-full h-full ">
        <div className="p-2  w-full overflow-auto ">
          <div className="p-2 flex justify-between items-center">
            <p 
             className="cursor-pointer hover:underline p-1 text-[17px] font-bold">{track.author}</p>
            <div className="flex items-center justify-center gap-2">
              <p className="cursor-pointer tracking-tighter">. . .</p>
              <div
                onClick={() => closeSidebar()}
                className="rounded-full mt-2 flex justify-center hover:bg-[#242424] scale-hover"
              >
                <img
                  className="w-10 py-1 brightness-75 hover:brightness-100 cursor-pointer"
                  src={assets.close_icon}
                  alt="Close"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-2">
            <img className="rounded-xl w-full h-auto" src={track.image} alt="Track" />
            <div className="group p-2 pt-3 flex justify-between items-center">
              <div className="max-w-[70%] truncate">
                <h1
                  className="text-2xl font-bold cursor-pointer hover:underline whitespace-nowrap animate-marquee"
                  title={track.name}
                >
                  {track.name}
                </h1>
                <h3 onClick={() => navigate(`/artist/${track.id_artist}`)} className="brightness-75 text-lg cursor-pointer hover:brightness-100 hover:underline">
                  {track.author}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <img
                  title="Copy song link"
                  className="cursor-pointer w-4 h-4 brightness-hover -rotate-90 transition-all duration-300 hover:scale-110 hidden group-hover:block"
                  src={assets.arrow_icon}
                  alt="Arrow"
                />
                <img
                  className="cursor-pointer w-8 h-auto brightness-hover scale-hover"
                  src={assets.save_library_icon}
                  alt="Save"
                />
              </div>
            </div>

            <div className="w-full  p-10 bg-[#242424] relative h-[400px] rounded-xl overflow-hidden">
              {artist ? (
                <>
                  <img
                    className="rounded-t-lg left-0 top-0 absolute max-w-full"
                    src={artist.banner || assets.arrow_icon}
                    alt="Artist Banner"
                  />
                  <p className="p-1 text-[17px] font-extrabold shadow-black absolute left-2 top-2">
                    About the Artist
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Loading artist info...</p>
              )}

              <div className="mt-[45%] left-0 pl-2 flex  flex-col bg-[#242424] h-auto absolute ">
                <div>
                  <p className="p-1 text-[17px] font-bold absolute">
                    {artist ? artist.name : "Artist name not available"}
                  </p>
                </div>


                <div className="flex items-center justify-between mt-10">
                  <div className="brightness-75">
                    <p className="text-[17px] font-semibold">12,221,212</p>
                    <p className="text-[17px] font-semibold">monthly listeners</p>
                  </div>

                  <div className='mr-2'>
                    <button className="p-1 px-3 border border-white rounded-full font-bold 
                     scale-hover">
                      Follow
                    </button>
                  </div>

                </div>
                <p className='mt-2 p-1   brightness-75 text-ellipsis overflow-hidden line-clamp-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, aliquid atque! Illum iusto voluptates doloribus eaque vitae nostrum labore! Eos aut facere dolorum nisi enim sapiente, ex saepe blanditiis voluptatum!</p>
              </div>


            </div>

            <div className='mt-4 p-3 py-4 rounded-xl w-full bg-[#242424] h-full mb-10]'>
              <div className='flex justify-between'>
                <p className="cursor-pointer hover:underline p-1 text-[17px] font-bold">Credits</p>
                <p className='text-sm font-bold brightness-75 cursor-pointer scale-hover hover:brightness-100 hover:underline'>Show All</p>
              </div>

              <div className='flex justify-between ml-2 py-2  items-center'>
                <div>
                  <h2 onClick={() => navigate(`/artist/${artist.id}`)} className='font-bold text-lg cursor-pointer hover:underline'>{artist.name}</h2>
                  <p className=' brightness-75'>Main Artist</p>
                </div>

                <div className='cursor-pointer  '>
                  <p className="p-1 px-3  border border-white rounded-full font-bold 
                     scale-hover">
                    Follow
                  </p>
                </div>


              </div>

              <div className='flex justify-between ml-2 py-2  items-center'>
                <div>
                  <h2 className='font-bold text-lg '>Person 2</h2>
                  <p className=' brightness-75'>Producer</p>
                </div>

              </div>

              <div className='flex justify-between ml-2 py-2  items-center'>
                <div>
                  <h2 className='font-bold text-lg '>Person 3</h2>
                  <p className=' brightness-75'>Composer</p>
                </div>

              </div>




            </div>




            <div  className='mt-4 p-3 py-4 rounded-xl w-full bg-[#242424] mb-[90px] h-full mb-10]'>
              <div className='flex justify-between'>
                <p className=" p-1 text-[17px] font-bold">Next in queue</p>
                <p className='text-sm font-bold brightness-75 cursor-pointer scale-hover hover:brightness-100 hover:underline'>
                  Open queue
                </p>
              </div>

              <div
          key={track.id}

          className="mb-4 scale2 p-1 py-2 group items-center hover:bg-[#ffffff2b] rounded font-semibold flex items-start justify-start gap-1  cursor-pointer"
        >
          <div className='relative w-12 h-12 justify-between flex  '>
            <div
              className='w-full h-full '
            >
              <img
              
                onClick={() => { playWithId(nextTrack.id) }}
                className=' group-hover:opacity-50 absolute w-full h-full p-[1%] '
                src={nextTrack.image}
                alt={nextTrack.name}
              />
            </div>

            <img 
                onClick={(e) => {
                  e.stopPropagation();
                  playWithId(nextTrack.id);
                
                  document.getElementById('playingNow').scrollIntoView({ behavior: 'smooth' });
                
                }}
              className={`hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2`}
              src={track.id == nextTrack.id ? assets.pause_icon : assets.play_icon}
              alt="Play Icon"
            />

          </div>
          <div className='flex flex-col ml-2 justify-center '>
            <h1 className=''>{nextTrack.name} </h1>

            <a className="font-semibold brightness-50 text-sm mt-0.3 hover:brightness-100 hover:underline">{nextTrack.author}</a>

          </div>
          <div className='flex items-center absolute right-12'>
          <p className='scale-hover   cursor-pointer hidden group-hover:block text-[#ffffff80] tracking-tighter hover:text-white'>. . .</p>
          </div>
        </div>






              </div>

         




        </div>


      </div>


      </div >
    ),





  queue: (
    <div className='p-2 	'>
      <div className='p-2 flex justify-between items-center'>
        <div className='cursor-pointer py-2 px-1 rounded hover:bg-[#242424]'>
          <p className='p-1 text-[17px] font-bold'>Queue</p>
          <hr className='border-b-2 border-[#1db954]' />
        </div>
        <div className='group cursor-pointer py-2 px-1 rounded hover:bg-[#242424]'>
          <p className='text-[17px]  font-bold brightness-50 group-hover:brightness-100'>Recently played</p>
        </div>



        <div onClick={() => closeSidebar()} className='rounded-full   flex justify-center hover:bg-[#242424] scale-hover '>
          <img className=' w-10 py-1   brightness-75 hover:brightness-100 cursor-pointer ' src={assets.close_icon} alt="" />
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-[17px] font-bold p-3'>Now playing</p>
        <div
          key={track.id}

          className="mb-4 scale2 p-3 group items-center hover:bg-[#242424] rounded font-semibold flex items-start justify-start gap-1  cursor-pointer"
        >
          <div className='relative w-12 h-12 justify-between flex  '>
            <div
              className='w-full h-full '
            >
              <img
                onClick={() => { playWithId(track.id) }}
                className=' group-hover:opacity-50 absolute w-full h-full p-[1%] '
                src={track.image}
                alt={track.name}
              />
            </div>

            <img
              onClick={(e) => {
                e.stopPropagation();
                playWithId(track.id);
              }}
              className={`hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2`}
              src={playStatus == true ? assets.pause_icon : assets.play_icon}
              alt="Play Icon"
            />

          </div>
          <div className='flex flex-col ml-2 justify-center '>
            <h1 className='text-[#1db954]'>{track.name} </h1>

            <a onClick={() => navigate(`/artist/${track.id_artist}`)} className="font-semibold brightness-50 text-sm mt-0.3 hover:brightness-100 hover:underline">{track.author}</a>

          </div>

          
          <p className=' absolute right-8 cursor-pointer hidden group-hover:block tracking-tighter'>. . . <div className=""></div></p>
        </div>

      </div>



      <div>
  <p className="text-[17px] font-bold p-3">Next up</p>

  {songsData
    .slice(track.id + 1)
    .concat(songsData.slice(0, track.id))
    .filter((item) => item.id !== track.id)
    .map((item, index) => {
      const isPlayingCurrentSong = track.id === item.id; // Verifica se a música atual é esta
      return (
        <div
          key={index}
          className="scale2 p-3 group items-center hover:bg-[#242424] rounded font-semibold flex items-start justify-start gap-1 pl-4 cursor-pointer"
        >
          <div className="relative w-12 h-12">
            <div className="w-full h-full">
              <img
                onClick={() => playWithId(item.id)}
                className="group-hover:opacity-50 absolute w-full h-full p-[1%]"
                src={item.image}
                alt={item.name}
              />
            </div>

            <img
              onClick={(e) => {
                e.stopPropagation();
                playWithId(item.id); // Executa a função de tocar a música
               
              }}
              className={`hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2`}
              src={isPlayingCurrentSong ? assets.pause_icon : assets.play_icon}
              alt="Play Icon"
            />
          </div>
          <div className="flex flex-col ml-2 justify-center">
            <h1 className="text-white">{item.name}</h1>
            <a onClick={() => navigate(`/artist/${item.id_artist}`)}
              className="font-semibold brightness-50 text-sm mt-0.3
              hover:brightness-100 hover:underline"
            >
              {item.author}
            </a>
          </div>
          <p className="absolute right-8 cursor-pointer hidden group-hover:block tracking-tighter">
            . . . <div className=""></div>
          </p>
        </div>
      );
    })}
</div>
<div className='h-[100px]'></div>

    </div>
  ),







    newDevice:
  <div className='p-3 flex flex-col justify-around 	'>
    <div className='flex justify-between items-center'>
      <p className='text-[17px] font-bold'>Conect to a device</p>
      <div onClick={() => closeSidebar()} className='rounded-full   flex justify-center hover:bg-[#242424] scale-hover '>
        <img className=' w-10 py-1   brightness-75 hover:brightness-100 cursor-pointer ' src={assets.close_icon} alt="" />
      </div>
    </div>

    <div className=' p-2 bg-gradient-to-b from-[#162e1f]  to-[#121212] rounded-md   overflow-hidden mt-2 h-24 w-full bg-white'>
      <div className='flex  items-center'>
        <img className='w-12' src={assets.device_icon} alt="" />
        <h1 className='font-bold text-2xl	'>Current device</h1>
      </div>
      <h3 className='ml-2 text-lg font-semibold'>This computer </h3>


    </div>
    <div>
      <p className='text-[17px] font-bold pt-4'>Select another device</p>
      <div className='transition-all duration-700 ease-in-out p-2 rounded flex items-center justify-start cursor-pointer hover:bg-[#242424]'>
        <img className='w-12 pb-1 filter grayscale brightness-[200%] contrast-0 object-cover' src={assets.device_icon} alt="" />
        <h3 className=' text-md font-medium	 '>23021R422A</h3>
      </div>
    </div>

    <div className='mt-[80%] pb-24'>
      <div className='group transition-all duration-300 ease-in-out p-2 
          rounded flex items-center justify-between cursor-pointer hover:bg-[#242424]'>
        <a href='' className=' text-lg font-medium	group-hover:underline '>Don't see your device?</a>
        <img className='w-4 pb-1 filter grayscale  brightness-[200%] contrast-0 object-cover' src={assets.arrow_icon} alt="" />

      </div>

      <div className=' group transition-all duration-300 ease-in-out p-2 rounded flex items-center
           justify-between cursor-pointer hover:bg-[#242424]'>
        <a href='' className=' text-lg font-medium	group-hover:underline '>What can i connect to?</a>
        <img className='w-4 pb-1 filter grayscale brightness-[200%] contrast-0 object-cover' src={assets.arrow_icon} alt="" />

      </div>

    </div>
 
  </div>
};

return (
  <div>
    <div 
      className={`scrollbar-hidden mt-4 lg:flex hidden overflow-auto fixed top-14 pr-2 pb-10   right-0 w-[22%] max-h-screen 
          flex-col gap-2 text-white 
    transition-all duration-300 ease-in-out transform ${activeContent ? 'lg:translate-x-0 mr-2 ml-4' : 'lg:translate-x-full'}
    `}
    >

      <div id='barMe'  className="bg-[#121212] h-[100%] rounded flex flex-col">
        <div>{contents[activeContent] || "Selecione um botão no Player."}</div>
      </div>
    </div>

  </div>
);
}

export default SidebarRight;
