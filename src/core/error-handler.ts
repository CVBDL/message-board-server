import Koa = require("koa");

import { Error as MongooseError } from "mongoose";

import { MongooseErrorHandler } from "./mongoose-error-handler";


export class ErrorHandler {
  /**
   * @see {@link https://github.com/koajs/examples/blob/master/errors/app.js}
   * @param ctx 
   * @param next 
   */
  public static async handle(ctx: Koa.Context, next: () => Promise<any>) {
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
        ErrorHandler.handleOtherError(err, ctx);
      }

      ctx.app.emit('error', err, ctx);
    }
  }

  private static handleOtherError(err: Error, ctx: Koa.Context) {
    const message: string = err.message || 'Error occurred.';

    ctx.status = (err as any).status || 400;
    ctx.body = { message };
  }
}
