import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData, artistData } from '../assets/assets'
import DisplayArtist from './DisplayArtist'

const Display = () => {

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album")
  const isArtist = location.pathname.includes("artist")

  const albumId = isAlbum ? location.pathname.slice(-1) : "";
 

  const artistId = isArtist ? location.pathname.slice(-1) : "";
  const bgColorAlbum = albumsData[Number(albumId)].bgColor;
  const bgColorArtist = artistData[Number(artistId)].bgColor;

  console.log(artistId)

    console.log(bgColorArtist );
  useEffect(()=> {
    if(isAlbum ){
      displayRef.current.style.background = `linear-gradient(${bgColorAlbum}, #121212 )`
    }
    else{
      displayRef.current.style.background = `#121212`

    }
    
  })

  useEffect(() => {
    if (isArtist) {
        displayRef.current.style.background = `linear-gradient(${bgColorArtist}, #121212 70%), #121212`;
    } else {
        displayRef.current.style.background = `#121212`;
    }
}, [isArtist, bgColorArtist]); // Certifique-se de incluir as dependências





  return (
    <div ref={displayRef} className=' w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path='/' element={<DisplayHome/>}  />
                <Route path='/album/:id' element={<DisplayAlbum/>}  />
                <Route path='/artist/:id' element={<DisplayArtist/>}  />

            </Routes>

    </div>
  )
}

export default Display