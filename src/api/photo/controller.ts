import { Document, Query } from 'mongoose';

import
  Photo,
  {
    PhotoModel,
    doesSupportFormat,
    doesPhotoSupportFormat
  } from './model';

import ClientError from '../../core/client-error';


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
 * @param metadata Photo id.
 * 
 * @returns The found photo.
 */
export async function get(metadata: string): Promise<PhotoResult> {
  const { id, format } = parse(metadata);

  if (!id) {
    throwError(400, 'Photo id is missing in URL.');
  }

  if (format) {
    return getPhotoWithFormat(id, format);

  } else {
    return getPhoto(id);
  }
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


function parse(metadata: string) {
  const sep: string = '.';
  const [ id, format ] = metadata.split(sep);

  return { id, format };
}

function throwError(status: number, message: string) {
  throw ({ status, message } as ClientError);
}

function throwNotFoundError() {
  const status: number = 404;
  const message: string = 'Photo not found.';
  throwError(status, message);
}

interface PhotoResult {
  body: PhotoModel | Buffer,
  type: string
}

async function getPhoto(id: string): Promise<PhotoResult> {
  const photo: PhotoModel | null = await Photo.findById(id);

  if (!photo) {
    throwNotFoundError();
  }

  const body = photo as PhotoModel;
  const type = 'application/json';
  return { body, type };
}

async function getPhotoWithFormat(id: string, format: string): Promise<PhotoResult> {
  if (!doesSupportFormat(format)) {
    throwError(400, `File format "${format}" is not supported.`);
  }

  const photo: PhotoModel | null = await Photo.findById(id);

  if (!photo) {
    throwNotFoundError();
  }

  if (!doesPhotoSupportFormat((photo as PhotoModel), format)) {
    throwError(400, `File format "${format}" is not supported for this photo.`);
  }

  const body = Buffer.from((photo as PhotoModel).base64content, 'base64');
  const type = (photo as PhotoModel).mimeType;
  return { body, type };
}
