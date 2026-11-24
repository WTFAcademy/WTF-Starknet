const { Account, RpcProvider, Contract, number } = require("starknet");

const main = async () => {
    const { STARKNET_RPC_URL, CONTRACT_ADDRESS: testAddress, ADDRESS, PRIVATE_KEY } = process.env;
    const write = process.argv.includes("--write");
    if (!STARKNET_RPC_URL || !testAddress) {
        throw new Error("Set STARKNET_RPC_URL and CONTRACT_ADDRESS for a compatible local devnet.");
    }
    if (write && (!ADDRESS || !PRIVATE_KEY)) {
        throw new Error("Set ADDRESS and PRIVATE_KEY for the local devnet account before using --write.");
    }
    const provider = new RpcProvider({ nodeUrl: STARKNET_RPC_URL });
    console.log("ChainID:", await provider.getChainId());

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

    if (!write) return;

    const account = new Account(provider, ADDRESS, PRIVATE_KEY, "1");
    const nonce = await provider.getNonceForAddress(ADDRESS);
    console.log("Nonce:", Number(nonce));

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
        process.exitCode = 1;
    }
}

runMain();