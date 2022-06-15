const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'Internal server error.',
}

const internalServerError = (req, res, error) => {
  console.log(error)
  res.status(INTERNAL_SERVER_ERROR.code).json(INTERNAL_SERVER_ERROR)
}

const checkMissingParameters = (requiredParameters) => {
  const missingParameters = Object.entries(requiredParameters)
    .map(([paramKey, paramValue]) => {
      if (paramValue === undefined) return paramKey
    })
    .filter((_) => _)

  if (missingParameters.length > 0) {
    return {
      code: 400,
      message: `Missing required parameters: ${missingParameters.join(', ')}.`,
    }
  }
}

module.exports = {
  internalServerError,
  checkMissingParameters,
}
