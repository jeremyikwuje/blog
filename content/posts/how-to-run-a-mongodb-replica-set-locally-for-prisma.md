---
layout: blog
title: How to run a MongoDB Replica Set locally for Prisma
date: 2023-11-04T09:33:43.881Z
---
## Problem

MongoDB is a non-SQL database that only allows you to start transactions on a replica.

Prisma is an object-relational mapping (ORM) framework that uses transactions to ensure the integrity of data when performing nested queries. This means that Prisma requires a replica set to be configured. A locally installed MongoDB does not have a replica set configured by default, which can make the getting started experience more cumbersome.**

If you try to run Prisma against a MongoDB without a replica set, you will get the following error:

```
Transactions are not supported by this deployment
```

A suggested solution that Prisma may be working on is to make the requirement of a replica optional during development. Another option is to use MongoDB Atlas: https://www.mongodb.com/cloud/atlas, which offers a free tier with replica support enabled by default.

However, Prisma still uses transactions, which requires us to set up a replica. MongoDB Atlas requires an internet connection when querying your database, and this can be slow if you live in a location where internet is not strong.

## Solution
The current solution is to run a replica set locally on your computer. This article will show you how to run a replica set locally for development purposes. Doing this will significantly speed up your development.

## How to run a MongoDB Replica Locally [Windows]
I will be using a Windows machine in this tutorial, but any operating system can be used.


### Step 1: Stop your MongoDB instance
You can run the following commands to stop your MongoDB instance:

Windows (open Command Prompt as administrator):

```
net stop mongodb
```

macOS (Homebrew):
```
brew services stop mongodb-community@7.0
```
Note your MongoDB version and replace it with yours.

Alternatively, on Windows, you can stop your MongoDB instance by opening Services and stopping MongoDB.

### Step 2: Start MongoDB configured for a replica
Run the following command:
```
mongod --port 27017 --dbpath /path/to/mongodb --replSet rs0 --bind_ip localhost,CustomHostName
```
Replace the `--dbpath` and `--bind_ip` options with your own values. The `--dbpath` is where you want your MongoDB replica data to be stored. The `CustomHostName` can be changed to any host name you want. See mine below:

mongod --port 27017 --dbpath "C:\Program Files\MongoDB\Server\7.0\data\db0" --replSet rs0 --bind_ip localhost,HostName

Notice my `--dbpath`. Usually, it should be in your MongoDB installation directory, but it can be anywhere on your computer.

If an error occurs or the command terminates, try opening your terminal as an administrator or changing the directory of `--dbpath`. Create the folder if necessary before running the above command. For the example command, the folder is `db0`.


### Step 3: Create a replica set in Mongosh
While the mongod process is running, open a new terminal and run the following command:

```
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});

```

The `rs.initiate()` command creates a new replica set or adds a new member to an existing replica set.

This will create a replica set and start your MongoDB database. You can now move ahead to building your application using Prisma as your ODM.

### Alternatively, you can configure mongod to start as a replica by default.
Although you are good to go with the previous step, the challenge is that you will have to start the replica set every time you start your machine or close your terminal.

#### Step 1: Update the MongoDB configuration file
To configure mongod to start as a replica, open the `C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg` file, then update and add the following `replication` settings:

```
systemLog:
  destination: file
  path: C:\Program Files\MongoDB\Server\7.0\log\mongod.log
  logAppend: true
storage:
  dbPath: C:\Program Files\MongoDB\Server\7.0\data\db0
net:
  port: 27017
  bindIp: 127.0.0.1
replication:
  replSetName: "rs0"
```
_The `mongod.cfg` file is a configuration file that is used to configure mongod._

If the file is unable to save, then you may need to start your code editor *administrator*. If using VS Code, you will be prompted to _Save as Administrator_

Don't forget to use your own path for storage and systemLog.

#### Step 2: Restart mongod instance
Stop and start mongod instance again.

Windows (Open Command Prompt as Administrator):
```
net stop mongodb
```
```
net start mongodb
```

MacOS (Homebrew):
```
brew services stop mongodb-community@7.0
```
```
brew services start mongodb-community@7.0
```
*Note the mongodb version, replace with yours. Restarting mongod is necessary to apply the changes to the `mongod.cfg` file.*

For Windows user, you can restart your MongoDB instance by opening Services and *restart* MongoDB. Make sure the MongoDB service is configured to start automatically when your computer boots.

Now that your mongod is configured as a replica and you keep building with Prisma as your ODM without having to configure or start a replica everytime. 

## Errors
If you encouter an trying to start or restart your mongodb service, delete the `C:\Program Files\MongoDB\Server\7.0\data\db0\mongo.lock` file and restart mongod.. 

Other errors may be because you didn't specify the neccessary paths in some of the steps above.

Hope that helps.