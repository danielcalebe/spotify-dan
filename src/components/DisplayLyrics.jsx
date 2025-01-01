import React from 'react'
import { artistData, assets, songsData } from '../assets/assets'
import { useParams } from 'react-router-dom';

const DisplayLyrics = () => {
    const {id} = useParams();
    const songData = songsData[id];
    const artist = artistData[songData.id_artist];

  return (
    <div className='w-full h-full flex p-2 pt-4 justify-center mb-[100px]' style={{
        backgroundColor: artist?.bgColor || '#ffffff'
    }}>
        <div>
        <p class="cursor-pointer max-w-lg break-words p-2 font-bold text-black text-3xl  word-spacing-wide  leading-relaxed hover:text-white hover:underline" >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod inventore quas aliquid, explicabo qui maxime consequatur 
        </p>
        <div><img className='cursor-pointer w-7 filter hover:invert hover:underline border-black hover:border-b-2 pb-1' src={assets.music_icon} alt="" /></div>

        <p class="cursor-pointer max-w-lg break-words p-2 font-bold text-black text-3xl  word-spacing-wide  leading-relaxed hover:text-white hover:underline" >
            Cupiditate magni nostrum impedit eius perspiciatis esse sapiente possimus tenetur error commodi dicta ea.

        </p>
        <div className=''><img className='cursor-pointer w-7 hover:invert hover:underline border-black hover:border-b-2 pb-1' src={assets.music_icon} alt="" /></div>

        <p class="cursor-pointer max-w-lg break-words p-2 font-bold text-black text-3xl  word-spacing-wide  leading-relaxed hover:text-white hover:underline" >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod inventore
        </p>




            </div>

    </div>
  )
}

export default DisplayLyrics