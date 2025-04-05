# KoinX Backend Assignment

## Task 1

Implement a background job that will fetch the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database. This job should run once every 2 hours.

## Task2

Implement an API /stats, that will return the latest data about the requested cryptocurrency.

## Task3

Implement an API, /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

## Approach

MongoDB Setup:
Set up a MongoDB Atlas cluster to host the database, accessible over the internet. Use Mongoose as the ODM to interact with MongoDB.

Fetching and Storing Data:
Fetch data for Bitcoin (BTC), Matic (M-N), and Ethereum (ETH) from an external API, and store the data in MongoDB.

Periodic Data Fetching (Cron Jobs):
Use node-cron to run a background job every 2 hours. The cron job fetches the latest data from the external API and updates the MongoDB database accordingly.

API Endpoint:
Use Express.js to create a RESTful API with a GET /stats and /deviation endpoint that retrieves the latest data from the MongoDB Atlas cluster and returns it in JSON format.

Deployment:
Used aws ec2 web-service for deployment

## Api Link

    `http://52.87.156.79:5000`
    or
    `http://ec2-52-87-156-79.compute-1.amazonaws.com:5000`

## API Reference

#### Get all items

```http
  GET /stats?coin={coin}
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `coin`    | `string` | **Required**. Bitcoin, Matic-Network, or Ethereum |

    note that values of coin is case-sensitive

#### Get item

```http
  GET /deviation?coin={coin}
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `coin`    | `string` | **Required**. Bitcoin, Matic-Network, or Ethereum |

## Environment variables

`MONGO_URL`

`COINGECKO_API_KEY `

## Run Locally

Clone the project

```bash
  git clone https://github.com/Yashwanth12321/crypto-api.git
```

Go to the project directory

```bash
  cd crypto-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Note

`Ensure you create a mongo db cluster Driver and place the link in environmental variable along with CoinGecko api key`
