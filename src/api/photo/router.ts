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

router.get('/photos/:metadata', async (ctx, next) => {
  // ctx.body = await photos.get(ctx.params.id as string);
  let photoResponse = await photos.get(ctx.params.metadata as string);
  ctx.response.body = photoResponse.body;
  ctx.response.type = photoResponse.type;
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
