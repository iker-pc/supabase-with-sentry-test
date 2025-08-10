// @ts-expect-error
import * as Sentry from "https://deno.land/x/sentry/index.mjs";

export function initSentry() {
    Sentry.init({
        dsn: Deno.env.get("SENTRY_DSN"),
        defaultIntegrations: false,
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
        environment: Deno.env.get("ENVIRONMENT"),
    });
}

export function withSentry<
  H extends (req: Request) => Response | Promise<Response>
>(handler: H): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    return await Sentry.withScope(async (scope: Sentry.Scope) => {
      try {
        scope.setTag("region", Deno.env.get("SB_REGION") ?? "");
        scope.setTag("execution_id", Deno.env.get("SB_EXECUTION_ID") ?? "");
        return await handler(req);
      } catch (e) {
        Sentry.captureException(e);
        // Asegura envío antes de que el proceso se apague
        await Sentry.flush(2000);
        return new Response("Internal Server Error", { status: 500 });
      }
    });
  };
}