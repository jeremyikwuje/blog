---
layout: blog
title: gettransaction RPC - Bitcoin Node Query
description: The RPC `gettransaction` retrieves detailed information about an
  in-wallet transaction. "in-wallet transactions" are those transactions that
  are tracked and managed by a Bitcoin wallet.
image: https://jeremyikwuje.link/uploads/gettransaction.png
date: 2024-01-29T05:46:28.734Z
---
![gettransaction - Bitcoin RPC](https://jeremyikwuje.link/uploads/gettransaction.png)

The `gettransaction` retrieves detailed information about an in-wallet transaction.

It takes three arguments:

* **txid** (string, required): This is the id of the in-wallet transaction you want to retrieve. It is required you specify the transaction ID.

* **include_watchonly** (boolean, optional, default=true): Specifying this argument determines whether to include watch-only addresses in balance calculation and details. You don't need to specify the argument, the default value is `true`.

* **verbosity** (boolean, optional, default=true): Specifying this argument determines whether to include a `decoded` field containing the decoded transaction (equivalent to RPC [decoderawtransaction](https://jeremyikwuje.link/decoderawtransaction-bitcoin-node-query/)).

Say you have the txid of an in-wallet transaction e.g *1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d*, the command below, get the transaction details.

```
bitcoin-cli gettransaction 1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d
```

By adding false in the second argument, you can specify not to include watch-only addresses in balance calculation and details.

```
bitcoin-cli gettransaction 1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d false
```

By adding `true` as the third argument, you can specify to include a `decoded` field containing the decoded transaction.

```
bitcoin-cli gettransaction 1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d false true
```
*Nb: You must specify the in-wallet file in the bitcoin configuration file `bitcoin.conf` or when running the bitcoin-cli command. To quickly do this trying adding `-rpcwallet=<filename>` option to the bitcoin-cli command line.*

```
bitcoin-cli gettransaction 1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d -rpcwallet=/wallet/filename
```

## What are in-wallet transactions
In the context of Bitcoin transactions, there are two types of Bitcoin wallet terminology: standard wallets and watch-only wallets.

A standard wallet can recieve and send bitcoins. But watch-only wallets cannot spend (send) bitcoins but can monitor and display transaction information for specific addresses.

When you use a standard wallet to receive or send bitcoins, the wallet software keeps track of the transactions associated with your wallet addresses. These transactions are considered "in-wallet" because the wallet is aware of them, and they contribute to the wallet's balance.

In a watch-only wallet, you can import or "watch" addresses from your standard wallet or external sources. Transactions involving these watched addresses are considered "in-wallet" for the watch-only wallet, even though it cannot sign transactions or control the associated funds.

"in-wallet transactions" are those transactions that are tracked and managed by a Bitcoin wallet, either a standard wallet capable of spending bitcoins or a watch-only wallet that can only monitor transactions for specific addresses.
 
The `gettransaction` query provides detailed information about these transactions for wallets that can spend or monitor (lookup) bitcoins.


