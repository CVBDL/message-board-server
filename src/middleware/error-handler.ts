import * as Koa from 'koa';
import { Error as MongooseError } from "mongoose";

import { MongooseErrorHandler } from "../core/mongoose-error-handler";


/**
 * Application error handler middleware.
 * @param ctx 
 * @param next 
 * @see {@link https://github.com/koajs/examples/blob/master/errors/app.js}
 */
async function errorHandler(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    await next();

  } catch (err) {
    if (err instanceof MongooseError) {
      let result = MongooseErrorHandler.handle(err);
      ctx.status = result.status;
      ctx.body = {
        message: result.message
      };

    } else {
      handleOtherError(err, ctx);
    }

    ctx.app.emit('error', err, ctx);
  }
}

function handleOtherError(err: Error, ctx: Koa.Context) {
  const message: string = err.message || 'Error occurred.';

  ctx.status = (err as any).status || 400;
  ctx.body = { message };
}

const middleware: Koa.Middleware = errorHandler;

export default middleware;
