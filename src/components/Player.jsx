import React, { useContext, useState, useEffect } from 'react';
import { songsData } from '../assets/assets';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const { audioRef, seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } = useContext(PlayerContext);

    const [volume, setVolume] = useState(0.9);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // Garantir que o volume esteja configurado corretamente sempre que o estado mudar
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, audioRef]); // Atualiza o volume do áudio quando o estado `volume` mudar

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4 items-center justify-center">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle" />
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="previous" />

                    {/* Play/Pause button */}
                    <div className="bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center">
                        {playStatus ? (
                            <img onClick={pause} className="w-12 cursor-pointer" src={assets.pause_black_icon} alt="pause" />
                        ) : (
                            <img onClick={play} className="w-12 cursor-pointer" src={assets.play_black_icon} alt="play" />
                        )}
                    </div>

                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="loop" />
                </div>

                {/* Time and Seekbar */}
                <div className="flex items-center gap-5">
                    <p>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
                    <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full cursor-pointer" />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
                </div>
            </div>




            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img className='w-4' src={assets.plays_icon} alt="" />
                <img className='w-4' src={assets.mic_icon} alt="" />
                <img className='w-4' src={assets.queue_icon} alt="" />
                <img className='w-4' src={assets.speaker_icon} alt="" />
                <img className='w-4' src={assets.volume_icon} alt="" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 accent-green-500 appearance-none" 
                    style={{
                        background: `linear-gradient(to right, rgb(29, 185, 84) ${volume * 100}%, #fff ${volume * 100}%)`,
                        borderRadius: "0.25rem", 
                        height: "4px" 
                    }}
                />



                <img className='w-4' src={assets.mini_player_icon} alt="" />
                <img className='w-4' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    );
};

export default Player;
