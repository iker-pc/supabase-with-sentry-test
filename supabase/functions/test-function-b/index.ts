import { initSentry, withSentry } from "@sentry";
import { logFrom } from "@log";

initSentry();

Deno.serve(withSentry(async (req) => {
    const { name } = await req.json()

      if (!name) {
        throw new Error(logFrom('FUNCTION B', 'Name is required'))
      } else if (name === 'error') {
        throw new Error(logFrom('FUNCTION B', 'Testing Error Message'))
      }
      const data = {
        message: logFrom('FUNCTION B', `Hello ${name}!`),
      }
      return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}));

const logFromFunctionB = (message: string) => {
    return `[Function B]: ${message}`
}