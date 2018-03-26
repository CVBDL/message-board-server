import { Document } from 'mongoose';

import Tweet from './model';


/**
 * Tweet controller.
 */
class Controller {
  /**
   * List all tweets.
   */
  public async list(): Promise<Document[]> {
    return await Tweet.find();
  }

  /**
   * Get a single tweet.
   * @param id Tweet id.
   */
  public async get(id: string): Promise<Document | null> {
    return await Tweet.findById(id);
  }

  /**
   * Create a new tweet.
   * @param doc Tweet document.
   */
  public async create(doc: any) {
    return await new Tweet(doc).save();
  }

  /**
   * Delete a single tweet.
   * @param id Tweet id.
   */
  public async remove(id: string): Promise<Document | null> {
    return await Tweet.findByIdAndRemove(id);
  }

  /**
   * Delete all tweets.
   */
  public async removeAll(): Promise<any> {
    return await Tweet.remove({});
  }

  /**
   * Update a tweet.
   * @param id Tweet id.
   * @param doc Tweet document.
   */
  public async update(id: string, doc: any) {}
}

export default new Controller();
