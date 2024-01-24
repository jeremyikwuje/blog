---
layout: blog
title: decoderawtransaction - Bitcoin Node Query
description: "The `decoderawtransaction` RPC command provides a way to decode
  and interpret the raw, hex-encoded transaction data returned by
  `getrawtransaction`. "
image: https://jeremyikwuje.link/uploads/decoderawtransaction.png
date: 2024-01-23T09:09:49.047Z
---
![decoderawtransaction Bitcoin RPC](https://jeremyikwuje.link/uploads/decoderawtransaction.png)
Say you have the serialized, hex-encoded string representing a transaction and want to return the transaction data in a JSON object.

`decoderawtransaction` is an RPC function that returns a JSON object representing the serialized, hex-encoded transaction.

The `decoderawtransaction` takes two arguments:

1. **hexstring**: This is the transaction hex-encoded string. This argument is required.

2. **iswitness**: The optional second argument takes a boolean value (true or false), whether the transaction hex is a serialized witness transaction.

If `iswitness` is absent, heuristic tests will be used to decode the raw transaction. If true, only witness deserialization will be tried. If false, only non-witness deserialization will be tried.

For example, the hex-encoded string of the coinbase transaction of [block 84,000](https://jeremyikwuje.link/how-to-get-the-coinbase-transaction-in-a-block-bitcoin-node-query/) is:

```bash
01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000
```
Grabing the transaction hex string, you can use the `decoderawtransaction` command as below:

```bash
bitcoin-cli decoderawtransaction 01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804a3b2311b028611ffffffff0100f2052a010000004341040ea70cd9bc1996e8b777b2f17d9b680671c4b0b2474991b8b029d574e7a12c44e8e4a06fa4cb14983b89f19577259eb5022ca655d8120fa3ac7a03d7e5da4176ac00000000
```

Output:

```bash
{
  "hash": "9faa752b6099a8fa58681580540a8450b02304535d97cdd5bcd0617526dd374f",
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
      "value": 50.0
    }
  ],
  "vsize": 135,
  "weight": 540
}
```

The `decoderawtransaction` RPC command provides a way to decode and interpret the raw, hex-encoded transaction data returned by `getrawtransaction`. 

While `getrawtransaction` retrieves the [raw transaction data](https://jeremyikwuje.link/getrawtransaction-bitcoin-node-query/) in hexadecimal format, `decoderawtransaction` parses and formats this data into a more human-readable and structured JSON object.

Of course, by specifying *verbosity=true*, you can use the `getrawtransaction`to get a more  human-readable and structured JSON object of a Bitcoin transaction. 

However, some Bitcoin scripts, especially complex ones, are represented in raw hexadecimal form in the raw transaction data. `decoderawtransaction` interprets and decodes these scripts, providing a more user-friendly representation of the script operations and conditions.

Also, the  `decoderawtransaction` provides details about the script signatures and public keys involved in the transaction, which can be valuable when examining the transaction's security and verification aspects.