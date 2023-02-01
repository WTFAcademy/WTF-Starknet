import {Provider, Contract, Account, ec} from 'starknet';
import 'dotenv/config';
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }) // for testnet 1

const main = async () => {
    // 输出chainId
    console.log(await provider.getChainId());

    // 获取账号nonce
    const addr = "0x06b59aEC7b1cC7248E206abfabe62062ba1aD75783E7A2Dc19E7F3f351Ac3309"
    const nonce = await provider.getNonceForAddress(addr)
    console.log(Number(nonce));

    // 读取合约 
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

    // Account.execute: 在你调用需要证明你拥有帐户私钥的合约函数时，必须使用此方法调用目标函数
    // const executeHash = await account.execute(
    //     {
    //       contractAddress: myContractAddress,
    //       entrypoint: 'transfer',
    //       calldata: stark.compileCalldata({
    //         recipient: receiverAddress,
    //         amount: ['10']
    //       })
    //     }
    //   );
    // await provider.waitForTransaction(executeHash.transaction_hash);
    
    // 读取事件
    const result2 = await myTestContract.set_balance(222);
    const txReceiptDeployTest = await provider.waitForTransaction(result2.transaction_hash);
    console.log("events =",txReceiptDeployTest.events);





      






}
main()