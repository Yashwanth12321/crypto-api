import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

//function to fetch data from the API
const fetchData = async () => {
  try {
    let url = "https://api.coingecko.com/api/v3/simple/price";
    const options = {
      method: "GET",
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0; +https://crypto-api-lpas.onrender.com)',
        accept: 'application/json',
        ...(process.env.COINGECKO_API_KEY && { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY })
      }
      
    };
    const params = {
      ids: "bitcoin,ethereum,matic-network",
      vs_currencies: "usd",
      include_market_cap: true,
      include_24hr_change: true,
      include_last_updated_at: true,
    };
    url = new URL(url);
    url.search = new URLSearchParams(params).toString();
    const data = await fetch(url, options).then((response) => response.json());

    console.log(data);
    const record = [
      {
        name: "Bitcoin",
        price: data.bitcoin.usd,
        marketCap: data.bitcoin.usd_market_cap,
        change24h: data.bitcoin.usd_24h_change,
        Timestamp: Date.now(),
      },
      {
        name: "Ethereum",
        price: data.ethereum.usd,
        marketCap: data.ethereum.usd_market_cap,
        change24h: data.ethereum.usd_24h_change,
        Timestamp: Date.now(),
      },
      {
        name: "Matic-Network",
        price: data["matic-network"].usd,
        marketCap: data["matic-network"].usd_market_cap,
        change24h: data["matic-network"].usd_24h_change,
        Timestamp: Date.now(),
      },
    ];
    return record;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default fetchData;
