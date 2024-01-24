---
layout: blog
title: How to get the current block height - Bitcoin Node Query
description: Say you want to know the most recent fully validated block in the
  Bitcoin network, you run the `getblockcount` command. The `getblockcount`
  query returns the height of the most-work fully-validated chain.
image: https://jeremyikwuje.link/uploads/master-bitcoin-node-query.png
date: 2024-01-17T06:58:46.267Z
---
![Bitcoin getblockcount](https://jeremyikwuje.link/uploads/getblockcount.png)

Say you want to know the most recent fully validated block in the Bitcoin network, you run the `getblockcount` command. 

The `getblockcount` query returns the height of the most-work fully-validated chain.

The command doesn't take any argument.

```
bitcoin-cli getblockcount
```

Output:
```
825988
```
This morning, 7:26 AM WAT 16 Jan 2024, the current bitcoin block height is `825988`.

**The Bitcoin blockchain is a chain of blocks**, where each block is linked to the previous one through its header's hash.

**The most "fully validated chain"** is the longest chain of blocks that adheres to the consensus rules of the Bitcoin network. A block gets validated when it meets certain criteria, such as having a valid proof-of-work, correctly formatted transactions, and following the consensus rules defined by the Bitcoin network.

**The height of a block** is its position in the Bitcoin blockchain. The first block ( Genesis Block) has a height of 0, and each subsequent block increments the height by 1.

When you use the `getblockcount` command, it returns the height of the latest block in the most fully validated chain.

For example, the command we entered above returned a value of 825,988, which means that the chain of blocks in the Bitcoin network that is fully validated consists of 825,988 blocks (which is the "longest chain"), and the most recent block added to the chain is at height 825,988.

That being said, it is worth noting that the concept of the "longest chain" can change over time due to a phenomenon known as "chain reorganisation".

**Chain reorganisation occurs when** a longer valid chain is discovered, causing the Bitcoin nodes to switch to the new chain and potentially orphaning previously considered valid blocks.

Now that you know how to get the current block count. You can [get the hash](https://jeremyikwuje.link/how-to-get-a-block-hash-bitcoin-node-query/) of the block height or [get the block data](https://jeremyikwuje.link/how-to-get-block-data-bitcoin-node-query/).