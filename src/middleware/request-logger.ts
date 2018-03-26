import * as Koa from 'koa';


async function requestLogger(ctx: Koa.Context, next: () => Promise<any>): Promise<void> {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

const middleware: Koa.Middleware = requestLogger;

export default middleware;
