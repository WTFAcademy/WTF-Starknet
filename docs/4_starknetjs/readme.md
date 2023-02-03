## Introduction to StarkNet.js

## Install with `npm`

```shell
npm install starknet
```

## Provider

```js
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }) // for testnet 1
// output chainId
console.log(await provider.getChainId());
```

## Get Account Nonce

```js
const addr = "0x06b59aEC7b1cC7248E206abfabe62062ba1aD75783E7A2Dc19E7F3f351Ac3309"
const nonce = await provider.getNonceForAddress(addr)
console.log(Number(nonce));
```

## A Simple Contract

```python
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

// 定义余额变量，类型：felt.
@storage_var
func balance() -> (res: felt) {
}

@event
func log_data(value: felt) {
}


// 设置余额balance.
@external
func set_balance{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}(amount: felt) {
    balance.write(amount);
    // 释放事件
    log_data.emit(amount);
    return ();
}

// 读取余额balance.
@view
func read_balance{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}() -> (amount: felt) {
    let (res) = balance.read();
    return (amount=res);
}
```

## Read Contract

```js
const testAddress = "0x0352654644b53b008b9fd565846cca116c0911d0eeabb57df00b55ed77ad211e";
// 读取abi
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
// 生成合约对象
const myTestContract = new Contract(testAbi, testAddress, provider);
// 调用合约的 read_balance 方法读取余额
const bal1 = await myTestContract.read_balance();
// 或者使用call
// const bal1 = await myTestContract.call("read_balance");
console.log("Current Balance =", bal1.toString()); // .res because the  return value is called 'res' in the cairo contract
```

## Write Contract

```js
// 写入合约
const privateKey = process.env.PRIVATE_KEY;
console.log(privateKey)
const accountAddr = "0x06b59aEC7b1cC7248E206abfabe62062ba1aD75783E7A2Dc19E7F3f351Ac3309";
const starkKeyPair = ec.getKeyPair(privateKey);
const account = new Account(provider, accountAddr, starkKeyPair);
// Connect account with the contract
myTestContract.connect(account);
// 或者使用invoke来写入合约
// const result = await myTestContract.invoke("set_balance", [888]);
const result = await myTestContract.set_balance(999);
await provider.waitForTransaction(result.transaction_hash);
const bal2 = await myTestContract.read_balance();
console.log("New Balance =", bal2.toString());
```

## Write Contract with Verification
```js
// Account.execute: 在你调用需要证明你拥有帐户私钥的合约函数时，必须使用此方法调用目标函数
const executeHash = await account.execute(
    {
      contractAddress: myContractAddress,
      entrypoint: 'transfer',
      calldata: stark.compileCalldata({
        recipient: receiverAddress,
        amount: ['10']
      })
    }
  );
await provider.waitForTransaction(executeHash.transaction_hash);
```

## Read Events

```js
// 读取事件
const result2 = await myTestContract.set_balance(222);
const txReceiptDeployTest = await provider.waitForTransaction(result2.transaction_hash);
console.log("events =",txReceiptDeployTest.events);
```