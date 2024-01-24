const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Please try again",
    stack: err.stack,
  };
  // if(err instanceof CustomAPIError) {
  //     return res.status(err.statusCode).json({msg:err.message})
  // }
  // if(err.name === 'SequelizeUniqueConstraintError') {
  //     customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  //     customError.statusCode = 400
  // }
  // if (err.name === 'SequelizeDatabaseError' && err.parent && err.parent.code === '23503') {
  //     // This handles foreign key constraint violations.
  //     customError.msg = 'Referenced record not found.';
  //     customError.statusCode = 400;
  //   }
  if (err.name === "SequelizeValidationError") {
    customError.msg = err.errors.map((error) => error.message).join(",");
    customError.statusCode = 400;
  }
  // if (err.name === 'SequelizeDatabaseError' && err.parent && err.parent.code === '23505') {
  //     // This handles unique constraint violations.
  //     customError.msg = 'Duplicate entry.';
  //     customError.statusCode = 400;
  // }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
    stack: customError.stack,
  });
};

module.exports = errorMiddleware;
