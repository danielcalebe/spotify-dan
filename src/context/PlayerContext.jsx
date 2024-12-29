import { createContext, useContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[1]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    if (id !== track.id) {
      setTrack(songsData[id]); // Troca a faixa
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0); // Garante que o áudio atualize antes de reproduzir
    } else if (!playStatus) {
      play(); // Reproduz se já for a faixa atual e estiver pausada
    } else {
      pause(); // Pausa se já estiver tocando
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 0);
    }
  };

  const next = async () => {
    // Verifica se a próxima música existe, caso contrário, volta para o início
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]); // Reproduz a próxima música
    } else {
      setTrack(songsData[0]); // Se chegou na última, volta para a primeira
    }
    setTimeout(() => {
      audioRef.current.play();
      setPlayStatus(true);
    }, 0);
  };

  useEffect(() => {
    if (audioRef.current) {
      // Evento 'onended' para avançar para a próxima música quando a atual terminar
      audioRef.current.onended = next;
    }
  }, [track]);    

  const seekSong = async (e) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        }%`;
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }
  }, [audioRef]);

  // Função para alternar entre play e pause ao pressionar a tecla espaço
  useEffect(() => {
    const handleSpaceKeyPress = (event) => {
      if (event.code === "Space") {  // Detecta a tecla "Espaço"
        event.preventDefault();  // Impede o comportamento padrão (ex: rolar a página)

        // Alterna entre play e pause
        if (audioRef.current.paused) {
          audioRef.current.play();
          setPlayStatus(true);

        } else {
          audioRef.current.pause();
          setPlayStatus(false);

        }
      }
    };

    // Adiciona o evento de teclado para detectar a tecla de espaço
    document.addEventListener("keydown", handleSpaceKeyPress);

    // Remove o evento quando o componente for desmontado
    return () => {
      document.removeEventListener("keydown", handleSpaceKeyPress);
    };
  }, []); // O useEffect será executado apenas uma vez ao montar o componente

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
  