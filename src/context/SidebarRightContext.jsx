// SidebarRightContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Criando o contexto
const SidebarRightContext = createContext();

// Provider para envolver a árvore de componentes
export const SidebarRightProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
    
  };

  return (
    <SidebarRightContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarRightContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useSidebar = () => {
  return useContext(SidebarRightContext); // Retorna os valores do contexto
};
