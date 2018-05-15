import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as photos from './controller';


const router = new Router();

/**
 * GET /photos
 */
router.get('/photos', async (ctx, next) => {
  ctx.body = await photos.list();
});

/**
 * GET /photos/:id.format
 */
router.get('/photos/:metadata', async (ctx, next) => {
  const result = await photos.get(ctx.params.metadata as string);
  ctx.response.body = result.body;
  ctx.response.type = result.type;
});

/**
 * DELETE /tweets
 */
router.del('/photos', async (ctx, next) => {
  await photos.removeAll();
  ctx.body = null;
});

const routes: Koa.Middleware = router.routes();

export default routes;
