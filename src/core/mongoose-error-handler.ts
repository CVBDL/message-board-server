import { Error as MongooseError } from 'mongoose';


/**
 * Handle various moogoose errors.
 * <http://mongoosejs.com/docs/api.html#Error>
 */
export class MongooseErrorHandler {
  public static handle(err: MongooseError) {
    let result;
    switch (err.name) {
      case 'DocumentNotFoundError':
        result = MongooseErrorHandler.handleDocumentNotFoundError(err);
        break;
      case 'CastError':
        result = MongooseErrorHandler.handleCastError(err);
        break;
      case 'ValidationError':
        result = MongooseErrorHandler.handleValidationError(err);
        break;
      case 'ValidatorError':
        result = MongooseErrorHandler.handleValidatorError(err);
        break;
      case 'VersionError':
        result = MongooseErrorHandler.handleVersionError(err);
        break;
      default:
        result = MongooseErrorHandler.handleDefaultError(err);
        break;
    }
    return result;
  }

  private static handleDocumentNotFoundError(err: MongooseError) {
    const message =
      `Database: Save failed because the document not found. ${err.message}`;
    const status = 400;

    return { message, status };
  }

  private static handleCastError(err: MongooseError) {
    const message =
      `Database: Cast values failed. ${err.message}`;
    const status = 400;

    return { message, status };
  }

  private static handleValidationError(err: MongooseError) {
    const message =
      `Database: Validation failed. ${err.message}`;
    const status = 400;

    return { message, status };
  }

  private static handleValidatorError(err: MongooseError) {
    const message =
      `Database: Has validator errors. ${err.message}`;
    const status = 400;

    return { message, status };
  }

  private static handleVersionError(err: MongooseError) {
    const message =
      `Database: Save failed because the document is modified by others. ${err.message}`;
    const status = 400;

    return { message, status };
  }

  private static handleDefaultError(err: MongooseError) {
    const message =
      `Database: Error occurred when operating database. ${err.message}`;
    const status = 400;

    return { message, status };
  }
}
