# Cloudflare worker for the million ether homepage

The worker will retrieves **keyHere** key value from Cloudflare Key Value storage. 
Request url: https://worker_url.cloudflare.something/?myKey=keyHere

Will return error and status code 400 if key doesn't exist or if wrong parameters are sent.
