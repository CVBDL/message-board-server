import * as Koa from "koa"
import * as bodyParser from 'koa-bodyparser';


// https://github.com/koajs/bodyparser#usage
const config = {
  enableTypes: ['json', 'form'],
  encode: 'utf-8',
  formLimit: '56kb',
  jsonLimit: '1mb',
  strict: true,
  onerror: (err: Error, ctx: Koa.Context) => {
    ctx.throw('Body should be a JSON object.', 400);
  }
};

export default bodyParser(config);
