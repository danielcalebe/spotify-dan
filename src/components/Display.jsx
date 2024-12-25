import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData, artistData } from '../assets/assets';
import DisplayArtist from './DisplayArtist';
import { useSidebar } from '../context/SidebarContext';
import Sidebar from './Sidebar';
import SidebarRight from './SidebarRight';

const Display = () => {
  const { isSidebarVisible } = useSidebar(); // Agora o contexto é acessível aqui

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const isArtist = location.pathname.includes("artist");

  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const artistId = isArtist ? location.pathname.slice(-1) : "";
  const bgColorAlbum = albumsData[Number(albumId)].bgColor;
  const bgColorArtist = artistData[Number(artistId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColorAlbum}, #121212 )`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, bgColorAlbum]); // Incluindo dependências adequadas

  useEffect(() => {
    if (isArtist) {
      displayRef.current.style.background = `linear-gradient(${bgColorArtist}, #121212 50%), #121212`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isArtist, bgColorArtist]); // Certifique-se de incluir as dependências

  return (
    
      <div
        ref={displayRef}
        className={`scrollbar-hidden  flex-grow transition-all duration-300 w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0
           ${isSidebarVisible ? 'mr-[300px] pr-14 ' : 'w-[100%]'}`}
      >
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route path='/album/:id' element={<DisplayAlbum />} />
          <Route path='/artist/:id' element={<DisplayArtist />} />
          
        </Routes>
        <SidebarRight />

      </div>
    
  );
};

export default Display;
