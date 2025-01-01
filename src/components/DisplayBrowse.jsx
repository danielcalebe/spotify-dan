import React from 'react';
import { albumsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const DisplayBrowse = () => {
  const colors = ["#d62b54", "#506bc6", "#478215", "#d1c6a6", "#56b9c5", "#832131", "#1c3363", "#1e4e25", "#3e1e1d", "#8d67ab", "#d84000"];

  // Função para sortear uma cor
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Gerando o array de álbuns embaralhados
  const shuffledAlbums = albumsData.flatMap(item => [item, item, item]).sort(() => Math.random() - 0.5);

  // Navegação
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    // A navegação ocorre somente ao clicar no álbum
    navigate(`/album/${id}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-5 p-5 -pr-30 mb-[150px]">
      {shuffledAlbums.map((item, index) => {
        const bgColor = getRandomColor(); // Sorteia uma cor para cada item

        return (
          <div
            key={index}
            onClick={() => handleNavigation(item.id)} // Garante que a navegação aconteça ao clicar
            className="relative flex justify-between w-[23%] rounded-md overflow-hidden cursor-pointer"
            style={{ backgroundColor: bgColor }} 
          >
            <h3 className="font-bold text-lg p-4">{item.name}</h3>
            <img
              className="w-28 rotate-[23deg] mt-6 -mr-5 object-cover rounded-md"
              src={item.image}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayBrowse;
