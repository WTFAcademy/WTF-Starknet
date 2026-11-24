import React, {useState} from 'react';
import { StarknetConfig, argent, braavos, publicProvider } from "@starknet-react/core";
import { mainnet } from "@starknet-react/chains";

const connectors = [braavos(), argent()];
const provider = publicProvider();
import GlobalContext from "@site/src/contexts/GlobalContext";
import { Toaster } from "react-hot-toast";

// Default implementation, that you can customize
export default function Root({children}) {

    const [uid, setUid] = useState(undefined);

    return (
      <StarknetConfig autoConnect chains={[mainnet]} provider={provider} connectors={connectors}>
        <GlobalContext.Provider value={{ uid, setUid }}>
          {children}
          <Toaster position="top-center" />
        </GlobalContext.Provider>
      </StarknetConfig>
    );
}