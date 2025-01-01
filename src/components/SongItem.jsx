import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';

const SongItem = ({ name, image, author, id }) => {
  const { playWithId, track, playStatus } = useContext(PlayerContext); 
  const isPlayingCurrentSong = track.id === id; 
  const navigate = useNavigate();
  const handlePlayPause = (e) => {
    e.stopPropagation(); 
    playWithId(id); 
  };

  return (
    <div
      onClick={() => playWithId(id)} // Toca a música ao clicar fora do botão
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group"
    >
      {/* Imagem com o botão de play/pause */}
      <div className="relative">
        <img className="rounded" src={image} alt={name} />
        {/* Círculo verde com o ícone de play/pause (visível apenas com hover) */}
        <div
          onClick={handlePlayPause} 
          className="absolute bottom-2 right-2 w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 transform scale-90 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
        >
          <img
            src={isPlayingCurrentSong && playStatus ? assets.pause_black_icon : assets.play_black_icon}
            alt={isPlayingCurrentSong && playStatus ? "Pause" : "Play"}
            className="w-4"
          />
        </div>
      </div>
      {/* Informações da música */}
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p  className="hover:text-white hover:underline text-slate-200 text-sm">{author}</p>
    </div>
  );
};

export default SongItem;
