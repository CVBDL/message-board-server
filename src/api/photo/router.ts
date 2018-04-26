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
 * DELETE /tweets
 */
router.del('/photos', async (ctx, next) => {
  await photos.removeAll();
  ctx.body = null;
});

const routes: Koa.Middleware = router.routes();

export default routes;
