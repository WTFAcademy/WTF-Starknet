const { Account, RpcProvider, Contract } = require("starknet");

async function main() {
    const { STARKNET_RPC_URL, CONTRACT_ADDRESS, ADDRESS, PRIVATE_KEY } = process.env;
    const write = process.argv.includes("--write");
    if (!STARKNET_RPC_URL || !CONTRACT_ADDRESS) {
        throw new Error("Set STARKNET_RPC_URL and CONTRACT_ADDRESS for your network.");
    }
    if (write && (!ADDRESS || !PRIVATE_KEY)) {
        throw new Error("Set ADDRESS and PRIVATE_KEY for the local devnet account before using --write.");
    }
    const provider = new RpcProvider({ nodeUrl: STARKNET_RPC_URL });
    console.log("Chain ID:", await provider.getChainId());
    const { abi } = await provider.getClassAt(CONTRACT_ADDRESS);
    if (!abi) throw new Error("No ABI found for the contract.");

    const contract = new Contract({ abi, address: CONTRACT_ADDRESS, providerOrAccount: provider });
    console.log("Current balance:", String(await contract.read_balance()));
    if (!write) return;

    const account = new Account({ provider, address: ADDRESS, signer: PRIVATE_KEY });
    contract.connect(account);
    const { transaction_hash } = await contract.set_balance(999);
    const receipt = await provider.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) throw new Error("The transaction did not succeed.");
    const event = receipt.events.find(({ from_address }) => BigInt(from_address) === BigInt(CONTRACT_ADDRESS));
    console.log("Event:", event);
    console.log("New balance:", String(await contract.read_balance()));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
