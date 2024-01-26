const { Account, RpcProvider, Contract } = require("starknet");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
    // Provider
    const provider = new RpcProvider({nodeUrl: `https://rpc.starknet-testnet.lava.build`});
    console.log("ChainID:", await provider.getChainId());

    // Account
    const privateKey = process.env.PRIVATE_KEY;
    const address = process.env.ADDRESS;
    // const account = new Account(provider, address, privateKey);

    // If this account is based on a Cairo v2 contract (for example OpenZeppelin account 0.7.0 or later), do not forget to add the parameter "1" after the privateKey parameter
    const account = new Account(provider, address, privateKey, '1');

    // Account Nonce
    const nonce = await provider.getNonceForAddress(address);
    console.log("Nonce:", Number(nonce));

    // Read Conract
    const testAddress = "0x064bc29b6a58a30f119b4e0a8cd0a637f27207991e4d92433b2b23ae16e1002d";
    // Read ABI from contract address
    const { abi: testAbi } = await provider.getClassAt(testAddress);
    if (testAbi === undefined) { throw new Error("no abi.") };
    // create contract instance
    const myTestContract = new Contract(testAbi, testAddress, provider);
    // call read_balance method
    // const bal1 = await myTestContract.read_balance();
    // you can also use call method
    const bal1 = await myTestContract.call("read_balance");
    console.log("Current Balance =", bal1.toString());

    // Write Contract
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

const runMain = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    }
}

runMain();