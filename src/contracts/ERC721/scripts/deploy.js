import { readFile } from "node:fs/promises";
import { Account, CallData, RpcProvider } from "starknet";

const rpc = new URL(process.env.STARKNET_RPC_URL ?? "http://127.0.0.1:5050");
const { DEVNET_ACCOUNT_ADDRESS: address, DEVNET_ACCOUNT_PRIVATE_KEY: signer } = process.env;
if (!["127.0.0.1", "localhost", "[::1]"].includes(rpc.hostname) || !address || !signer) {
  throw new Error("Set DEVNET_ACCOUNT_ADDRESS and DEVNET_ACCOUNT_PRIVATE_KEY for a local devnet.");
}

const artifacts = new URL("../target/dev/", import.meta.url);
const loadArtifact = async (suffix) =>
  JSON.parse(await readFile(new URL(`wtf_starknet_example_WTF.${suffix}.json`, artifacts), "utf8"));

const [contract, casm] = await Promise.all([
  loadArtifact("contract_class"),
  loadArtifact("compiled_contract_class"),
]);
const provider = new RpcProvider({ nodeUrl: rpc.href });
const account = new Account({ provider, address, signer });
const constructorCalldata = new CallData(contract.abi).compile("constructor", {
  name: "WTF Test Token",
  symbol: "WTF",
});

const declared = await account.declareIfNot({ contract, casm });
const deployed = await account.deploy({ classHash: declared.class_hash, constructorCalldata });
const receipt = await provider.waitForTransaction(deployed.transaction_hash);
if (!receipt.isSuccess()) throw new Error("Deployment failed");
console.log("WTF ERC-721:", deployed.contract_address[0]);
