---
layout: blog
title: How to Implement Caching in TypeScript
date: 2023-11-08T16:34:01.577Z
---


You can implement caching in your Nodejs application using any of the three TypeScript modules:

1. **Redis**: A popular Node.js module for interacting with Redis. Redis is an open-source, in-memory data structure store that can be used as a cache, message broker, or session store for Node.js applications.
2. **Node-cache**: A simple caching module that can be used to get, set, delete cache data.
3. **Cache-manager**: A popular caching module that provides a unified system for caching data using various storage options. Supports decorators for caching methods and services.

All three modules allow you to set, get, and manage cache data when building data intensive applications.

## 1. Using Redis module
Redis is a popular Node.js module for interacting with Redis, an open-source, in-memory data store. It provides a variety of methods for connecting to, querying, and managing Redis data. Redis is well-maintained and has a large community of users.

Here is how you can use node-redis to connect to a Redis server and set, get, and delete a data stored in cache:

Install redis module
```shell
npm i redis
```
Install the types to work with TypeScript.
```shell
npm i -D @types/redis
```
#### Connect to a redis server
```ts
import { createClient } from  'redis';

const client = createClient();

client.on('connect', () => {
	console.log('Connected to Redis');
});
```

#### Set a cache
```ts
await client.set('key', 'value');
```

#### Get a cache
```ts
const value = await client.get('key');
```

#### Disconnect a redis server
```ts
await client.disconnect();
```

Let's use Redis to cache the results of an expensive API call in Node.js:

```ts
import { createClient } from 'redis';

const client = createClient();

const fetchUserData = async () => {
  const response = await fetch('https://api.example.com/users/12345');
  const data = await response.json();
  return data;
};

const getCachedUserData = async () => {
  // Check if cached user data exists in Redis
  const cachedUserData = await client.get('userData');
  if (cachedUserData) {
    console.log('Using cached user data');
    return JSON.parse(cachedUserData); // Parse cached data from string
  }

  // Fetch user data from API if not cached
  const userData = await fetchUserData();
  await client.set('userData', JSON.stringify(userData), 60); // Cache fetched data for 60 seconds
  console.log('Fetched user data from API');
  return userData;
};

(async () => {
  const userData = await getCachedUserData();
  console.log(userData);

  // Force refresh the cached data
  const refreshedUserData = await getCachedUserData(true); // Pass `true` to force refresh
  console.log(refreshedUserData);
})();
```

This code will first check if the user data is already cached in Redis. If it is, it will return the cached data. Otherwise, it will fetch the user data from the API and cache it in Redis for 60 seconds. The `true` parameter passed to `getCachedUserData` forces a refresh of the cached data, even if it is still valid.

**Redis is easy to use, powerful and efficient** for creating and managing cache and in-memory data. If you are looking for a way to connect your Node.js application to Redis, then redis is a great option to consider.


## 2. Using node-cache module
Node-cache is a simple and fast in-memory caching library for Node.js. It can be used to cache any data that you want to access quickly and efficiently.

#### Install node-cache module
```shell
npm i node-cache
```
#### Install the types to work with TypeScript
```shell
npm i -D @types/node-cache
```
#### Initialize node-cache
```ts
import nodeCache from 'node-cache'

const cache = new nodeCache();
```
#### Set a key
```ts
cache.set('key', value, 60); // cache for 60 seconds
```
#### Get a key
```ts
const cachedData = cache.get('key')
```

#### Delete a key
```ts
cache.del('key')
```

Here is an example of how to use node-cache to cache the results of an expensive API call:

```ts
import nodeCache from 'node-cache'

const cache = new nodeCache();

const fetchUserData = async () => {
	const response = await fetch('https://api.example.com/users/12345');
	const data = await response.json();
	
	return data;
};

const getUserData = async () => {
	const cachedUserData = cache.get('userData');

	if (cachedUserData) {
		return cachedUserData;
	}
	
	const userData = await fetchUserData();
	cache.set('userData', userData, 60); // cache for 60 seconds

	return userData;
};

const main = async () => {
	const userData = await getUserData();
	console.log(userData);
};

main();
```

This code will first check the cache to see if the user data has already been cached. If it has, then it will return the cached data. Otherwise, it will fetch the user data from the API and cache it for 60 seconds.

**Node-cache is highly performant, simple to use, flexible, and minimize memory usage**.  If you are looking for a TypeScript module that is fast, simple to use and for caching data that needs to be accessed frequently, then use node-cache.

## 3. Using cache-manager Module
Cache-manager is a popular caching library for Node.js that provides a unified system for caching data using various storage options. It supports decorators for caching methods and services, making it easy to integrate caching into your application.

#### Install cache-manager module
```shell
npm i cache-manager
```
#### Install the types to work with TypeScript
```shell
npm i -D @types/cache-manager
```
#### Initialize node-cache
```ts
import CacheManager from 'cache-manager';

const cache = new CacheManager({
	store: 'memory', // Specify the storage backend (e.g., memory, Redis, Memcached)
	ttl: 60, // Cache TTL (time to live) in seconds
});
```
#### Set a key
```ts
await cache.set('key', value); // cache the fetched data
```
#### Get a key
```ts
const cachedData = await cache.get('key');
```

#### Delete a cache
```ts
await cache.del('key');
```

#### Reset all cache
```ts
await cache.reset();
```

Use the `reset()` method with caution as it will will remove all cached data, including data that may still be valid in your application.

Here is an example of how to use node-cache to cache the results of an expensive API call:

```ts
import CacheManager from 'cache-manager'

const cache = new CacheManager({
  store: 'memory', // Specify the storage backend (e.g., memory, Redis, Memcached)
  ttl: 60, // Cache TTL (time to live) in seconds
});

const getUserData = async () => {
  // Expensive operation to fetch user data
  const response = await fetch('https://api.example.com/users/12345');
  const data = await response.json();
  return data;
};

const getCachedUserData = async () => {
  // Try to retrieve cached user data
  const cachedUserData = await cache.get('userData');
  if (cachedUserData) {
    console.log('Using cached user data');
    return cachedUserData;
  }

  // Fetch user data from API if not cached
  const userData = await getUserData();
  await cache.set('userData', userData); // Cache the fetched data
  console.log('Fetched user data from API');
  return userData;
};

(async () => {
  const userData = await getCachedUserData();
  console.log(userData);

  // Force refresh the cached data
  const refreshedUserData = await getCachedUserData(true); // Pass `true` to force refresh
  console.log(refreshedUserData);
})();
```
This code will first check the cache for the user data. If it is cached, it will return the cached data. Otherwise, it will fetch the user data from the API and cache it for 60 seconds. The `true` parameter passed to `getCachedUserData` forces a refresh of the cached data, even if it is still valid.

Cache-manager provides a unified system; support caching decorators; automatically manage cache size; provides mechanisms for invalidating cached data when it becomes stale; and it is also well easy to use.

If you are looking for a robust and flexible caching library that can significantly improve the performance and efficiency of Node.js applications, then use cache-manager.

## It's up to you
**Redis** is a good choice for applications that require high-performance caching and are willing to manage a separate server. **node-cache** is a good choice for applications that require a simple and lightweight caching solution. **Cache-Manager** is a good choice for applications that require a flexible and easy-to-use caching solution that supports multiple storage backends.

Use any of the module that fit into your needs.