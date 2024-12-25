import React, { useEffect, useState } from 'react';
import { albumsData, artistData, assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { handleTabClick } from '../tabUtils';

const Sidebar = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Estado para controlar a sidebar
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed); // Alterna o estado da sidebar
    };
      
    const [combinedData, setCombinedData] = useState([]); // Estado para armazenar os dados embaralhados
    const navigate = useNavigate();

    useEffect(() => {
        // Aplica a lógica de classe das abas
        handleTabClick("bg-white text-black", "bg-[#242424] text-white", ".tab-sidebar");

        // Função para embaralhar os dados
        const shuffleArray = (array) => {
            return array.sort(() => Math.random() - 0.5);
        };

        // Combina e embaralha artistas e álbuns
        const shuffledData = shuffleArray(
            artistData.map((item) => ({
                ...item,
                type: 'artist',
            })).concat(
                albumsData.map((item) => ({
                    ...item,
                    type: 'album',
                }))
            )
        );

        setCombinedData(shuffledData); // Atualiza o estado com os dados embaralhados
    }, []); // Executa apenas quando o componente é montado

    return (
        
        

            
            
                <div className={`bg-[#121212] sticky h-full  rounded scrollbar-hidden ${isSidebarCollapsed ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                    <div className='p-4 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <img onClick={toggleSidebar} className='w-8' src={assets.stack_icon} alt="" />
                            <p className={`font-semibold text-white ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Your Library
                            </p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <img className={`w-5 ${isSidebarCollapsed ? 'hidden' : 'block'}`} src={assets.arrow_icon} alt="" />
                            <img className={`w-5 ${isSidebarCollapsed ? 'hidden' : 'block'}`} src={assets.plus_icon} alt="" />
                        </div>
                    </div>

                    {/* Renderiza os dados embaralhados */}
                    {combinedData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                item.type === 'album'
                                    ? navigate(`/album/${item.id}`)
                                    : navigate(`/artist/${item.id}`)
                            }
                            className="p-3 group items-center hover:bg-[#242424] rounded font-semibold flex items-start justify-start gap-1 pl-4 cursor-pointer"
                        >
                            <div className={`relative ${isSidebarCollapsed ? 'w-12 h-12' : 'w-8 h-8'}`}>
                                <div
                                    className={`w-full h-full ${item.type === 'artist' ? 'group-hover:bg-[#12121280]' : ''}`}
                                >
                                    <img
                                        className={`${isSidebarCollapsed ? 'pl-10' : 'pl-10'}group-hover:opacity-50 absolute w-full h-full p-[1%] ${item.type === 'artist' ? 'rounded-full' : 'rounded'}`}
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>

                                <img
                                    className={`hidden group-hover:block absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2`}
                                    src={assets.play_icon}
                                    alt="Play Icon"
                                />
                            </div>
                            <div className={`flex flex-col ml-2 justify-center ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                <h1 className='text-white'>{item.name}</h1>
                                <p className="font-bold text-[#6f7371] text-xs mt-0.3">
                                    {item.type === 'album' ? 'Album' : 'Artist'}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className='h-14'></div>
                </div>
           
        
    );
};

export default Sidebar;
