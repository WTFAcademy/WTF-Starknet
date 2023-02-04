---
title: 5. Dapp on StarkNet
tags:
  - cairo
  - starknet
  - starknetjs
  - wallet
  - contract
  - wtfacademy

---

# WTF StarkNet 5: StarkNet Dapp

Work in Progress... 

You will learn how to use `get-starknet` and `starknet-react` to build a simple dapp for minting NFTs on Starknet. 

A [demo](https://starknetfinal.kongtaoxing.repl.co/)

![](./img/5-1.png)

## get-starknet

[Get-starknet](https://github.com/starknet-io/get-starknet) provides a series of hooks that makes it easy to connect wallet to your DAPPs.

### 1. install

First, you need to get [VSCode](https://code.visualstudio.com/download) and [Node.js](https://nodejs.org/en/download/), then install `get-starknet` using following command:

`npm install get-starknet`

### 2. Basic Usage

Connect you DAPP with wallet using following command:

```javascript
import { connect, disconnect } from "get-starknet"

return <button onClick={() => connect()}>Connect wallet</button>
```

### 3. Advanced Usage

```javascript
import {
  type ConnectOptions,
  type DisconnectOptions,
  connect,
  disconnect,
} from "get-starknet";
return <button onClick = {() => connect({ modalMode: "alwaysAsk" })} Always ask </button>

return <button onClick = {() => connect({ 
    modalMode: "alwaysAsk",
	modalTheme: "dark",
})} Always ask with dark theme</button>

return <button onClick = {() => connect({ 
    modalMode: "alwaysAsk",
	modalTheme: "light",
})} Always ask with light theme</button>

return  <button onClick={handleConnect({ modalMode: "neverAsk" })}> Never ask </button>
 
return <button onClick={handleDisconnect()}>Disconnect</button>

return <button onClick={handleDisconnect({ clearLastWallet: true })}> Disconnect and reset </button>
```



## starknet-react

[Starknet-react](https://github.com/apibara/starknet-react)  provides a collection of React hooks for StarkNet.

### install

`npm add @starknet-react/core`