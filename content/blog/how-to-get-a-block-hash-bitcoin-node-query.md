---
layout: blog
title: How to get a block hash - Bitcoin Node Query
description: Say you want to get a block hash and you only know the block
  height, you can use the `getblockhash` to get the hash of the block.
image: https://jeremyikwuje.link/uploads/master-bitcoin-node-query.png
date: 2024-01-15T10:41:53.940Z
---
![How to get a block hash - Bitcoin](https://jeremyikwuje.link/uploads/getblockhash.png)

Say you want to get a block hash and you only know the block height, you can use the `getblockhash` to get the hash of the block.

`getblockhash` query commands only take one argument which is the height of the block. 

Let's get the hash of block 800,000.

```
bitcoin-cli getblockhash 800000
```

Result:
```
00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054
```
You can use this block hash to get the block data.


