---
layout: blog
title: How to run Bitcoin Core on Ubuntu 22.04
date: 2023-12-26T04:21:46.575Z
---
![How to install Bitcoin core on Ubuntu 22.04](https://jeremyikwuje.link/uploads/how-to-install-bitcoin-on-ubuntu.png)

## Introduction
Bitcoin is a software that transfers digital units known as bitcoins from person to person. It a pure software. And just like any other kind of software, it was written and currently maintained by a community of software engineers around the world.

Today, a few things are honourable as working on the Bitcore Core software. I know, there are several alternatives to Bitcoin with “shining features” that programmers can be working on, but in the end, it's all about Bitcoin. Bitcoin is the basic money for the digital age.

In this guide, you'll set up Bitcoin Core software on an Ubuntu 22.04 server. The focus of this guide is to run tests and perform development work on the Bitcoin Core codebase. The goal is for you to learn the Bitcoin Core development environment through the Bitcoin Test Framework.

## About Ubuntu
Ubuntu is a popular Linux distribution known for its user-friendly interface, vast software repository, and strong community support.

It offers a stable and secure environment, which is crucial for running software like Bitcoin Core, which handles sensitive financial transactions.
  
Unlike Windows, it avoids unnecessary background processes and resource consumption, allowing Bitcoin Core to function efficiently.

## Prerequisites

To complete this tutorial, you will need:

1.  **Create a DigitalOcean Account**: Visit [https://www.digitalocean.com](https://www.digitalocean.com) and sign up for a free account. Provide your payment information to verify your account. You won’t be charged until you start running the Bitcoin Core software. You’re billed per hour, nothing much if you only need to run the software to complete an assignment or explore for a few hours and then shut it down.
    
2.  **Knowledge of command line**: You should have experience working on a command-like interface. This isn't rocket science. You can learn this in an hour. Follow this [video](https://www.youtube.com/watch?v=uwAqEzhyjtw).
    
3.  **Add an SSH key to DigitalOcean**: For security reasons and preference, you should add an SSH key to your DigitalOcean account. This will allow you to access your Digital Ocean Ubuntu server from your computer Terminal or SSH client like Putty. Follow this [guide to Add an SSH key to DigitalOcean](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/).
    
When finished with the prerequisites, log in to your DigitalOcean cPanel and continue to Step 1.

## Steps 1 - Create a DigitalOcean Droplet running Ubuntu 22.04

A DigitalOcean Droplet is a virtual server you can rent by the hour, like a tiny computer in the cloud. It comes with pre-configured essentials ready to run your code projects in seconds.

Follow the steps to install Ubuntu 22.04 on a DigitalOcean Droplet with the necessary configuration:

#### Create a New Droplet
Click the "Create" button in the top right corner of the DigitalOcean dashboard. Select "Droplets" from the dropdown menu.

![Create a digitalocean droplet](https://jeremyikwuje.link/uploads/digitalocean-droplet-create.png)

#### Choose Region / Datacenter
Select the datacenter region closest to your physical location for optimal performance. Any region will work for you.
![Choose a  data region for your droplet on DigitalOcean](https://jeremyikwuje.link/uploads/digitalocean-droplet-region.png)


#### Choose Ubuntu 22.04
In the "Choose an image" section, select "Ubuntu 22.04 LTS" as the operating system.
![Choose an Ubuntu image for your droplet on DigitalOcean](https://jeremyikwuje.link/uploads/choose-an-image.png)


#### Select Droplet Plan / CPU option
Under "Choose a plan", select the "Basic" plan with 4 GB RAM, 2 vCPUs, 120G NVMe SSDs and click "Select".

![Choose plan type for your droplet on DigitalOcean](https://jeremyikwuje.link/uploads/digitalocean-droplet-size-plans.png)

![Choose CPU option for your droplet on DigitalOcean](https://jeremyikwuje.link/uploads/digitalocean-droplet-plans.png)


#### Choose Authentication Method
Select the SSH key you already uploaded to DigitalOcean or Click “New SSH Key” to [create a new one](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/) if you don’t have any.

![Choose Authentication method for your droplet on DigitalOcean](https://jeremyikwuje.link/uploads/digitalocean-droplet-ssh.png)

#### Create the Droplet
Once you selected all the above, click the button “Create Droplet” and wait for a few seconds.

![Create a droplet on digitalocean](https://jeremyikwuje.link/uploads/digital-ocean-create-droplet.png)

#### Get your Droplet IP
Once your droplet is created. Copy the IP address next to the title of your droplet.

![Droplet IP on digitalocean](https://jeremyikwuje.link/uploads/digital-ocean-droplet-ip.png)

Congratulations! You have successfully installed Ubuntu 22.04 on your DigitalOcean Droplet. The droplet has 4 GB RAM, 2 vCPUs, and 120G NVMe SSDs which is sufficient enough to run the Bitcoin Core.

Let’s proceed to the next step: install the necessary Bitcoin dependencies.

## Step 2 - Install the necessary Bitcoin Unix dependencies

To build the Bitcoin Core, we will need to install the build dependencies. There are about 21 major dependencies to install. Technically, not all are required depending on your specific build option. However, since this is your first time, it makes sense to install all major dependencies.

Let’s get to it.

#### Connect to Your DigitalOcean Droplet
Use SSH to connect to your Droplet. You will need your droplet IP to connect via any SSH client (Putty or Terminal on Windows/macOS/Linux). You can also use Git Bash.

![Git bash ssh connecting to a server](https://jeremyikwuje.link/uploads/git-bash-ssh-root-connect.png)
 
Run the command below in your Terminal:
```bash
ssh username@your_droplet_ip
```

Don't forget to replace the text `your_droplet_ip` with your actual Droplet IP address. 

For the command to work, make sure your public key is added to the Droplet and you enter the correct passphrase (in case you are prompted).  

#### Update and Upgrade the System
Once your droplet is connected, update the package list and upgrade installed packages to ensure you have the latest software.
```bash
sudo apt update
sudo apt upgrade
```

#### Install Bitcoin build for Unix
It may take several minutes for all these dependencies to install, and right now, it is fine you don’t need to know anything about each of the dependencies.

```bash
sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3
```

Next, run the command below:  
```bash
sudo apt-get install libevent-dev libboost-dev
```

SQLite is required for the descriptor wallet:
```bash
sudo apt install libsqlite3-dev
```

The next command for port mapping dependencies is optional, but I recommend you install it:

```bash
sudo apt install libminiupnpc-dev libnatpmp-dev
```

ZMQ dependencies (provides ZMQ API):

```bash
sudo apt-get install libzmq3-dev
```

User-Space, Statically Defined Tracing (USDT) dependencies:  

```bash
sudo apt install systemtap-sdt-dev
```

GUI dependencies:  
We can technically ignore these dependencies as we can configure the Bitcoin Core without GUI pass `--without-gui`.  
 
But, let’s install all of it.

```bash
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools
```

Support Wayland protocol for modern desktop environments:  

```bash
sudo apt install qtwayland5`
```

Install libqrencode with:
 
```bash
sudo apt-get install libqrencode-dev
```

Once these are installed, we can proceed to clone the Bitcoin Core source code from GitHub.

## Step 3 - Clone the Bitcoin Core Software from Github

Create a `build` folder and navi with the commands:  

```bash
mkdir build
```

Navigate into the `build/` folder.

```bash
cd build
```

Clone the Bitcoin Core repository:

```bash
git clone https://github.com/bitcoin/bitcoin.git
```

Navigate into the Bitcoin Core directory:

```bash
cd bitcoin
```

Great! We are almost there. Let’s configure and build the Bitcoin Core.

## Step 4 - Build and configure the Bitcoin Core repository

This process may take several minutes, so you will need to be patient.  

To build, follow the commands below.  
  
```bash
./autogen.sh
```

```bash
./configure
```

This will configure the build environment. Now run the command below to build the software.  

```bash
make
```

This will run the Bitcoin Core software.

If for some reason, the software keeps crashing, you may need to configure the software with less requirement. Run the command below:  

```bash
./configure --disable-bench --disable-fuzz-binary --enable-debug --without-gui --enable-suppress-external-warnings
```

Then run:  

```bash
make
```

Or run `make -j2`. This will reduce the number of threads to lower the memory usage.

Congratulations! You have successfully cloned, configured, and run the Bitcoin Core software on Ubuntu 22.04 on your DigitalOcean Droplet.

## Step 5 - Run tests
If the purpose of running the Bitcoin Core software is to run some functional unit tests. Then this step is for you. Follow along.

Bitcoin Core has a comprehensive test suite.

First, let’s ensure all tests are passed by running the command below:  
  
```bash
test/functional/test_runner.py
```

If everything is working correctly, we can then run a target test.

#### Target test
Before running a target test, let’s checkout to the latest version tag `26.0` actually`v26.0`.

```bash
git checkout tags/v26.0 -b v26.0-branch
```

Using this command, we have successfully checked out the “26.0” tag.

We can confirm the commit: `44d8b13c81e5276eb610c99f227a4d090cc532f6`

```bash
git log
```

Awesome!

Now we can start working on the new branch `v26.0-branch`. For now, we will modify the Bitcoin Core test code for our target test.

#### Choosing a target test
The [functional test directory](https://github.com/bitcoin/bitcoin/tree/44d8b13c81e5276eb610c99f227a4d090cc532f6/test/functional) contains various tests, each focusing on specific aspects of Bitcoin Core functionality. To choose a target test, we want to consider the area of Bitcoin functionality we are interested in or the type of test we'd like to modify.

**Wallet Tests:**
-   `wallet_balance.py`: Tests related to wallet balance functionality.
-   `wallet_importmulti.py`: Tests for importing multiple addresses into the wallet.

**Transaction Tests:**
-   `p2p_transactions.py`: Tests related to peer-to-peer transactions.
-   `transaction_filter.py`: Tests for transaction filtering.

**Consensus Rules Tests:**
-   `block_reorganization.py`: Tests for block reorganization scenarios.
-   `bip68-sequence.py`: Tests for BIP 68 sequence number support.

There are more areas of Bitcoin functionality we could target.

To keep things simple, let’s modify Wallet Tests: `wallet_balance.py`: Tests related to wallet balance functionality. We would make a minimal change to intentionally cause it to fail.

Open the `wallet_balance.py` using nano:
```bash
nano test/functional/wallet_balance.py
```

Inside the file, let’s locate a section of the test that performs a check or assertion related to wallet balance and introduce a small modification that makes this specific check fail. We will modify a numeric value on line 121.

```bash
# Send 40 BTC from 0 to 1 and 60 BTC from 1 to 0.
txs = create_transactions(self.nodes[0], self.nodes[1].getnewaddress(), 10, [Decimal('0.01')])
```

The code above checks the test by sending 40 BTC from wallet 0 to wallet 1 and 60 BTC from wallet 1 to wallet 0. I change the value from 40 to 10. This will cause the test to fail as the balance expected won’t match during assertions.

Save the changes: `CTRL X then SHIFT Y`.

Now, we can commit the changes and show the commit. We can’t push the changes unless we have a contributor privileges.
  
```bash
git commit -m “feat: make wallet_balance.py to fail”
```

Show the commit using the `git show` command. Replace `<commit hash>` with the hash of your new commit:  
  
```bash
git show <commit hash>
```

This will display the commit details:  
```bash
commit 5f08316bad6e3666a06de29ce0cfbf892e5e23b4 (HEAD -> v26.0-branch)
Author: jeremyikwuje <ikwuje24@gmail.com>
Date:   Fri Dec 15 17:05:52 2023 +0000

    make wallet_balance.py fail

diff --git a/test/functional/wallet_balance.py b/test/functional/wallet_balance.py
index af9270a321..6fa8aa599f 100755
--- a/test/functional/wallet_balance.py
+++ b/test/functional/wallet_balance.py
@@ -118,7 +118,7 @@ class WalletTest(BitcoinTestFramework):
         assert_equal(self.nodes[1].getbalance(minconf=0, include_watchonly=True), 50)

         # Send 40 BTC from 0 to 1 and 60 BTC from 1 to 0.
-        txs = create_transactions(self.nodes[0], self.nodes[1].getnewaddress(), 40, [Decimal('0.01')])
+        txs = create_transactions(self.nodes[0], self.nodes[1].getnewaddress(), 10, [Decimal('0.01')])
         self.nodes[0].sendrawtransaction(txs[0]['hex'])
         self.nodes[1].sendrawtransaction(txs[0]['hex'])  # sending on both nodes is faster than waiting for propagation
```

The key is to make a minimal change that causes only this specific test to fail while ensuring that other tests in the suite still pass. This helps isolate the impact of your modification.

To confirm if the test will fail, run `test/functional/wallet_balance.py`.

## Conclusion
Bitcoin Core should now be successfully running on your Ubuntu 22.0 ready for you to explore as much as possible. You can perform more tests. Modify the Bitcoin code and try new things.

If you follow along for a project, assignment or job interview, you can delete your DigitalOcean droplet when you are done so you don’t rank up unnecessary costs at the end of the month.

Hope this helps.

Thanks for reading.

If you are having trouble following the article or something breaks along the way, you can reply in the [gist](https://gist.github.com/jeremyikwuje/b6d79de9f4dc3acc307039a16b66caf2). You can also shoot me an [email](mailto:ikwuje24@gmail.com) or message me on [Telegram](https://t.me/ikwuje) if you like to connect.