import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    return localStorage.getItem('petverse_user_mode') || 'adopt';
  });

  const setMode = (newMode) => {
    setModeState(newMode);
    localStorage.setItem('petverse_user_mode', newMode);
  };

  const switchToAdopt = () => setMode('adopt');
  const switchToHavePet = () => setMode('have_pet');

  const isAdopt = mode === 'adopt';
  const isHavePet = mode === 'have_pet';

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        switchToAdopt,
        switchToHavePet,
        isAdopt,
        isHavePet,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
