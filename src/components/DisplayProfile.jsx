import React, { useContext, useEffect, useRef, useState } from 'react'
import { artistData, assets, songsData } from '../assets/assets'
import ArtistItem from './ArtistItem'
import { PlayerContext } from '../context/PlayerContext';

const DisplayProfile = () => {
  const artistsCarouselRef = useRef(null);
    const { playWithId, track, playStatus } = useContext(PlayerContext);







  const handleWheel = (e, carouselRef) => {
    if (carouselRef.current) {
      e.preventDefault();


      const scrollSpeed = 1;
      carouselRef.current.scrollLeft += e.deltaY * scrollSpeed;
    }
  };

  useEffect(() => {
    const artistsCarousel = artistsCarouselRef.current;


    if (artistsCarousel) {
      artistsCarousel.addEventListener('wheel', (e) => handleWheel(e, artistsCarouselRef), { passive: false });
    }


    if (artistsCarousel) {
      artistsCarousel.removeEventListener('wheel', (e) => handleWheel(e, artistsCarouselRef));
    }

  }, []);


  return (
    <div className='p-2 mb-[200px]'>
      <div className='flex p-4 pt-20   bg-gradient-to-b from-[#4d4d4d] to-[#303030] '>
        <div className='w-24 h-24 p-20 rounded-full bg-black shadow-inner		'></div>

        <div className='flex-col flex gap-3 justify-center p-2'>

          <p className='text-xs font-medium'>Profile</p>
          <h1 className='text-6xl font-[1000]	'>danielcalebe</h1>
          <p className='text-[11px] '>10 public playlists  ●  10 followers  ●  100 following</p>

        </div>

      </div>

      <div className='px-2 py-5'><p className='cursor-pointer text-lg brightness-75'>. . .</p></div>

      {/* Carrossel de outros artistas */}
      <div className="mb-8" >
        <h2 className=" font-bold text-xl ml-2 hover:underline  ">Top artists this month</h2>
        <p className=' brightness-75 text-sm ml-2'>Only visible to you</p>
        <div ref={artistsCarouselRef} className="flex overflow-x-auto scrollbar-hide space-x-4 p-2">

          {artistData.map((item, index) => (
            <ArtistItem id={item.id} key={index} name={item.name} image={item.image} />
          ))}
        </div>
      </div>


      <div className="mb-8" >
        <div className='flex fle justify-between p-2 items-center'> 
          <div>
            <h2 className=" font-bold text-xl ml-2 hover:underline  ">Top tracks this month</h2>
            <p className=' brightness-75 text-sm ml-2'>Only visible to you</p>
          </div>

            <div>
              <p className='text-xs cursor-pointer hover:brightness-100 brightness-75'>Show all</p>
            </div>

        </div>

        {songsData.map((item, index) => {
          const isPlayingCurrentSong = track && track.id === item.id;  
          return (
            <div
              key={item.id} // Usando o ID da música como chave única
              onClick={() => playWithId(item.id)} // Ativa a música ao clicar no contêiner
              className="group w-full h-12 rounded flex items-center hover:bg-[#ffffff2b] gap-4"
            >
              <div className="flex items-center ml-3 gap-4 w-full">
                {/* Imagem da música */}
                <div className="relative w-[30px] min-w-[30px] h-auto">
                  <img
                    onClick={(e) => {
                      e.stopPropagation(); // Impede o clique de propagar para o contêiner maior
                      playWithId(item.id); // Toca ou pausa a música
                    }}
                    className="group-hover:block hidden w-[10px] absolute -top-1 left-0"
                    src={isPlayingCurrentSong && playStatus ? assets.pause_icon : assets.play_icon}
                    alt="Ícone de play/pause"
                  />
                  <p className="group-hover:hidden text-[#6b6a6a] font-semibold">{index + 1}</p>
                </div>

                {/* Imagem da música */}
                <div className="min-w-8 max-w-8 h-auto">
                  <img className="w-full h-auto" src={item.image || assets.img14} alt={item.name} />
                </div>

                {/* Nome da música */}
                <div className="flex justify-between gap-2 text-left px-2">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                </div>

                {/* Informações adicionais */}
                <div className="flex flex-row text-[#6b6a6a] justify-between w-full">
                  <div className="text-center flex-grow mt-1">
                    {/* Talvez um texto adicional aqui */}
                  </div>

                  {/* Ícone de salvar */}
                  <div className="mt-1.5 cursor-pointer hidden lg:group-hover:block sm:hidden">
                    <img className="w-6" src={assets.save_library_icon} alt="Salvar" />
                  </div>

                  {/* Duração da música */}
                  <div className="text-center mt-1 w-20 sm:mr-20">
                    <p className="font-semibold">{item.duration}</p>
                  </div>

                  {/* Ícone de opções */}
                  <div className="text-center mb-2 mr-2 cursor-pointer hidden sm:block">
                    <p className="font-bold">. . .</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}




      </div>
    </div>
  )
}

export default DisplayProfile