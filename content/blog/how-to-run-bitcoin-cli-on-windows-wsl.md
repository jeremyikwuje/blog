---
layout: blog
title: How to run Bitcoin CLI on Windows (WSL)
description: In this tutorial, I will guide you through the process of
  provisioning Windows Subsystem for Linux (WSL) and running the Bitcoin CLI
  inside it.
image: https://jeremyikwuje.link/uploads/bitcoin-cli-windows-wsl.png
date: 2024-01-09T10:10:59.226Z
---
![How to Install Bitcoin CLI on Windows WSL](https://jeremyikwuje.link/uploads/bitcoin-cli-windows-wsl.png)

In this tutorial, I will guide you through the process of provisioning Windows Subsystem for Linux (WSL) and running the Bitcoin CLI inside it.

The difficulty in using the Bitcoin CLI on Windows **without** setting up WSL is that you might encounter errors when attempting to connect to an external Bitcoin node or performing intricate configurations.

```
error: timeout on transient error: Could not connect to the server 35:8332 (error code 1 - "EOF reached")

Make sure the bitcoind server is running, and that you are connecting to the correct RPC port.
```

Bitcoin Core performs optimally on Linux distribution. The good news is that you can run a Linux distribution (e.g Ubuntu) on Windows by following the steps outlined below.

Let's proceed.
  
## Step 1: Enable WSL from PowerShell  
Open PowerShell as Administrator. Run the following command to enable WSL.  
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

Restart your computer when prompted.
  
## Step 2: Install Ubuntu from Microsoft Store  
Open the Microsoft Store and search for Ubuntu.

![Search for Ubuntu on Microsoft Store](https://jeremyikwuje.link/uploads/ubuntu-microsoft-store.png)

You may see several versions of Ubuntu software to download. Choose "Ubuntu" and *Get* it.  

Install the chosen distribution and start Ubuntu. You see the Ubuntu command line interface.  
  
Set up a user account with a username and password.

Open the installed Ubuntu from the Start menu or launch it using the command line. You may  be ask to enter the password you set previously.

Once inside Ubuntu (WSL), run the following commands to update the package lists and upgrade existing packages:
```
sudo apt update
sudo apt upgrade
```    
Next step, we will install the Bitcoin Core within the WSL (Ubuntu).  
  
## Step 3: Install Bitcoin Core
Open a web browser and go to the official [Bitcoin Core Downloads](https://bitcoin.org/en/download) to find the download link for the Linux version to install.

You can use the following commands to download Bitcoin Core directly within WSL (Ubuntu). Replace the version number `<VERSION>` with the latest version available e.g `25.0`.

```
wget https://bitcoin.org/bin/bitcoin-core-<VERSION>/bitcoin-<VERSION>-x86_64-linux-gnu.tar.gz
```

> I installed a more recent version [26.0](https://bitcoincore.org/bin/bitcoin-core-26.0/) from the [Bitcoin Core Bin](https://bitcoincore.org/bin/). 

So if you are installing version 25.0, your full command will be:

```
wget https://bitcoin.org/bin/bitcoin-core-25.0/bitcoin-25.0-x86_64-linux-gnu.tar.gz
```
It may take a while to download.

Use the following commands to extract the downloaded archive:

```
tar -xvf bitcoin-<VERSION>-x86_64-linux-gnu.tar.gz
```

Replace the version number `<VERSION>` with the version you download e.g `25.0`. 

Move the extracted files to the appropriate directory. You want to move them to the `/usr/local` directory:

```  
sudo mv bitcoin-<VERSION> /usr/local/bitcoin
```  
Replace the version number `<VERSION>` with the version you download e.g `25.0`.

To use 'bitcoin-cli' and other binaries without specifying the full path, you have to create symbolic links:

```
sudo ln -s /usr/local/bitcoin/bin/bitcoin-cli /usr/local/bin/bitcoin-cli
```
Great! let's configure Bitcoin.

## Step 4: Configure Bitcoin
Bitcoin Core includes a configuration file. Create your own configuration in the file `bitcoin.conf` in the Bitcoin data directory:

```
mkdir -p ~/.bitcoin
echo "server=1" > ~/.bitcoin/bitcoin.conf
```
Finally, let's start Bitcoin.

## Step 5: Start Bitcoin
Start Bitcoin Core with the following command:
```
/usr/local/bitcoin/bin/bitcoind
```

Wait for few seconds. This will start the Bitcoin daemon.

You can now use `bitcoin-cli` to interact with your running Bitcoin Core instance.

```
bitcoin-cli getblockcount
```

The command above used the `bitcoin-cli` tool to interact with your Bitcoin Core instance via RPC (Remote Procedure Call) to retrieve information about the current block height

You can also use `bitcoin-cli` to interact with a Bitcoin Core instance running elsewhere (externally).

```
bitcoin-cli -rpcconnect=ipaddress -rpcuser=username -rpcpassword=password getblockcount
```

 - `-rpcconnect=ipaddress`  option is where you specify the IP address of the machine running the Bitcoin Core node. Replace the `ipaddress` with the IP address of the Bitcoin Core node e.g 35.200.141.157. 
 - `-rpcuser=username` option provides the RPC username for authentication. Replace the `username` with the username of the Bitcoin Core node e.g jeremy_node.
 - `-rpcpassword=password` option provides the RPC password for authentication. Replace the `password` with the authentication password of the Bitcoin Core node.
 - `getblockcount`: This is the RPC command that retrieves the current block height of the Bitcoin blockchain. You can get see more command by typing `bitcoin-cli help` and `bitcoin-cli help <command name>` or use check this [site](https://chainquery.com/bitcoin-cli) to learn what commands are available and what they do. 

> Note that using a plain-text password on the command line can be a security risk. In a production environment, consider using more secure methods like the configuration file `bitcoin.conf` or environment variables.

### Handling JSON output
You may find some `bitcoin-cli` commands that may require you to print JSON output or filter result from JSON. There is a package called `jq` to handle JSON in WSL (Ubuntu).

You can install it using your package manager.

```
sudo apt-get install jq
```

You can be able to read and filter JSON value from the `bitcoin-cli`.

## Conclusion
After going through these steps, you should be able to run bitcoin deamon and `bitcoin-cli` successfully. Keep in mind that this is a basic setup, and you might need to configure additional settings based on your requirements.

If an error occur, please reply the [Github gist](https://gist.github.com/02651fe6990dddff5fe6ab1d66aa2b08) about any error messages you receive for further assistance.
  
I wrote this article after completing the week0 challenge from [Chaincode FOSS](https://learning.chaincode.com/), a 3-month program on Bitcoin Open Source Development.  
  
Exciting times!  
  
Hope it helps.