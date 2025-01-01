import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { albumsData, artistData as allArtistData, artistData, assets } from '../assets/assets';
import { songsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import ArtistItem from './ArtistItem';
import { useInView } from 'react-intersection-observer';
import { handleTabClick } from "../tabUtils";
import { PlayerContext } from '../context/PlayerContext';

const DisplayArtist = () => {
    const { playWithId, track, playStatus } = useContext(PlayerContext);



    const { id } = useParams();
    const artist = allArtistData[id];

    if (!artist) {
        return <div>Artista não encontrado!</div>;
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const albumsCarouselRef = useRef(null);
    const artistsCarouselRef = useRef(null);


    const handleWheel = (e, carouselRef) => {
        if (carouselRef.current) {
            e.preventDefault();


            const scrollSpeed = 1;
            carouselRef.current.scrollLeft += e.deltaY * scrollSpeed;
        }
    };

    useEffect(() => {
        const albumsCarousel = albumsCarouselRef.current;
        const artistsCarousel = artistsCarouselRef.current;

        if (albumsCarousel) {
            albumsCarousel.addEventListener('wheel', (e) => handleWheel(e, albumsCarouselRef), { passive: false });
        }
        if (artistsCarousel) {
            artistsCarousel.addEventListener('wheel', (e) => handleWheel(e, artistsCarouselRef), { passive: false });
        }

        return () => {
            if (albumsCarousel) {
                albumsCarousel.removeEventListener('wheel', (e) => handleWheel(e, albumsCarouselRef));
            }
            if (artistsCarousel) {
                artistsCarousel.removeEventListener('wheel', (e) => handleWheel(e, artistsCarouselRef));
            }
        };
    }, []);

    useEffect(() => {
        // Rola a página para o topo (x = 0, y = 0)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth', // Rolagem suave
        });
    }, [id]); // Executa apenas quando o 'id' muda
    




    useEffect(() => {
        handleTabClick("bg-white text-black", "bg-[#242424] text-white", ".tab");
    }, []);

    const filteredSongs = songsData.filter((item) => String(item.id_artist) === id);

    return (
        <>



            <div className="-mr-[2000x] z-10  -my-5 pb-2 flex justify-content items-center  bg-center" >
                <div className="w-full h-[400px] bg-white relative  " style={{
                    backgroundImage: `url(${artist.banner})`,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adiciona a sobreposição de cor
                    backgroundBlendMode: 'multiply', // Experimente com diferentes valores de blendMode
                    backgroundPosition: 'center center', // Centraliza a imagem de fundo dentro da div
                    backgroundAttachment: 'fixed', // Faz a imagem ficar fixa enquanto rola a página
                    backgroundSize: 'cover', // Faz a imagem cobrir toda a div
                    backgroundRepeat: 'no-repeat', // Não repete a imagem
                    transition: 'background-position 0.2s ease-out',

                    backgroundPositionX: 10,


                }}>
                    {/* Texto e ícone do artista verificado */}
                    <div className="absolute top-[90%] sm:top-[56%] left-8 z-10 text-white flex items-center gap-2">
                        <img className="w-8" src={assets.verified_artist_icon} alt="Artista Verificado" />
                        <p className="-ml-2 text-xs font-bold text-center mt-1 opacity-1 ">Verified Artist</p>
                    </div>

                    {/* Nome do artista */}
                    <div className="absolute bottom-12 left-10 z-10 text-white">
                        <h1 className="text-6xl font-bold">{artist.name}</h1><br />
                        <p className="text-xs font-bold text-left">14,874,998 monthly listeners</p>
                    </div>
                </div>

            </div>

            {/* Resto do conteúdo da página, como as seções de álbuns, músicas populares, etc. */}
            <div>
                 <div className="flex items-center  pt-6 gap-1 w-[100%] p-4 rounded-lg pl-5 ">
                        <div 
                         onClick={() => playWithId(0)} // Toca ou pausa a música
                         key={0} className="flex items-center justify-center w-[50px] h-[50px] bg-[#1db954] rounded-full transition-transform duration-300 hover:scale-110 ">
                          <img
                          
                            className="w-[40%] cursor-pointer"
                            src={playStatus ? assets.pause_black_icon : assets.play_black_icon}
                            alt=""
                          />
                        </div>
                
                        <div className="flex items-center justify-center w-[60px] h-auto transition-transform duration-300 hover:scale-110">
                          <img
                            className="w-[100%] cursor-pointer"
                            src={assets.shuffle_gray_icon}
                            alt=""
                          />
                        </div>
                
                
                        <div className=" items-center p-1 px-3 font-semibold cursor-pointer
                         text-xs mt-[0.7%] mr-2  rounded-full border border-white justify-center  transition-transform duration-300 hover:scale-110 ">
                            <p>Follow</p>
                        </div>
                
                       
                
                        <div className="flex items-center justify-center  ">
                          <h1 className="text-gray-400 text-xl cursor-pointer font-black text-center hover:text-white">
                            . . .
                          </h1>
                        </div>
                      </div>

                <h1 className="my-5 font-bold text-2xl ml-2">Popular</h1>

                <div>
      {filteredSongs.length > 0 ? (
        filteredSongs.map((item, index) => {
          const isPlayingCurrentSong = track.id === item.id;

          return (
            <div key={index} onClick={() => playWithId(item.id)} className="group w-full h-12 rounded flex items-center hover:bg-[#ffffff2b] gap-4">
              <div className="flex items-center ml-3 gap-4 w-full">
                {/* Imagem da música */}
                <div className="relative w-[30px] min-w-[30px] h-auto">
                  <img
                    onClick={(e) => {
                      e.stopPropagation();  
                      playWithId(item.id); 
                    }}
                    className="group-hover:block hidden w-[15px] absolute -top-2 left-0"
                    src={isPlayingCurrentSong && playStatus ? assets.pause_icon : assets.play_icon}
                    alt=""
                  />
                  <p className="group-hover:hidden text-[#6b6a6a] font-semibold">{index + 1}</p>
                </div>

                <div className="min-w-8 max-w-8 h-auto">
                  <img className="w-full h-auto" src={item.image || assets.img14} alt="" />
                </div>

                <div className="flex justify-between gap-2 text-left px-2">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                </div>

                <div className="flex flex-row text-[#6b6a6a] justify-between w-full">
                  <div className="text-center flex-grow mt-1">
                    <p className="font-semibold group-hover:text-white"></p>
                  </div>

                  <div className="mt-1.5     cursor-pointer hidden lg:group-hover:block sm:hidden">
                    <img className="w-6" src={assets.save_library_icon} alt="" />
                  </div>

                  <div className="text-center mt-1 w-20 sm:mr-20">
                    <p className="font-semibold">{item.duration}</p>
                  </div>

                  <div className="text-center mb-2 mr-2 cursor-pointer hidden sm:block">
                    <p className="font-bold">. . .</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Não há músicas disponíveis para este artista.</p>
      )}
    </div>

                <p className="mt-6 ml-3 cursor-pointer font-bold text-[#6b6a6a] hover:text-white text-xs">Show more</p>
            </div>



            <div className="h-10"></div>

            <div>
                <div className="flex flex-row my-5 text-center items-center justify-between text-xs ml-2 mb-6">
                    <h1 className="my-5 font-bold text-2xl ml-2 mb-6 hover:underline underline-offset-1">Discography</h1>
                    <p className="text-[#6b6a6a] hover:text-white">Show all</p>
                </div>
                <div className="flex flex-row gap-3 ml-2 mb-2 items-center" id="tabs">
                    <p className="tab text-center cursor-pointer p-1 px-[1.5%] bg-white text-black rounded-full">Popular releases</p>
                    <p className="tab text-center cursor-pointer p-1 px-[1.5%] bg-[#242424] hover:brightness-200 text-white rounded-full">Album</p>
                    <p className="tab text-center cursor-pointer p-1 px-[1.5%] bg-[#242424] hover:brightness-200 text-white rounded-full">Singles and EPs</p>
                    <p className="tab text-center cursor-pointer p-1 px-[1.5%] bg-[#242424] hover:brightness-200 text-white rounded-full">Compiled</p>
                </div>




                {/* Carrossel de álbuns */}
                <div className="mb-4">
                    <div ref={albumsCarouselRef} className="flex overflow-x-auto scrollbar-hide space-x-4 p-2 scroll-smooth">
                        {albumsData.map((item, index) => (

                            <AlbumItem id={item.id} key={index} name={item.name} desc={item.desc} image={item.image} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex flex-row my-5 text-center items-center justify-between text-xs ml-2 mb-6">
                        <h1 className="my-5 font-bold text-2xl ml-2 mb-2 hover:underline underline-offset-1 cursor-pointer">
                            Whit {artist.name}
                        </h1>
                        <p className="text-[#6b6a6a] hover:text-white">Show all</p>
                    </div>

                    {/* Carrossel de álbuns */}
                    <div className="mb-4">
                        <div ref={albumsCarouselRef} className="flex overflow-x-auto scrollbar-hide space-x-4 p-2 scroll-smooth">
                            {albumsData.reverse().map((item, index) => (
                                <AlbumItem id={item.id} key={index} name={item.name} desc={item.desc} image={item.image} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carrossel de outros artistas */}
                <div className="mb-8" >
                    <h2 className="my-5 font-bold text-xl ml-2">Related Artists</h2>
                    <div ref={artistsCarouselRef} className="flex overflow-x-auto scrollbar-hide space-x-4 p-2">

                        {artistData.map((item, index) => (
                            <ArtistItem id={item.id} key={index} name={item.name} image={item.image} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default DisplayArtist;
