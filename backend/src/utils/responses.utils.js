const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'Internal server error.',
}

const internalServerError = (req, res, error) => {
  console.log(error)
  res.status(INTERNAL_SERVER_ERROR.code).json(INTERNAL_SERVER_ERROR)
}

// Gives error response if any of the required parameters are missing.
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

// Gives error response if all of the parameters are missing.
const checkMissingAllParameters = (parameters) => {
  const anyParameterExists =
    Object.values(parameters).find((value) => value !== undefined) !== undefined

  if (!anyParameterExists) {
    return {
      code: 400,
      message: 'Missing parameters.',
    }
  }
}

module.exports = {
  internalServerError,
  checkMissingParameters,
  checkMissingAllParameters,
}
