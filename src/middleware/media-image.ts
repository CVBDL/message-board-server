import * as Koa from 'koa';
import * as multer from 'koa-multer';


// Form field name used to upload image.
const fieldName = 'media_image';

// The memory storage engine stores the files in memory as Buffer objects.
// It doesn't have any options.
const storage = multer.memoryStorage();

// Max field value size in bytes.
const fieldSize = 3 * 1024 * 1024;  // 3M

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: fieldSize
  },
  /**
   * @param {multer.File} file
      {
        fieldname: 'media_image',
        originalname: 'test.PNG',
        encoding: '7bit',
        mimetype: 'image/png'
      }
   */
  fileFilter: function fileFilter(req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    cb(null, true);
  }
});

// Error out if more than maxCount files are uploaded.
const maxCount = 9;

const middleware: Koa.Middleware = upload.fields([{
  name: fieldName,
  maxCount: maxCount
}]);

export default middleware;

/**
 * Get uploaded files.
 * 
 * @param req HTTP request instance.
 * 
 * @returns Multer file instances.
 * 
 * @example
    req.files[fieldName][0] = {
      fieldname: 'media_image',
      originalname: 'test.PNG',
      encoding: '7bit'
      mimetype: 'image/png',
      buffer: < Buffer 90 d6 d8 00 00 00 > ,
      size: 1622
    }
 */
export function getUploadedImageFiles(req: multer.MulterIncomingMessage): multer.File[] {
  let files: multer.File[] = [];

  // Not request as form submit, so this middleware is bypassed.
  if (!req.files) {
    return files;
  }

  // We're not using this API.
  // https://github.com/expressjs/multer#arrayfieldname-maxcount
  if (Array.isArray(req.files)) {
    return files;
  }

  files = req.files[fieldName];

  return files;
}
