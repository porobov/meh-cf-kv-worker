# Cloudflare worker for the million ether homepage

The worker will retrieves **myKey** key value from Cloudflare Key Value storage. 
Request url: https://worker_url.cloudflare.something/?myKey=myKey

Will return error and status code 400 if key doesn't exist or if wrong parameters are sent.

# Developement
Update Wrangler before developement:
`npm install wrangler@latest`

Push to cloudflare with:
`npm run deploy`

# VPN
Some of the Cloudflare IPs may be blocked in Russia. Make sure to try using a VPN.