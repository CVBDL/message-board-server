import { Document, Query } from 'mongoose';

import Photo from './model';


/**
 * List all photos.
 * 
 * @returns An array of tweets.
 */
export async function list(): Promise<Document[]> {
  return await Photo.find();
}

/**
 * Create a new photo.
 * 
 * @param doc New photo values.
 * @param {string} doc.base64content Base64 encoded photo content.
 * @param {string} doc.mimeType Photo MIME type.
 * @param {number} doc.size Photo size in bytes.
 * 
 * @returns The saved photo.
 */
export async function create(doc: any): Promise<Document | null> {
  return await new Photo(doc).save();
}

/**
 * Get a single photo.
 * 
 * @param id Photo id.
 * 
 * @returns The found photo.
 */
export async function get(id: string): Promise<Document | null> {
  return await Photo.findById(id);
}

/**
 * Delete a single photo.
 * 
 * @param id Photo id.
 * 
 * @returns The deleted photo.
 */
export async function remove(id: string): Promise<Document | null> {
  return await Photo.findByIdAndRemove(id);
}

/**
 * Delete all photos.
 */
export async function removeAll(): Promise<Query<any>> {
  return await Photo.remove({});
}
