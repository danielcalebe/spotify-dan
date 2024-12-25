// SidebarContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Criando o contexto
const SidebarContext = createContext();

// Provider para envolver a árvore de componentes
export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useSidebar = () => {
  return useContext(SidebarContext); // Retorna os valores do contexto
};
