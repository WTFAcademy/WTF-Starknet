import {RpcProvider, Account, Contract, json, stark, uint256, shortString, num, CallData, cairo} from 'starknet';
import fs from "fs";

// start local node 
// katana --accounts 3 --seed 0 --gas-price 250 --dev
const RPC = "http://127.0.0.1:5050"
// kanata default account and privateKey
const deployAddress = "0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973"
const deployPk = "0x1800000000300000180000000000030000000000003006001800006600"
async function deploy() {
    const provider = new RpcProvider({ nodeUrl: RPC });
    const deployAccount = new Account(provider, deployAddress, deployPk);

    const compiled = json.parse(fs.readFileSync( "target/dev/wtf_starknet_example_WTF.contract_class.json").toString( "ascii"));
    const cams = json.parse(fs.readFileSync( "target/dev/wtf_starknet_example_WTF.compiled_contract_class.json").toString( "ascii"));

    const compiler = new CallData(compiled.abi);
    const constructorCallData = compiler.compile("constructor", {
        name: "WTF Test Token",
        symbol: "WTF"
    });

    const declareResponse = await deployAccount.declareIfNot({
        contract: compiled,
        casm: cams
    })

    const invokeResponse = await deployAccount.deploy({
        classHash: declareResponse.class_hash,
        constructorCalldata: constructorCallData
    })

    const WTFAddress = invokeResponse.contract_address[0];
    console.log("WTFAddress:", WTFAddress);
}

deploy().then().catch();