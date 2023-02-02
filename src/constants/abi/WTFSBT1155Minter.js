export default [{
    "inputs": [{
        "internalType": "address payable",
        "name": "sbtAddr_",
        "type": "address"
    }, {"internalType": "address", "name": "signer_", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "account", "type": "address"}, {
        "indexed": true,
        "internalType": "uint256",
        "name": "soulId",
        "type": "uint256"
    }],
    "name": "SBTMinted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "oldSigner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "newSigner",
        "type": "address"
    }],
    "name": "SignerChanged",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
        "internalType": "uint256",
        "name": "soulId",
        "type": "uint256"
    }],
    "name": "getMessageHash",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "pure",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
        "internalType": "uint256",
        "name": "soulId",
        "type": "uint256"
    }, {"internalType": "bytes", "name": "signature", "type": "bytes"}],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "mintedAddress",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newSigner", "type": "address"}],
    "name": "setSigner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "signer",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "ethSignedMessageHash", "type": "bytes32"}, {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
    }],
    "name": "verify",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "wtfsbt",
    "outputs": [{"internalType": "contract WTFSBT1155", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}]