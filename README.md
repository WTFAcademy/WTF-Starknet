# WTF Academy StarkNet
Todo list of WTF Academy StarkNet during StarkNet Building Hacker House Tel Aviv, 31st Jan-7th Feb, 2023.

## Background
1. WTF Academy is a web3 open-source university for developers.
  - WTF Solidity (5,700 ⭐): https://github.com/AmazingAng/WTF-Solidity
  - WTF Ethers (1,100 ⭐): https://github.com/WTFAcademy/WTF-Ethers
  - Integrated Education Platform (3,300 users): https://wtf.academy
  
2. WTF Academy StarkNet is a platform to onboard developers to StarkNet, which includes tutorial, examples, and on-chain certificates.

## Todo and Progress

### 1. Tutortials
Minimal tutorials on StarkNet, assuming the learners have Ethereum develop experience.
- Account Abstraction: @ocandocrypto
- Cairo: @hasselalcala [Draft] [Quiz]
- Tooling: @hasselalcala [Draft]
- StarkNet.js @AmazingAng [Draft]
- Build a minimal Dapp
  
### 2. Frontend

Build a website for WTF StarkWare based on Docusaurus.
  - dashboard page
  - tutorial page
  - quiz page
  - certificate page

### 3. Backend
  - quiz backend
  - certificate backend

### 4. Contract 
Build a SBT contract for certificates on starknet.
  - certificate contract

### 5. Design
  - web design ([Figma](https://www.figma.com/file/dZiNEsfG5Nkc1uQFy3agEk)): [@tankxu](https://github.com/tankxu)
  - logo design
  
### 6. Project Management
  - github todo list [x]
  
## How to contribute

We will manage the project on Github (yes, this repo), so you can see all the tasks and contributors here.

1. Read [Project Brief](https://onlydust.notion.site/WTF-Academy-StarkNet-cec45bfe02694dbc895eb42e8f3f1c31)
2. Contact project lead 0xAA's Telegram (@not0xAA) or [Twitter](https://twitter.com/0xAA_Science), briefly introduct yourself and which part you want contribute.
3. You can create a PR update your github ID after corresponding tasks, or I will do it for you.

## Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
