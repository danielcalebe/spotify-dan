// SidebarLeftContext.jsx 
import React, { createContext, useState, useContext } from 'react';

// Create the context 
const SidebarLeftContext = createContext();

// Provider component to wrap the component tree
export const SidebarLeftProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <SidebarLeftContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarLeftContext.Provider>
  );
};

// Custom hook to access the context 
export const useSidebarLeft = () => {
  return useContext(SidebarLeftContext); 
};