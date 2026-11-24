# WTF Starknet ERC-721

示例使用 Scarb 2.21.0、OpenZeppelin Cairo 4.0.1 和 Starknet.js 10.8.0。

```sh
scarb build
npm ci
```

启动支持 [Starknet.js 10 的 RPC 版本](https://starknetjs.com/)的本地开发节点。在终端设置
`DEVNET_ACCOUNT_ADDRESS` 和 `DEVNET_ACCOUNT_PRIVATE_KEY`，分别填入开发节点提供的测试账户地址和私钥。
脚本默认连接 `http://127.0.0.1:5050`，也可通过 `STARKNET_RPC_URL` 指定本地端口。

```sh
node scripts/deploy.js
```

脚本读取 Scarb 生成的 Sierra 与 CASM 文件，声明类并部署 ERC-721 合约，然后输出合约地址。
