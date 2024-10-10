#Approach
1. initialize mongodb cluster on internet, interated using odm mongoose
2. get required data for btc, m-n, eth and store it into Mongodb
3. now the above code should be run every 2 hrs in background by fetching data from api and updating in mongo(node-cron for periodic backgroud run)
4. now as for /stat endpoint, use express for get method from db deployed in atlas

