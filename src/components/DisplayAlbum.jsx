import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { albumsData, songsData } from '../assets/assets';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();  
  const albumData = albumsData[id];
  const { playWithId, track, playStatus } = useContext(PlayerContext);

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end  backdrop-blur-full  p-4 pl-5">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1 ">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b>Spotify </b> ● 142.732 likes ● <b>50 songs, </b> about 2 hr 20 min ●
          </p>
        </div>
      </div>
      <div className="flex items-center  mt-[70px] gap-1 w-[100%] p-4 rounded-lg pl-5 ">
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


        <div className="flex items-center justify-center w-8 mt-[0.7%] transition-transform duration-300 hover:scale-110 ">
          <img
            className="w-[100%] cursor-pointer"
            src={assets.save_library_icon}
            alt=""
          />
        </div>

        <div className="flex items-center justify-center w-12 mt-[0.6%]  transition-transform duration-300 hover:scale-110">
          <img
            className="w-[100%] cursor-pointer"
            src={assets.download_icon}
            alt=""
          />
        </div>

        <div className="flex items-center justify-center  ">
          <h1 className="text-gray-400 text-xl cursor-pointer font-black text-center hover:text-white">
            . . .
          </h1>
        </div>
      </div>





      <div className=" grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-5 text-[#a7a7a7]">
        <p>
          <b className="mr-4 ">#</b> Title
        </p>
        <p className='lg:pl-0 pl-20'>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />


      {songsData.map((item, index) => {
        const isPlayingCurrentSong = track.id === item.id; // Verifica se a música atual é esta

        return (
          <div
            onClick={() => playWithId(item.id)} // Toca ou pausa a música
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 p-2 justify-between items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer relative 
            group pl-5"
          >
            <p className="text-white truncate">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px] truncate lg:pl-0 pl-20">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">1 day ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>

            {/* Círculo verde com ícone de play/pause dentro da imagem */}
            <div
              onClick={(e) => {
                e.stopPropagation(); // Evita que o clique no botão dispare o onClick do contêiner
                playWithId(item.id); // Toca ou pausa a música com base no id
              }}
              className="absolute bottom-2 right-2 w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={isPlayingCurrentSong && playStatus? assets.pause_black_icon : assets.play_black_icon}
                alt={isPlayingCurrentSong ? 'Pause' : 'Play'}
                className="w-4"
              />
            </div>
          </div>
        );
      })}


      <div className="mb-[100px]"></div>
    </>
  );
};

export default DisplayAlbum;
