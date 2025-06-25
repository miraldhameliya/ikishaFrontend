import React, { createContext, useContext, useState } from 'react';

const HeaderRightButtonContext = createContext();

export const useHeaderRightButton = () => useContext(HeaderRightButtonContext);

export const HeaderRightButtonProvider = ({ children }) => {
  const [rightButtonProps, setRightButtonProps] = useState(null);
  return (
    <HeaderRightButtonContext.Provider value={{ rightButtonProps, setRightButtonProps }}>
      {children}
    </HeaderRightButtonContext.Provider>
  );
};
