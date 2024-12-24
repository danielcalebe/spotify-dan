import React, { useState } from 'react';

const VolumeControl = () => {
    const [volume, setVolume] = useState(1); // Volume inicial (1 = 100%)
    const audioRef = React.useRef(null); // Referência para o elemento de áudio

    // Função para atualizar o volume
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume; // Atualiza o volume do áudio
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Controle de volume */}
            <div className="flex items-center gap-2">
                <p className="text-white">Volume</p>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 accent-green-500" // Tailwind para estilizar
                />
                <p className="text-white">{Math.round(volume * 100)}%</p>
            </div>

            {/* Elemento de áudio */}
            <audio ref={audioRef} controls>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                Seu navegador não suporta áudio.
            </audio>
        </div>
    );
};

export default VolumeControl;
