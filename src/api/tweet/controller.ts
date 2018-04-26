import * as Router from 'koa-router';
import * as multer from 'koa-multer';
import { Document, Query } from 'mongoose';

import Tweet from './model';
import * as photoCtrl from "../photo/controller";
import { getUploadedImageFiles } from '../../middleware/media-image';

/**
 * @todo remove class
 */

/**
 * Tweet controller.
 */
class Controller {
  /**
   * List all tweets.
   * 
   * @returns An array of tweets.
   */
  public async list(): Promise<Document[]> {
    return await Tweet.find();
  }

  /**
   * Get a single tweet.
   * 
   * @param id Tweet id.
   * 
   * @returns The found tweet.
   */
  public async get(id: string): Promise<Document | null> {
    return await Tweet.findById(id);
  }

  /**
   * Create a new tweet.
   * 
   * @param ctx Context.
   * 
   * @returns The saved tweet.
   */
  public async create(ctx: Router.IRouterContext) {
    let reqMulter: multer.MulterIncomingMessage =
      ctx.req as multer.MulterIncomingMessage;

    if (this.isMultipartFormData(ctx.request.type)) {
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
  public async remove(id: string): Promise<Document | null> {
    return await Tweet.findByIdAndRemove(id);
  }

  /**
   * Delete all tweets.
   */
  public async removeAll(): Promise<Query<any>> {
    return await Tweet.remove({});
  }

  private isMultipartFormData(type: string): boolean {
    type = type || '';

    const contentType = 'multipart/form-data';

    return (contentType === type.toLowerCase());
  }
}

export default new Controller();
