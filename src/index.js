export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const myKey = url.searchParams.get('myKey');

    // for better security include the following code:
    // but CORS headers is pain in the ass with cloudflare (see handleOptions function)
    // const origin = request.headers.get('Origin');
    // const allowedOrigins = ["https://themillionetherhomepage.com"];  // production website
    // const allowedSubdomain = ".meh-resurrections.pages.dev";  // all website previews
    // "Access-Control-Allow-Origin": allowedOrigins.includes(origin) || origin.endsWith(allowedSubdomain) ? origin : '',
    
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    // Handle preflight requests
    // Code from here - https://stackoverflow.com/questions/66486610/how-to-set-cors-in-cloudflare-workers
    // https://community.cloudflare.com/t/no-access-control-allow-origin-header-is-present-error-from-js/419803/6
    function handleOptions(request) {
      // Make sure the necessary headers are present
      // for this to be a valid pre-flight request
      let headers = request.headers
      if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
      ) {
        // Handle CORS pre-flight request.
        // If you want to check or reject the requested method + headers
        // you can do that here.
        let respHeaders = {
          ...corsHeaders,
          // Allow all future content Request headers to go back to browser
          // such as Authorization (Bearer) or X-Client-Name-Version
          "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
        }
        return new Response(null, {
          headers: respHeaders,
        })
      }
      else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
          headers: {
            Allow: "GET, HEAD, POST, OPTIONS",
          },
        })
      }
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return handleOptions(request)
    }

    if (myKey) {
      // don't need to parse and then stringify retrieved value
      // as it is already a stringified JSON in the storage
      const retrivedValue = await env.ku.get(myKey)
      if (retrivedValue) {
        // value is a JSON stringified object
        return new Response(retrivedValue, { headers: headers })
      } else {
        return new Response(
          JSON.stringify({
            error: `Error: Missing \"${ myKey }\" key in storage.`}),
            { status: 400, headers: headers })
      }
    } else {
      return new Response(
        JSON.stringify({
          error: `Error: Missing myKey in the query parameters.`}),
          { status: 400, headers: headers })
    }
  }
}