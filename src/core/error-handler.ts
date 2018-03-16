import Koa = require("koa");

import { Error as MongooseError } from "mongoose";


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
        ErrorHandler.handleMongooseError(err, ctx);

      } else {
        ErrorHandler.handleOtherError(err, ctx);
      }

      ctx.app.emit('error', err, ctx);
    }
  }

  private static handleMongooseError(err: MongooseError, ctx: Koa.Context) {
    const message: string = `${err.name}: ${err.message}`;
    ctx.status = 400;
    ctx.body = { message: message };
  }

  private static handleOtherError(err: any, ctx: Koa.Context) {
    const message: string = 'Error occurred';

    ctx.status = 400;
    ctx.body = { message };
  }
}
