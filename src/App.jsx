import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import SidebarRight from "./components/SidebarRight";
import Navbar from "./components/Navbar";

const App = () => {
  // Função para atualizar o volume
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <SidebarProvider>
      {/* Agora o useSidebar pode ser usado dentro de App */}
      <InnerApp audioRef={audioRef} track={track} />
    </SidebarProvider>
  );
};

// Componente que está dentro do SidebarProvider, onde o useSidebar funciona
const InnerApp = ({ audioRef, track }) => {
  const { isSidebarVisible } = useSidebar(); // Agora o contexto é acessível aqui

  return (
    <div className="h-screen bg-black">
         <Navbar />
      <div className="h-[90%] flex overflow-x-hidden">
   

        <Sidebar />
    
         
          <Display />
       
      </div>

      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default App;
