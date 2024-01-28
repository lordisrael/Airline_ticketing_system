const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/custom-api");
const {
  ConflictError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../error");


const errorMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Please try again",
    stack: err.stack,
  };
  // if(err instanceof CustomAPIError) {
  //     return res.status(err.statusCode).json({msg:err.message})
  // }
  if (err instanceof UnauthenticatedError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Duplicate entry. Please provide unique data.",
    });
  }
  if (err.name === 'SequelizeDatabaseError' && err.parent && err.parent.code === '23503') {
      // This handles foreign key constraint violations.
      customError.msg = 'Referenced record not found.';
      customError.statusCode = 400;
    }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
    stack: customError.stack,
  });
};

module.exports = errorMiddleware;


