export {}; // 👈 This prevents the file from being treated as a module

declare global {
  const Deno: {
    env: { get(key: string): string | undefined };
    serve: (handler: (req: Request) => Response | Promise<Response>) => void;
  };
}