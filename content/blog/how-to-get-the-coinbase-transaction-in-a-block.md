---
layout: blog
title: How to get the coinbase transaction in a block
description: Say you want to get the coinbase transaction of block 84,000, you
  first use the `getblockhash` command to get the block hash. The coinbase
  transaction is a special type of transaction that is included in each block as
  the first transaction.
image: https://jeremyikwuje.link/uploads/coinbase-transaction.png
date: 2024-01-17T15:33:22.096Z
---
![Command to get coinbase transaction from a block data using jq](https://jeremyikwuje.link/uploads/coinbase-transaction.png)

Say you want to get the coinbase transaction of block 84,000, you first use the `getblockhash` command to get the block hash. 

```
hash=$(bitcoin-cli getblockhash 84000)
```
Next is to use the `getblock` command and the hash to retrieve the block data.

```
data=$(bitcoin-cli getblock $hash 2)
```

Then use  `jq` command to parse the data as JSON and retrieve the first transaction.

```
echo $data | jq -r '.tx[0]'
```
You will get a result of the coinbase transaction.

```
{
  "hash": "9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f",
  "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000",
  "locktime": 0,
  "size": 135,
  "txid": "9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f",
  "version": 1,
  "vin": [
    {
      "coinbase": "04a3b2311b028611",
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "n": 0,
      "scriptPubKey": {
        "asm": "040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176 OP_CHECKSIG",
        "desc": "pk(040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176)#rzwvwd7r",
        "hex": "41040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac",
        "type": "pubkey"
      },
...
```

## What is the Coinbase transaction?

A Bitcoin block is a collection of transactions grouped together and added to the blockchain at the same time.

Blocks are linked to the previous blocks through their headers, forming a chain.

The coinbase transaction is a special type of transaction that is included in each block as the first transaction.

It is called "coinbase" because it is the transaction that rewards the miner with newly created bitcoins for successfully mining the block.

The primary purpose of the coinbase transaction is to reward the miner for their effort in solving the proof-of-work puzzle and successfully adding a new block to the blockchain.

In addition to the mining reward, the coinbase transaction often includes the collected transaction fees from the other transactions in the block.

The block reward in the coinbase transaction decreases over time through a process known as the "halving," where the number of newly created bitcoins awarded to miners is reduced by half approximately every four years.



