import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  // Initially null so fresh visitors land on the Opening Choice screen as requested by faculty
  const [mode, setModeState] = useState(() => {
    return sessionStorage.getItem('petverse_user_mode') || null;
  });

  const setMode = (newMode) => {
    setModeState(newMode);
    if (newMode) {
      sessionStorage.setItem('petverse_user_mode', newMode);
    } else {
      sessionStorage.removeItem('petverse_user_mode');
    }
  };

  const resetMode = () => {
    setMode(null);
  };

  const switchToAdopt = () => setMode('adopt');
  const switchToHavePet = () => setMode('have_pet');
  const switchToShelter = () => setMode('shelter');

  const isAdopt = mode === 'adopt';
  const isHavePet = mode === 'have_pet';
  const isShelter = mode === 'shelter';
  const isUnselected = !mode;

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        resetMode,
        switchToAdopt,
        switchToHavePet,
        switchToShelter,
        isAdopt,
        isHavePet,
        isShelter,
        isUnselected,
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
