import Router = require('koa-router');

import tweets from './controller';


const router = new Router();

/**
 * GET /tweets
 */
router.get('/tweets', async (ctx, next) => {
  ctx.body = await tweets.list();
});

/**
 * GET /tweets/:id
 */
router.get('/tweets/:id', async (ctx, next) => {
  ctx.body = await tweets.get(ctx.params.id as string);
});

/**
 * POST /tweets
 */
router.post('/tweets', async (ctx, next) => {
  ctx.body = await tweets.create(ctx.request.body);
});

/**
 * DELETE /tweets
 */
// router.del('/tweets', async (ctx, next) => {
//   await tweets.removeAll();
//   ctx.body = null;
// });

/**
 * DELETE /tweets/:id
 */
router.del('/tweets/:id', async (ctx, next) => {
  ctx.body = await tweets.remove(ctx.params.id as string);
});

export default router;
