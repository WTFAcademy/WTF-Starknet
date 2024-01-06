import React, {useState} from 'react';
import {StarknetConfig, InjectedConnector} from "@starknet-react/core";
import GlobalContext from "@site/src/contexts/GlobalContext";
import { Toaster } from "react-hot-toast";

// Default implementation, that you can customize
export default function Root({children}) {
    const connectors = [
        new InjectedConnector({options: {id: "braavos"}}),
        new InjectedConnector({options: {id: "argentX"}}),
    ];

    const [uid, setUid] = useState(undefined);

    return (
      <StarknetConfig autoConnect connectors={connectors}>
        <GlobalContext.Provider value={{ uid, setUid }}>
          {children}
          <Toaster position="top-center" />
        </GlobalContext.Provider>
      </StarknetConfig>
    );
}