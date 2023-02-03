import React from 'react';
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";

// Default implementation, that you can customize
export default function Root({children}) {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  return <StarknetConfig connectors={connectors}>{children}</StarknetConfig>;
}