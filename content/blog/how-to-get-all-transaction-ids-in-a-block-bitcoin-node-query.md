---
layout: blog
title: How to get all transaction ids in a block - Bitcoin Node Query
description: "A block is a collection of transactions grouped together and added
  to the blockchain at the same time. Say you want to get all the transaction
  ids in block 84,000, you first use the `getblockhash` command to get the block
  hash. "
image: https://jeremyikwuje.link/uploads/get-all-transactions.png
date: 2024-01-19T04:22:10.387Z
---
![Command to get all transaction from a block data using jq](https://jeremyikwuje.link/uploads/get-all-transactions.png)

A block is a collection of transactions grouped and added to the blockchain simultaneously.

Say you want to get all the transaction IDs in block 84,000, you first use the `getblockhash` command to get the block hash.

```bash
hash=$(bitcoin-cli getblockhash 84000)
```
Next is to use the `getblock` command and the hash to [retrieve the block data](https://jeremyikwuje.link/how-to-get-block-data-bitcoin-node-query/).

```bash
data=$(bitcoin-cli getblock $hash)
```
Then use `jq` command to parse the data as JSON and retrieve all transaction IDs in the block.

```bash
echo $data | jq -r '.tx'
```

You will get a result of all the tx ids in the block.

  

```bash

[
	"9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f",
	"60e7e1aabe64d163e366fa9034ba7bb61759d446b0ea340203562141b6d8570a",
	"7b2dec7f13e9b509d79dc21169ec8f98d1ca78cabe86bf6d1f4b20fddd5e4276",
	"af44af0b3012b7ee6fe15a1b412442c6c5e0e118c9a71a2a9b845586d825891d",
	"d6d99862faa71310ed9208b070ebcbe2e264890582a30b531961b8d696ce30c8",
	"d91b1e32a8ae184a0625f4879fe7a861523cd17422edb69800387ba23efeaa22"
]
```

The `txids` (transaction IDs) reference individual transactions included in the block. Each transaction has a unique identifier called a transaction ID (TXID), a double SHA-256 hash of the transaction data.

Each `txid` uniquely identifies a specific transaction within the block. You can use it to reference and locate a particular transaction when needed.

Nodes on the Bitcoin network can use `txids` to request specific transactions from other nodes. When syncing or validating the blockchain, nodes can request transaction details using their `txids`.

The `txids` are part of the block header, providing cryptographic proof that a specific set of transactions is included in a particular block. The inclusion of the `txids` in the Merkle tree ensures the integrity of the transactions in the block.

When validating a block, nodes verify that the transactions within the block match the `txids` included in the block header. This verification ensures that the transactions are correctly included and haven't been altered.

Subsequent blocks in the blockchain reference the `txid` of the coinbase transaction from the previous block as part of the input to create a new coinbase transaction. This creates a chain of blocks, where each block refers to the previous block's coinbase transaction.

Indexing services and explorers use `txids` to organize and provide easy access to transaction data. Users can search for and retrieve details about specific transactions using their `txids`.