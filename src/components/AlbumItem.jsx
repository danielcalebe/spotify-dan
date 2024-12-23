  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { albumsData, assets, songsData } from '../assets/assets'; // Certifique-se de que `play_icon` e `pause_icon` estão aqui.

  const AlbumItem = ({ image, name, desc, id }) => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (e) => {
      e.stopPropagation(); // Impede a navegação ao clicar no botão
      setIsPlaying(!isPlaying);
    };

    return (
      <div
        onClick={() => navigate(`/album/${id}`)}
        className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group"
      >

      {/* Imagem com o botão de play/pause */}
        <div className="relative">
          <img className="rounded" src={image} alt="" />
          {/* Círculo verde com ícone play/pause */}
          <div
            onClick={handlePlayPause}
            className="absolute bottom-2 right-2 w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 transform scale-90 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
          >
            <img
              src={isPlaying ? assets.pause_black_icon : assets.play_black_icon}
              alt={isPlaying ? "Pause" : "Play"}
              className="w-4"
            />
          </div>
        </div>
        {/* Informações do álbum */}
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
      </div>
    );
  };

  export default AlbumItem;
