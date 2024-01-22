---
layout: blog
title: getrawtransaction - Bitcoin Node Query
description: "Say you want to get the raw information about a transaction. The
  `getrawtransaction` is a Bitcoin query command that returns the raw
  transaction data. "
image: https://jeremyikwuje.link/uploads/get-raw-transaction.png
date: 2024-01-22T05:31:57.021Z
---
![getrawtransaction - Bitcoin Node Query](https://jeremyikwuje.link/uploads/get-raw-transaction.png)

Say you want to get the raw information about a transaction. The `getrawtransaction` is a Bitcoin query command that returns the raw transaction data. 

The `getrawtransaction` can take three arguments: 

* The first argument is the transaction id (e.g. _9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f_). 
* The second argument (optional, default is `false`) is the verbosity which indicates the response type. If false, return a string (encoded), otherwise return a JSON object. 
* The third argument (optional) is the block hash, the block in which to look for the transaction.

For example, the coinbase transaction id of [block 84,000](https://jeremyikwuje.link/how-to-get-the-coinbase-transaction-in-a-block-bitcoin-node-query/) is `9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f`. The command below returns the raw transaction data as a string (hex-encoded).

```bash
bitcoin-cli getrawtransaction 9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f
```
Output:
```bash
01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000
```
If we specify the verbosity (second argument) as `true`, it will return the transaction data in JSON.

```bash
01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000 true
```
Output:
```bash
{
  "blockhash": "00000000001385326e30864192ba84ed2f9cbfadf0698655b1c25f93c92f22ad",
  "blocktime": 1286505070,
  "confirmations": 742781,
  "hash": "9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f",
  "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000",
  "locktime": 0,
  "size": 135,
  "time": 1286505070,
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
      "value": 50.0
    }
  ],
  "vsize": 135,
  "weight": 540
}
```

Normally, the `getrawtransaction` request shows a transaction only if it's in the mempool.

However, if the `-txindex` option is turned on and no blockhash is provided, it will display the transaction whether it's in the mempool or in any block.

If a blockhash is given, it will show the transaction only if that particular block is accessible and the transaction is inside that block.

If you are looking to get transaction data of an in-wallet transaction, then you can use the `gettransaction` query instead.