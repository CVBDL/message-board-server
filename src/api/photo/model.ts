import { Document, Schema } from 'mongoose';

import Photo from "./photo";
import { getConnection } from '../../core/db';


const modelName: string = 'photo';

interface IMimeFileExtensionMap {
  'image/png': string[],
  'image/jpeg': string[],
  [ key: string ]: string[]
}
const MimeFileExtensionMap: IMimeFileExtensionMap = {
  'image/png': ['png'],
  'image/jpeg': ['jpeg', 'jpg']
};

function getSchema(modelName: string): Schema {
  const schema = new Schema({
    base64content: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      enum: Object.keys(MimeFileExtensionMap),
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }

  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

  schema.virtual('resourceName').get(() => modelName);

  return schema;
}

/**
 * Define chart model.
 */
export default getConnection().model<PhotoModel>(modelName, getSchema(modelName));

export interface PhotoModel extends Photo, Document {
  resourceName: string;
}

export function doesSupportFormat(format: string | undefined): boolean {
  if (!format) {
    return false;
  }

  for (const mime in MimeFileExtensionMap) {
    if (MimeFileExtensionMap.hasOwnProperty(mime)) {
      const fileExtensions: string[] = MimeFileExtensionMap[mime];
      if (fileExtensions.indexOf(format.toLowerCase()) > -1) {
        return true;
      }
    }
  }

  return false;
}

export function doesPhotoSupportFormat(photo: PhotoModel, format: string | undefined): boolean {
  if (!format || !doesSupportFormat(format)) {
    return false;
  }

  return (
    MimeFileExtensionMap[photo.mimeType].indexOf(format.toLowerCase()) > -1
  );
}
