## 1. 编译cairo文件
[install scarb](https://docs.swmansion.com/scarb/download.html)

scarb build

## 2. 安装starknetjs依赖
yarn

## 3. 安装katana，启动本地测试节点
[install katana](https://book.starknet.io/ch02-05-katana.html)

katana --accounts 3 --seed 0 --gas-price 250 --dev

## 4. 执行测试脚本
node scripts/deploy.js
