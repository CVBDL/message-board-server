import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as tweets from './controller';
import imageUploadProcessor from '../../middleware/media-image';


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
router.post('/tweets', imageUploadProcessor, async (ctx, next) => {
  ctx.body = await tweets.create(ctx);
});

/**
 * DELETE /tweets
 */
router.del('/tweets', async (ctx, next) => {
  await tweets.removeAll();
  ctx.body = null;
});

/**
 * DELETE /tweets/:id
 */
router.del('/tweets/:id', async (ctx, next) => {
  ctx.body = await tweets.remove(ctx.params.id as string);
});

const routes: Koa.Middleware = router.routes();

export default routes;
