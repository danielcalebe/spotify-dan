import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { albumsData, artistData, assets, songsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import ArtistItem from './ArtistItem';
import { Navigate, useNavigate } from 'react-router-dom';
import { handleTabClick } from '../tabUtils';
import SidebarRight from './SidebarRight';

const DisplayHome = () => {

    useEffect(() => {
          handleTabClick("bg-white text-black", "bg-black text-white", ".tab-home");
          
        }, []);
        
  const navigate = useNavigate();
  // Definindo refs para os carrosséis
  const albumsCarouselRef = useRef(null); // Ref para o carrossel de álbuns
  const songsCarouselRef = useRef(null);  // Ref para o carrossel de músicas
  const artistsCarouselRef = useRef(null);  // Ref para o carrossel de músicas

  // Função para manipular o evento de rolagem
  const handleWheel = (e, carouselRef) => {
    if (carouselRef.current) {
      e.preventDefault(); // Impede o comportamento padrão de rolagem vertical

      // Ajusta a velocidade da rolagem horizontal
      const scrollSpeed = 1; // Velocidade mais lenta
      carouselRef.current.scrollLeft += e.deltaY * scrollSpeed; // Ajuste a quantidade de rolagem
    }
  };

  useEffect(() => {
    const albumsCarousel = albumsCarouselRef.current;
    const songsCarousel = songsCarouselRef.current;
    const artistsCarousel = artistsCarouselRef.current;


    // Adiciona o listener de rolagem para ambos os carrosséis
    if (albumsCarousel) {
      albumsCarousel.addEventListener('wheel', (e) => handleWheel(e, albumsCarouselRef), { passive: false });
    }
    if (songsCarousel) {
      songsCarousel.addEventListener('wheel', (e) => handleWheel(e, songsCarouselRef), { passive: false });
    }

    // Remove o listener ao desmontar o componente
    return () => {
      if (albumsCarousel) {
        albumsCarousel.removeEventListener('wheel', (e) => handleWheel(e, albumsCarouselRef));
      }
      if (songsCarousel) {
        songsCarousel.removeEventListener('wheel', (e) => handleWheel(e, songsCarouselRef));
      }
    };
  }, []);

  return (
    <>
   
      <div className=' -p-10 -m-12 bg-gradient-to-b from-[#ff012023] to-black via-black '>
        
        <div className='m-13 p-10 '>
          <div className='flex items-center gap-2 mt-4 '> 
                <p className='tab-home bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
                <p className='tab-home  bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
                <p className='tab-home bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>

            </div>

          {/* Seção de músicas */}
          
          <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ml-2">
            {albumsData.map((item, index) => (
              <a    onClick={() => navigate(`/album/${item.id}`)}>
              <div key={index} className="bg-[#242424] bg-opacity-45 backdrop-blur-lg text-white hover:bg-[#424141] hover:bg-opacity-30 pl-5 p-2 rounded-md flex flex-row gap-4 items-center group relative">
                {/* Imagem da capa, com largura e altura fixas */}
                <img className="w-12 h-12 object-cover -ml-[9%] -my-[3%]" src={item.image} alt={`Capa do álbum ${item.name}`} />

                {/* Nome do álbum com truncamento, mas sem afetar o layout */}
                <p className="font-bold text-sm pl-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>

                {/* Ícone de Play com posição fixa e transição de escala */}
                <div className="group-hover:flex z-10 hidden items-center justify-center w-[40px] h-[40px] rounded-full bg-[#1db954] transition-transform hover:scale-110 absolute right-2">
                  <img className="w-[40%] mx-auto" src={assets.play_black_icon} alt="Ícone de Play" />
                </div>
              </div>
               </a>
            ))}
          </div>
         

          {/* Carrossel de álbuns */}
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div
              ref={albumsCarouselRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 p-2 scroll-smooth"
            >
              {albumsData.map((item, index) => (
                <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
              ))}
            </div>
          </div>

          {/* Carrossel de músicas */}
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div
              ref={songsCarouselRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 p-2 scroll-smooth"
            >
              {songsData.map((item, index) => (
                <SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
              ))}
            </div>
          </div>

{/* Carrossel de artista */}
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Artist of the mouth</h1>
              <div
                ref={artistsCarouselRef}
                className="flex overflow-x-auto scrollbar-hide space-x-4 p-2 scroll-smooth"
              >
                {artistData.map((item, index) => (
                  <ArtistItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                ))}


              </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default DisplayHome;
