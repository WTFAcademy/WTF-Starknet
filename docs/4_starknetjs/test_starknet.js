import {Provider, Contract, Account, ec, number} from 'starknet';
import 'dotenv/config';
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }) // for testnet 1

const main = async () => {
    // output chainId
    console.log("Chain ID: ", await provider.getChainId());

    // get account nonce
    const addr = "0x06b59aEC7b1cC7248E206abfabe62062ba1aD75783E7A2Dc19E7F3f351Ac3309"
    const nonce = await provider.getNonceForAddress(addr)
    console.log(Number(nonce));

    // read contract 
    const testAddress = "0x0352654644b53b008b9fd565846cca116c0911d0eeabb57df00b55ed77ad211e";
    // Read ABI from contract address
    const { abi: testAbi } = await provider.getClassAt(testAddress);
    if (testAbi === undefined) { throw new Error("no abi.") };
    // create contract instance
    const myTestContract = new Contract(testAbi, testAddress, provider);
    // call read_balance method
    const bal1 = await myTestContract.read_balance();
    // you can also use call method
    // const bal1 = await myTestContract.call("read_balance");
    console.log("Current Balance =", bal1.toString()); // .res because the  return value is called 'res' in the cairo contract

    // Write contract
    const privateKey = process.env.PRIVATE_KEY;
    console.log(privateKey)
    const accountAddr = "0x06b59aEC7b1cC7248E206abfabe62062ba1aD75783E7A2Dc19E7F3f351Ac3309";
    const starkKeyPair = ec.getKeyPair(privateKey);
    const account = new Account(provider, accountAddr, starkKeyPair);
    // Connect account with the contract
    myTestContract.connect(account);
    // or you can use invoke
    // const result = await myTestContract.invoke("set_balance", [888]);
    const result = await myTestContract.set_balance(999);
    const txReceiptDeployTest = await provider.waitForTransaction(result.transaction_hash);
    const bal2 = await myTestContract.read_balance();
    console.log("New Balance =", bal2.toString());

    // account.execute: when you interacat with the function that need the proof that you have the private key of the account.
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
    
    // Events
    // there are multiple events in the tx, because ERC20 and argent tx also emit events.
    // we need to filter out the event that we care    
    const events = txReceiptDeployTest.events;
    const event = events.find(
        (it) => number.cleanHex(it.from_address) === number.cleanHex(testAddress)
      ) || {data: []};
    console.log("event: ", event);

}
main()