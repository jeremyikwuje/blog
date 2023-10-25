---
layout: blog
title: How to build a Twitter Bot with Python
date: 2023-10-25T04:29:59.254Z
---
![How to build a twitter bot with Python](https://jeremyikwuje.link/uploads/how-to-build-a-twitter-bot-with-python.png)

I recently built a Twitter bot ([@monierate](https://x.com/monierate)) that tweets the price of USDT in African currencies. The bot gets its data from the [Monierate.com](https://monierate.com) API. In this article, I share how you can create your own Twitter bot using Python and the Twitter API.

## Python?
Python is a popular programming language that can be used to create automated programs, such as Twitter bots.

In our bot script, we will use a Python library called [Tweepy](https://www.tweepy.org/), which makes it easy to build a Twitter bot with just a few lines of code.

## Setting up the Twitter API

**Before Elon Musk bought Twitter, the API was free to use.** I once used the Twitter API for a data analysis project without paying. Now, the API costs money to use each month.

**Don't worry!** There is a free plan that you can use to get started. However, it is limited to posting tweets and can only send 1500 tweets per month.

This is enough for this tutorial because the bot we are going to build will only tweet the price of Bitcoin once a day at 10:00 AM, which is 30 times a month.

#### Step 1: Signup for the [Twitter API](https://developer.twitter.com/) if you haven't

It's better to create a new Twitter account for each bot you build, unless you want to pay for a plan that lets you use multiple bots on one account.

![Twitter Developer Page](https://miro.medium.com/v2/resize:fit:720/format:webp/1*oI9fBdPPlk_vbYCEbF_RSA.png)

#### Step 2: Get started with the free plan

Twitter may ask you to describe what you plan to use the API for. Be clear and explain what your bot will do, what it can do, and how you understand Twitter's policies. Agree to everything and submit.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Kp7Q8wKkoTo07ES-fwFeNg.png)

Here was mine:

*"I want to build a bot that tweets the price of Bitcoin every morning at 10 AM. My bot will only tweet, and I will not use or share Twitter data outside of the Twitter platform."*

You are likely to be granted access immediately.

If you are...let's proceed.

### Getting your Twitter API keys

Twitter requires every request to be authenticated. You'll need to get the following API keys:

1.  Consumer key (API Key)
2.  Consumer Secret (API Secret)
3.  Bearer Token
4.  Access Token
5.  Access Token Secret

Copy these keys and save them somewhere as they can't be recovered. If you loose them...you''ll need to generate new ones.

#### Step 3: Click the User Authentication Settings to generate these API keys
To find the User Authentication Settings, click the gear icon on the right side of the Project App (next to the key icon).

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*WIlkhMLlSw3aRXe3T4Jp8w.png)

Now let's code.

## Writing the Twitter bot script

#### Step 4: Set up a Python project and install Tweepy
```
pip3 install Tweepy
```
We're keeping this simple. The bot will tweet the price of Bitcoin in USD at a specific time each day. The price of Bitcoin changes every second, so we would normally need to use an API to get the latest price. But we don't want to put any stress on the API, so we're just going to set a random price.

Now, write or paste the following code into a file `bot.py`:

```python
import tweepy
import random

# credentials to access Twitter API
API_KEY="YOUR_API_KEY_HERE"
API_KEY_SECRET="YOUR_API_KEY_SECRET_HERE"
BEARER_TOKEN="YOUR_BEARER_TOKEN_HERE"
ACCESS_TOKEN="YOUR_ACCESS_TOKEN_HERE"
ACCESS_TOKEN_SECRET="YOUR_ACCESS_TOKEN_SECRET_HERE"

# create an OAuthHandler instance
client = tweepy.Client(
	BEARER_TOKEN,
	API_KEY,
	API_KEY_SECRET,
	ACCESS_TOKEN,
	ACCESS_TOKEN_SECRET,
)

# tweet the price of Bitcoin
def  tweet_bitcoin_price():
	price = random.randint(28000,  35000)
	tweet =  f"1 Bitcoin is {price} USD"
	client.create_tweet(text=tweet)

# main function
def  main():
	tweet_bitcoin_price()

# call main function
if __name__ ==  "__main__":
	main()
```

Replace the API variables in the `bot.py` code with your own API keys and run the code. This will tweet the price of Bitcoin to the Twitter account connected to the API.

But our bot script is not automated yet. We want the bot to tweet the price of Bitcoin every day, so it needs to run every day. To automate it, we need to start a web server in the Python script and enable cron jobs. We can use any Python web server package, like Flask or FastAPI, to start a web server. We can use a free cron job service, like cron-job.org, to start the bot script every day.

Here is an updated [script](https://gist.github.com/jeremyikwuje/0e391771dfc9600cda248e68923ce87a) with FastAPI enabled.

## Deploying the Bot

If you want your bot to keep running, you need to deploy it to a live server. You can deploy your bot on any hosting platform that supports Python.

I personally like [Railway](https://railway.app?referralCode=oncode) because it is simple and offers a generous plan for hosting Python scripts. Railway will give you a public URL for your bot, which you can use to set up a cron job on cron-job.org for free.
