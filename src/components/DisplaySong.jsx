import React, { useContext, useEffect, useState } from 'react'
import { albumsData, artistData, assets, songsData } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const DisplaySong = () => {
  const { id } = useParams();
  const songData = songsData[id];

  const navigate = useNavigate();
  const { audioRef, seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } = useContext(PlayerContext);
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  const [volume, setVolume] = useState(0.9);
  const [artist, setArtist] = useState({ banner: "", name: "" });
  const [width, setWidth] = useState(300); // Estado para controlar a escala da imagem


  const [percentageTime, setpercentageTime] = useState(0);

  useEffect(() => {
    if (time.currentTime && time.totalTime) {
      const currentTimeInSeconds = (time.currentTime.minute || 0) * 60 + (time.currentTime.second || 0);
      const totalTimeInSeconds = (time.totalTime.minute || 0) * 60 + (time.totalTime.second || 0);

      // Verifique se o totalTime não é zero para evitar divisão por zero
      if (totalTimeInSeconds > 0) {
        const progressPercentage = (currentTimeInSeconds / totalTimeInSeconds) * 100;
        setpercentageTime(progressPercentage);
      } else {
        setpercentageTime(0); // Caso o totalTime seja zero, defina a porcentagem como 0%
      }
    }
  }, [time.currentTime, time.totalTime]);





  useEffect(() => {
    // Encontrar o artista com base no id_artist do songData
    if (songData) {
      const artistInfo = artistData.find(artist => artist.id === songData.id_artist); // Encontre o artista correspondente
      setArtist(artistInfo);
    }
  }, [songData]); // Quando o songData mudar, atualiza as informações do artista



  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") { // Verifica se a tecla pressionada é "Escape"
        event.preventDefault();
        navigate(-1); // Navega para a página anterior
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [navigate]); // Inclua `navigate` na lista de dependências

  useEffect(() => {
    if (track) {
      navigate(`/song/${track.id}`); // Redireciona para a página da nova track
    }
  }, [track, navigate]); // O efeito será acionado sempre que a track mudar

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(100); // Depois de 100ms, aumenta a largura para 150%
    }, 100); // Delay de 100ms para garantir que a transição aconteça

    return () => clearTimeout(timer); // Limpa o timer quando o componente for desmontado
  }, []);

  const nextTrack = songsData[(track.id + 1) % songsData.length];


  return (
    <div className='h-full w-full   '
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${artist.banner})`,
        backgroundSize: 'cover', // Faz a imagem cobrir o elemento
        backgroundPosition: 'center', // Centraliza a imagem
      }}>
      <div className='flex  justify-between  p-10'>
        <div className='flex gap-2  items-center opacity-85  cursor-default	'>
          <img className='w-7' src={assets.spotify_logo_white} alt="" />
          <p className='text-[8px] tracking-[.10em]	 font-semibold'>PLAYING FROM TRACK</p>
        </div>
        <div className={`h-10 bg-[#242424] flex flex-row border-[2.5px] border-gray-400 transition-all duration-300   h-full 
            ${percentageTime > 80 ? 'opacity-100' : 'opacity-0'}`}>

          <div className='max-w-14 flex-shrink-0 '>
            <img src={nextTrack.image} alt="" />
          </div>
          <div className='mx-2 py-1 flex flex-col justify-top gap-1  min-w-56 w-full'>
            <p className='text-xs font-semibold tracking-wide	'> UP NEXT</p>
            <p className='font-bold text-xs'>{nextTrack.name} ● {nextTrack.author}</p>
          </div>
        </div>

      </div>
      <div className='bottom-0 fixed px-20 mb-16'>

        <div className='flex items-end gap-4 pb-4'>
          <div>
            <img
              className="rounded transition-all ease-in-out duration-1000 "
              style={{ width: `${width}px` }} // A largura começa em 20px e vai até 150% (ou seja, 30px)
              src={songData.image} alt="Song"
            />
          </div>
          <div>
            <p className='font-bold text-xl md:text-4xl'>{songData.name}</p>
            <p className='font-bold brightness-75 text-lg'>{songData.author.slice(0, 12)}</p>
          </div>
        </div>


        <div className='w-[100%] h-[10%] flex justify-between items-center text-white pb-2  '>
          <div className="flex items-center justify-start gap-5 ">
            <p>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
            <div ref={seekBg} onClick={seekSong} className="w-[90vw] max-w-[40%] sm:max-w-[64%] lg:max-w-[86%] bg-gray-300 rounded-full cursor-pointer">
              <hr ref={seekBar} className="h-[4px] border-none w-0 bg-green-800 rounded-full cursor-pointer" />
            </div>
            <p>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
          </div>
        </div>


        <div className="flex flex-wrap md:justify-between  justify-center items-center w-full lg:pr-28 pr-56  px-2">
          {/* Botão de salvar */}
          <div className="mb-2 lg:mb-0 w-[12%] hidden md:block  ">
            <img className="w-5 cursor-pointer scale-hover brightness-hover" src={assets.save_library_icon} alt="Save" />
          </div>

          {/* Controles principais */}
          <div className="flex flex-wrap gap-7 items-center justify-center">
            <img className="w-4 cursor-pointer  brightness-50 hover:brightness-100" src={assets.shuffle_icon} alt="Shuffle" />
            <img onClick={previous} className="w-3 cursor-pointer brightness-50 hover:brightness-100" src={assets.prev_icon} alt="Previous" />

            {/* Botão de Play/Pause */}
            <div className="bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center">
              {playStatus ? (
                <img onClick={pause} className="w-6 cursor-pointer" src={assets.pause_black_icon} alt="Pause" />
              ) : (
                <img onClick={play} className="w-6 cursor-pointer" src={assets.play_black_icon} alt="Play" />
              )}
            </div>

            <img onClick={next} className="w-3 cursor-pointer  brightness-50 hover:brightness-100" src={assets.next_icon} alt="Next" />
            <img className="w-4 cursor-pointer  brightness-50 hover:brightness-100" src={assets.loop_icon} alt="Loop" />
          </div>

          {/* Controles adicionais */}
          <div className="hidden flex-wrap items-center gap-4 opacity-75 mt-2 md:flex overflow-x-auto">
            <img className="w-4 img-white brightness-75" src={assets.mic_icon} alt="Mic" />
            <img className="w-4" src={assets.volume_icon} alt="Volume" />
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
                height: "4px",
              }}
            />
            <img
              title="Exit full screen"
              className="w-4 cursor-pointer brightness-150"
              src={assets.zoom_icon}
              onClick={() => {
                navigate("/"); // Navega para a página da música
              }}
              alt="Zoom"
            />
          </div>
        </div>

      </div>

    </div>


  )
}

export default DisplaySong