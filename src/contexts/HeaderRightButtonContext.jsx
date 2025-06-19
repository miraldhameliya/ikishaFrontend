import React, { createContext, useContext, useState } from 'react';

const HeaderRightButtonContext = createContext();

export const useHeaderRightButton = () => useContext(HeaderRightButtonContext);

export const HeaderRightButtonProvider = ({ children }) => {
  const [rightButton, setRightButton] = useState(null);
  return (
    <HeaderRightButtonContext.Provider value={{ rightButton, setRightButton }}>
      {children}
    </HeaderRightButtonContext.Provider>
  );
};
