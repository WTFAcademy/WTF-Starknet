md title="docs/ERC721.md"
---
sidebar_position: 1
---

# WTF is ERC721?

The ERC721 standard is used to represent non-fungible tokens. The most popular use case has been PFP (Profile Picture) NFTs, commonly used to create digital online identities. Other use cases include tokenization of digital assets, memorabilia for experiences, and digital art. Thanks to OpenZeppelin, they developed an ERC721 Cairo implementation that supports any use case that can be done with the Solidity implementation.

## WTF is Cairo's Uint256?

Everything in Cairo is represented by felt. felt stands for Field Element, the only data type in Cairo. it is 251 bits unsigned integer.

Because a uint256 number has 256 bits in size, it can not be represented by a 251-bit felt. Therefore, it is necessary to split the uint256 number into two components: low and high. The low component represents the low 128 bits of the uint256 number, and the high component is the high 128 bits of the uint256 number. The binary value of low and high are padded with leading 0s up to the maximum resolution and put together side by side to form the uint256 number.

Uint256 is defined as a struct:

```
struct Uint256 {
    low: felt,

    high: felt,
}
```

# How to deploy an ERC721

To deploy an ERC721, let's use the following (OpenZeppelin contract)[https://github.com/OpenZeppelin/cairo-contracts/blob/release-v0.5.0/src/openzeppelin/token/erc721/presets/ERC721MintableBurnable.cairo] to work and deploy in the testnet.

First, we need to create and starknet account and the public key, run the following command:

``` 
starknet new_account
```

Go to the goerli faucet and obtain some funds, this are necessary to deploy the account. Once, you have funds, let's deploy the account: 

```
deploy_account 
```

Now, to build our ERC721 contract, create a new contract and copy the contract that provide in the (OpenZeppelin contract)[https://github.com/OpenZeppelin/cairo-contracts/blob/release-v0.5.0/src/openzeppelin/token/erc721/presets/ERC721MintableBurnable.cairo], save it and compile it: 

```
starknet-compile contracts/ERC721_exercise01.cairo --output contracts/artifacts/ERC721.json
```

If everything is ok, now we are going to check our constructor. This constructor expects 3 arguments name, symbol and owner, this arguments are declared as felt type but we are going to define name and symbol arguments as a string, to transform string or hex to a felt Starkware provides a "utils.py" file to do it and then use the correct values to send it to the constructor. The file is (here)[https://github.com/hasselalcala/workshop_ERC721_Starknet/blob/main/utils.py]

Run the following:

```
python -i utils.py

str_to_felt("ANIMAL") 
$ 71804493054284 <--- argument 1 

str_to_felt("ANI") 
$ 4279881 <--- argument 2 

hex_to_felt("0x01432C1d26d4b210A8cd7e3418F5aad4886FCA75b579da88D73c3C0902E192dD") <---- we use our argent wallet address 
$ 570996064690495235118339479854624184141230437508569589214736207591531188957 <--- argument 3
```

With this arguments, we can declare and deploy our contract, as follows:

```
starknet declare --contract contracts/artifacts/ERC721.json --account=[ARGENT_WALLET_ADDRESS] --network alpha-goerli --no_wallet --sender [ARGENT_WALLET_ADDRESS] --max_fee 1
```

We obtain the contract class hash, that is use it to deploy the contract.

Declare transaction was sent. 
Contract class hash: 0x4769fe9a34a934c169acbc3cb4d7e0a14c66545ca2eed0df9ab658c1015e596 <-- use this value to deploy the contract Transaction hash: 0x2f5d5541776af32faf248458dd728e4c43e92d1b36ecfcd1acb733432782d96

To deploy

```
starknet deploy --inputs 71804493054284 4279881 570996064690495235118339479854624184141230437508569589214736207591531188957 --network alpha-goerli --class_hash 0x4769fe9a34a934c169acbc3cb4d7e0a14c66545ca2eed0df9ab658c1015e596
```

Once the contract is deploy we going to the contract using voyager and mint a new token using the address to define the owner of the toekn and a token_id.


