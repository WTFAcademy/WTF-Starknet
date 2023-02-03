---
title: 1. Account Abstraction
tags:
  - account
  - argent
  - braavos
  - wallet
  - starknet
  - contract
  - wtfacademy
---

# WTF is Account Abstraction

What would happen if you lose your access to the private keys of your wallet?

Nothing good, right?

Because your private key is your account, losing your key means losing your account, your money, your data. Everything.

With AA (Account Abstraction) if a user lose everything with a small mistake we can help them to recover their information, because every account is a smart contract that can contain logic and implement flow.

So allows us to use smart contract logic to specify not just the effects of the transaction, but also the fee payment and validation logic. This allows many important security benefits, such as multisig and smart recovery wallets, being able to change keys without changing wallets, and quantum-safety.


## How accounts works today?


**Ethereum has two different types of "accounts":**

* Contract Accounts
* Externally Owned Accounts (EOAs)

*EOAs is regular user accounts.*

There's some [Key differences](https://ethereum.org/en/developers/docs/accounts/) between EOAs and Contracts.

**Both account types have the ability to:**

* Receive, hold and send ETH and tokens
* Interact with deployed smart contracts




# WTF happens with accounts in AA

Account Abstraction unifies Contract Accounts and EOAs. 

It makes user accounts more ‘programmable’. You remove the logic of signing transactions from the account, and you “abstract” it out, hence account abstraction.

The new experiences you see being built are features made possible by account abstraction but not by account abstraction itself. 

It’s no longer one-account-fits-all-use-cases. Instead, each user can have an account that is adapted to their needs. 

* If you want to use a signig scheme than ECDSA, you can write an account.
* If you want to use multiples keys to authorize transactios, you can write an account.
* If you want to change the signer of your account every week, you can write an account.

Because now you have with AA "programmable transaction validity."


# Starkware & Accout Abstraction

Starkware focused in some key components of the protocol:

1. Signature abstraction:
    * Allow different account contracts to use different signature validation schemes.
2. Payment abstraction:
    * Allow different models of payment for transactions. For example, payment by another party/contract.
    * Better UX: don’t mandate a specific token (native or contract-defined) to be used for paying for transactions.
    
    You can read the hole proposal [here](https://community.starknet.io/t/starknet-account-abstraction-model-part-1/781). They took the [ERC-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a) from Ethereum and improved the model.

## Wallets 

If we talk about wallets and tools that can help us to use this model, we have two main options. Let's talk about it.

## Argent

## Braavos