import * as Router from 'koa-router';
import * as multer from 'koa-multer';
import { Document, Query } from 'mongoose';

import Tweet from './model';
import * as photoCtrl from "../photo/controller";
import { getUploadedImageFiles } from '../../middleware/media-image';

/**
 * List all tweets.
 * 
 * @returns An array of tweets.
 */
export async function list(): Promise<Document[]> {
  return await Tweet.find();
}

/**
 * Get a single tweet.
 * 
 * @param id Tweet id.
 * 
 * @returns The found tweet.
 */
export async function get(id: string): Promise<Document | null> {
  return await Tweet.findById(id);
}

/**
 * Create a new tweet.
 * 
 * @param ctx Context.
 * 
 * @returns The saved tweet.
 */
export async function create(ctx: Router.IRouterContext) {
  let reqMulter: multer.MulterIncomingMessage =
    ctx.req as multer.MulterIncomingMessage;

  if (isMultipartFormData(ctx.request.type)) {
    let images: multer.File[] =
      getUploadedImageFiles(reqMulter);
    let media: any[] = [];

    for (let i = 0; i < images.length; i++) {
      const image: multer.File = images[i];
      const base64content: string = image.buffer.toString('base64');
      const mimeType: string = image.mimetype;
      const size: number = image.size;

      try {
        let photo: any = await photoCtrl.create({ base64content, mimeType, size });
        media.push({
          _id: photo._id,
          type: 'photo'
        });

      } catch(e) { /* error handling */}
    }

    return await new Tweet({
      text: reqMulter.body.text,
      entities: { media }
    });

  } else {
    return await new Tweet(ctx.request.body).save();
  }
}

/**
 * Delete a single tweet.
 * 
 * @param id Tweet id.
 * 
 * @returns The deleted tweet.
 */
export async function remove(id: string): Promise<Document | null> {
  return await Tweet.findByIdAndRemove(id);
}

/**
 * Delete all tweets.
 */
export async function removeAll(): Promise<Query<any>> {
  return await Tweet.remove({});
}

function isMultipartFormData(type: string): boolean {
  type = type || '';

  const contentType = 'multipart/form-data';

  return (contentType === type.toLowerCase());
}
