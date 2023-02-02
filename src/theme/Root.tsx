import React from 'react';
import {GlobalContext} from "@site/src/contexts/GlobalContext";

// Default implementation, that you can customize
export default function Root({children}) {
  return (
      <GlobalContext.Provider value={{test: 1}}>
        {children}
      </GlobalContext.Provider>
  );
}