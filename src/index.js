export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const myKey = url.searchParams.get('myKey');
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
    if (myKey) {
      const value = JSON.parse(await env.ku.get(myKey))
      console.log("myKey", value)
      if (value) {
        return new Response(value, { headers: headers })
      } else {
        return new Response(`Error: Missing \"${ myKey }\" key in storage.`, { status: 400 })
      }
    } else {
      return new Response( 'Error: Missing "myKey" in the query parameters.', { status: 400 })
    }
  }
}