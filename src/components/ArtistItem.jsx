import React from 'react';
import { useNavigate } from 'react-router-dom';
import { artistData, assets } from '../assets/assets'; // Certifique-se de que `play_icon` e `pause_icon` estão aqui.

const ArtistItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Rolando até o topo da tela ao navegar
    window.scrollTo(0, 0);
    navigate(`/artist/${id}`);
  };

  return (
    <div
      onClick={handleNavigation} // Usando a função handleNavigation para rolar até o topo
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group"
    >
      {/* Imagem com o botão de play/pause */}
      <div className="relative">
        <img className="rounded-full" src={image} alt="" />
        {/* Círculo verde com ícone play/pause */}
        <div
          className="absolute bottom-2 right-2 w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 transform scale-90 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
        >
          <img
            src={assets.play_black_icon}
            className="w-[40%]"
          />
        </div>
      </div>
      {/* Informações do álbum */}
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default ArtistItem;
