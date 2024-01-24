---
layout: blog
title: How to get block data - Bitcoin Node Query
description: Say you want to get the data contained in a block. To get this data
  by querying the Bitcoin Node, you will use the `getblock` query.  `getblock`
  takes one or two arguments.
image: https://jeremyikwuje.link/uploads/master-bitcoin-node-query.png
date: 2024-01-16T11:13:31.457Z
---
![How to get block data](https://jeremyikwuje.link/uploads/getblock.png) A block is a collection of data that represents a set of transactions that have been verified and confirmed by the Bitcoin network.

Say you want to get the data contained in a block.

To get this data by querying the Bitcoin Node, you will use the `getblock` query.

`getblock` takes one or two arguments.

The first argument is the _blockhash_ - hash of the block you are interested in.

The optional second argument determines the kind of data you want the Bitcoin node to return. It can take values 0, 1, 2, and 3. 0 for hex-encoded data, 1 for a JSON object, 2 for a JSON object with transaction data, and 3 for a JSON object with transaction data including `prevout` information for inputs. The default value for the second argument is 1. If you didn't specify the second argument, the default value is 1.

Let's get the data of the block `800,000`. Using, the `getblockhash` command, we first [generate the hash of the block height](https://jeremyikwuje.link/how-to-get-a-block-hash-bitcoin-node-query/) which is `00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054`. Then use the `getblock` query to get the block data from the hash.

The following query returns the block data of block 800,000.

```
bitcoin-cli getblock 00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054

```

Result:

```
{
  "bits": "17053894",
  "chainwork": "00000000000000000000000000000000000000004fc85ab3390629e495bf13d5",
  "confirmations": 25877,
  "difficulty": 53911173001054.59,
  "hash": "00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054",
  "height": 800000,
  "mediantime": 1690165851,
  "merkleroot": "91f01a00530c8c83617190048ea8b0814d506cf24dfdbcf8893f8f0cab7f0855",
  "nTx": 3721,
  "nextblockhash": "00000000000000000000e26b239cf19ec7ace5edd9694d51a3f6933247720947",
  "nonce": 106861918,
  "previousblockhash": "000000000000000000012117ad9f72c1c0e42227c2d042dca23e6b96bd9fbb55",
  "size": 1634536,
  "strippedsize": 786115,
  "time": 1690168629,
  "tx": [
    "b75ca3106ed100521aa50e3ec267a06431c6319538898b25e1b757a5736f5fb4",
    "d41f5de48325e79070ccd3a23005f7a3b405f3ce1faa4df09f6d71770497e9d5",
    "c2f59c6fc8e812f5f1f00c8a0a9ab1929c1e796788c57f49001b8006a824ea17",
    "965f866bf8623bbf956c1b2aeec1efc1ad162fd428ab7fb89f128a0754ebbc32",
    "6033990087599ce3cc6fd6f90694736fb9d7912bf5b2eec973389adf29066634",
    "9f93590c52c2f8c2090b111db3202cd02853cc674be5535aa29813cafa685ce9",
    "b8075e230cabaf8318a5247c0c91b1de03b2b63336898d0cf2dd222e56fe592a",
    ...
  ],
  "version": 874340352,
  "versionHex": "341d6000",
  "weight": 3992881
}

```

We didn't specify the second argument, so it takes the default 1, which returns the block data in JSON. The `tx` property only shows the transaction IDs of the transaction outputs in the block which may be enough information for your needs.

Try specifying the second argument, either 2 or, 3 to get more extended block data including inputs and outputs transactions.

**When the second argument is 2:**

```
bitcoin-cli getblock 00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054 2

```

Returned more information about each transaction, including fees, inputs and outputs.

```
 {
      "fee": 5.59e-06,
      "hash": "07b7639ca14f15b8b74e7c9339f7204561e87c0c2f6fc97b55a93339fa385602",
      "hex": "02000000000101ada5e93d0d7187666da2d02b95053f0e648ee549beead9cc39001fad86ce6b8500000000000000000001f19e0700000000001600149549a8a78144db492bedbbe57b99343d034bfafb01408725b5708b34e9c77a537ebfd6f18bae78f6f67c1a4da15098a44ccad802998fddcc225023731c8729461ebee6eebf1a200a0df86a141aff703dc6a572db5438ff340c00",
      "locktime": 799999,
      "size": 150,
      "txid": "b2088e443cf4b28ade8873cc6b3f6a67557f104ec4dc5b5e293c12973ab8b6b8",
      "version": 2,
      "vin": [
        {
          "scriptSig": {
            "asm": "",
            "hex": ""
          },
          "sequence": 0,
          "txid": "856bce86ad1f0039ccd9eabe49e58e640e3f05952bd0a26d6687710d3de9a5ad",
          "txinwitness": [
            "8725b5708b34e9c77a537ebfd6f18bae78f6f67c1a4da15098a44ccad802998fddcc225023731c8729461ebee6eebf1a200a0df86a141aff703dc6a572db5438"
          ],
          "vout": 0
        }
      ],
      "vout": [
        {
          "n": 0,
          "scriptPubKey": {
            "address": "bc1qj4y63fupgnd5j2ldh0jhhxf585p5h7hm0gzjfc",
            "asm": "0 9549a8a78144db492bedbbe57b99343d034bfafb",
            "desc": "addr(bc1qj4y63fupgnd5j2ldh0jhhxf585p5h7hm0gzjfc)#3ze4scwd",
            "hex": "00149549a8a78144db492bedbbe57b99343d034bfafb",
            "type": "witness_v0_keyhash"
          },
          "value": 0.00499441
        }
      ],
      "vsize": 99,
      "weight": 396
 }

```

**When the second argument (verbosity) is 3:**

```
bitcoin-cli getblock 00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054 3

```

A difference you may notice when the second argument is 2 and 3 is information about the previous inputs included in the transaction data.

```
 "prevout": {
            "generated": false,
            "height": 799994,
            "scriptPubKey": {
              "address": "bc1pwfcrwuzxtfdh0p4satyexsg80p007d5vg6je2nnhtsy039ndlxlqpvzusf",
              "asm": "1 72703770465a5b7786b0eac9934107785eff368c46a5954e775c08f8966df9be",
              "desc": "rawtr(72703770465a5b7786b0eac9934107785eff368c46a5954e775c08f8966df9be)#a4l8g0vq",
              "hex": "512072703770465a5b7786b0eac9934107785eff368c46a5954e775c08f8966df9be",
              "type": "witness_v1_taproot"
            },
            "value": 1.108e-05
},
```