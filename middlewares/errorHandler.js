const errorHandler = (error, req, res, next) => {
  let status = 500
  let messages = [`500 Internal server error`]
  let listError
  switch (error.name) {
    case `SequelizeValidationError`:
        listError = error.errors.map((el) => {
            return el.message
        })
        status = 400
        messages = listError
        console.log(listError);
    break;

    case `SequelizeUniqueConstraintError`:
      listError = error.errors.map((el) => {
            return el.message
        })
        status = 400
        messages = listError
    break;

    case `AuthenticationError`:
      status = 401
      messages = [ `401 Invalid email or password` ]
    break;

    case `Unauthenticated`:
      status = 401
      messages = [ `401 Unauthenticated access` ]
    break;
      
    case `JsonWebTokenError`:
      status = 401
      messages = [ `401 Invalid signature` ]
    break;

    default:
      console.log(error)
      status
      messages
      break;
  }
  res.status(status).json({ messages })
}

module.exports = errorHandler
