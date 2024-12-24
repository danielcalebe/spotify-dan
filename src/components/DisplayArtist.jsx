import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { albumsData, artistData as allArtistData, artistData, assets } from '../assets/assets';
import { songsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import ArtistItem from './ArtistItem';
import Navbar from './Navbar';
import { useInView } from 'react-intersection-observer';

const DisplayArtist = () => {
    const { id } = useParams(); // Obtém o 'id' da URL
    const artist = allArtistData[id]; // Acessa o item correspondente usando o 'id'

    if (!artist) {
        return <div>Artista não encontrado!</div>; // Exibe uma mensagem caso o artista não seja encontrado
    }

    const [scrollPosition, setScrollPosition] = useState(0); // Estado para armazenar a posição da rolagem
    const albumsCarouselRef = useRef(null); // Ref para o carrossel de álbuns
    const artistsCarouselRef = useRef(null); // Ref para o carrossel de álbuns

    const mainContentRef = useRef(null); // Ref para o conteúdo principal da página

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
        const artistsCarousel = artistsCarouselRef.current; // Ref para o carrossel de álbuns

        // Adiciona o listener de rolagem para ambos os carrosséis
        if (albumsCarousel) {
            albumsCarousel.addEventListener('wheel', (e) => handleWheel(e, albumsCarouselRef), { passive: false });
        }
        if (artistsCarousel) {
            artistsCarousel.addEventListener('wheel', (e) => handleWheel(e, artistsCarouselRef), { passive: false });
        }

        // Remove o listener ao desmontar o componente
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
        if (mainContentRef.current) {
            mainContentRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Garante que o topo do elemento seja alinhado com o topo da janela
            });
        }
    }, [id]); // Só executa quando o 'id' do artista mudar






    


    return (
        <>

            <Navbar />

            <div className="-mx-[3%] flex justify-content items-center  bg-center"  ref={mainContentRef}>
                <div  className="w-full h-[400px] bg-white relative  " style={{
                    backgroundImage: `url(${artist.banner})`,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adiciona a sobreposição de cor
                    backgroundBlendMode: 'multiply', // Experimente com diferentes valores de blendMode
                    backgroundPosition: 'center center', // Centraliza a imagem de fundo dentro da div
                    backgroundAttachment: 'fixed', // Faz a imagem ficar fixa enquanto rola a página
                    backgroundSize: 'cover', // Faz a imagem cobrir toda a div
                    backgroundRepeat: 'no-repeat', // Não repete a imagem
                    transition: 'background-position 0.2s ease-out',

                    backgroundPositionX: 10 ,            
                   opacity: 0.8, // Aplica a opacidade calculada

                    
                }}>
                    {/* Texto e ícone do artista verificado */}
                    <div className="absolute top-[56%] left-8 z-10 text-white flex items-center gap-2">
                        <img className="w-8" src={assets.verified_artist_icon} alt="Artista Verificado" />
                        <p className="-ml-2 text-xs font-bold text-center mt-1 opacity-1">Verified Artist</p>
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
                <h1 className="my-5 font-bold text-2xl ml-2">Popular</h1>
                {songsData.slice(0, 5).map((item, index) => (
                    <div key={index} className="group w-full h-12 rounded flex flex-row items-center hover:bg-[#ffffff2b] gap-4">
                        <div className="flex items-center gap-4 w-full">
                            <div className="ml-4 relative w-[20px] h-[20px]">
                                <img
                                    className="group-hover:block hidden w-[15px] h-[15px] absolute top-1 left-0"
                                    src={assets.play_icon}
                                    alt=""
                                />
                                <p className="group-hover:hidden text-[#6b6a6a] font-semibold">{index + 1}</p>
                            </div>
                            <div className="w-10 ml-2">
                                <img src={item.image || assets.img14} alt="" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold">{item.name}</p>
                            </div>
                            <div className="flex flex-row gap-7 flex-grow text-[#6b6a6a]">
                                <div className="text-center flex-grow mt-1">
                                    <p className="font-semibold group-hover:text-white"></p>
                                </div>
                                <div className="mt-1 cursor-pointer hidden lg:group-hover:block md:hidden sm:hidden">
                                    <img className="w-8" src={assets.save_library_icon} alt="" />
                                </div>
                                <div className="text-center mt-1">
                                    <p className="font-semibold">{item.duration}</p>
                                </div>
                                <div className="text-center mb-2 mr-2 cursor-pointer">
                                    <p className="font-bold">. . .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <p className="mt-6 ml-3 cursor-pointer font-bold text-[#6b6a6a] hover:text-white text-xs">Show more</p>
            </div>
            <div className="h-10"></div>

            <div>
                <div className="flex flex-row my-5 text-center items-center justify-between text-xs ml-2 mb-6">
                    <h1 className="my-5 font-bold text-2xl ml-2 mb-6 hover:underline underline-offset-1">Discography</h1>
                    <p className="text-[#6b6a6a] hover:text-white">Show all</p>
                </div>
                <div className="flex flex-row gap-3 ml-2 mb-2">
                    <p className="cursor-pointer p-1 px-4 bg-white text-black rounded-full">Popular releases</p>
                    <p className="cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full">Album</p>
                    <p className="cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full">Singles and EPs</p>
                    <p className="cursor-pointer p-1 px-4 bg-[#242424] hover:bg-[#333333] rounded-full">Compiled</p>
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
