

import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData, artistData } from '../assets/assets';
import DisplayArtist from './DisplayArtist';
import { useSidebar } from '../context/SidebarRightContext';
import SidebarRight from './SidebarRight';
import { useSidebarLeft } from '../context/SidebarLeftContext';
import DisplaySong from './DisplaySong';
import DisplayBrowse from './DisplayBrowse';
import DisplayLyrics from './DisplayLyrics';
import DisplayProfile from './DisplayProfile';

const Display = ({isSongPage}) => {
  const { isSidebarVisible } = useSidebar();
  const { isSidebarCollapsed } = useSidebarLeft();


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
  }, [isAlbum, bgColorAlbum]);

  useEffect(() => {
    if (isArtist) {
      displayRef.current.style.background = `linear-gradient(${bgColorArtist}, #121212 70%), #121212`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isArtist, bgColorArtist]);

  return (



    <div
      ref={displayRef}
      className={`scrollbar-hidden mt-2   flex-grow  transition-all duration-300 overflow-x-hidden md:overflow-x-auto
        w-[100%]   rounded bg-[#121212] text-white  overflow-y-auto lg:w-[75%] lg:ml-0 
        ${isSidebarVisible ? 'md:mr-[100px] lg:mr-[24%] xl:mr-[23%]  pr-14' : 'w-[100%]'}
        ${isSidebarCollapsed ? '' : 'w-[100%]'} 
        ${isSongPage ? ' bg-white' : ' bg-white '} 
      `}
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
        <Route path='/artist/:id' element={<DisplayArtist />} />
        <Route path='/song/:id' element={<DisplaySong />} />
        <Route path='/browse' element={<DisplayBrowse  />} />
        <Route path='/lyrics/:id' element={<DisplayLyrics />} />
        <Route path='/profile' element={<DisplayProfile />} />

      </Routes>
    

    </div>
  );
};

export default Display;