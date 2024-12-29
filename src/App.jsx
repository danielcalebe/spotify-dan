import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom"; // Importando useLocation para identificar a rota atual
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import { SidebarRightProvider, useSidebar } from "./context/SidebarRightContext";
import { SidebarLeftProvider, useSidebarLeft } from "./context/SidebarLeftContext";
import Navbar from "./components/Navbar";
import SidebarRight from "./components/SidebarRight";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div>
      <SidebarLeftProvider>
        <SidebarRightProvider>
          {/* Passe activeContent e setActiveContent para o InnerApp */}
          <InnerApp
            audioRef={audioRef}
            track={track}
          />
        </SidebarRightProvider>
      </SidebarLeftProvider>
    </div>
  );
};

// Componente InnerApp com acesso aos estados e funções passados
const InnerApp = ({ audioRef, track }) => {
  const location = useLocation(); // Obter a rota atual
  const isSongPage = location.pathname.startsWith("/song/"); // Verificar se é a rota /song/:id
  const { toggleSidebar } = useSidebar();
  const { isSidebarLeftCollapse } = useSidebarLeft();

  const [activeContent, setActiveContent] = useState(null); // O estado para a SidebarRight

  return (
    <div className="h-screen bg-black">
      {/* Navbar e Sidebar aparecem apenas quando não estiver na página de música */}
      {!isSongPage && <Navbar />}
      
      <div className="h-[100%] flex overflow-hidden">
        {/* Sidebar aparece apenas quando não estiver na página de música */}
        {!isSongPage && <Sidebar />}
        
        {/* Display sempre aparece */}
        <Display />
        
        {/* SidebarRight só aparece se não estiver na página de música ou se houver conteúdo ativo */}
        {!isSongPage && (
          <SidebarRight
            activeContent={activeContent}
            closeSidebar={() => {
              setActiveContent(null);
              toggleSidebar(); // Atualiza o estado para fechar a sidebar
            }}
          />
        )}
      </div>

      {!isSongPage && <Player 
      isSongPage = {isSongPage}
      
      closeSidebar={() => {
              setActiveContent(null);
              toggleSidebar(); 
            }} 
            setActiveContent={setActiveContent} activeContent={activeContent}/>}

      {/* Elemento de áudio */}
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};


export default App;
