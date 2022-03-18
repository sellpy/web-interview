class ApiError extends Error {
  constructor(status, message, opts) {
    super(message, opts);
    this.status = status;
    // If provided, we keep the stack from the original error
    if (opts?.cause) {
      const message_lines =  (this.message.match(/\n/g)||[]).length + 1;
      this.stack = this.stack.split('\n').slice(0, message_lines+1).join('\n') + '\n' + opts.cause.stack;
    }
  }
}

class InternalError extends ApiError {
  constructor(message, opts) {
    super(500, message, opts);
  }
}

class NotFoundError extends ApiError {
  constructor(message, opts) {
    super(404, message, opts);
  }
}

class IoError extends InternalError {
  constructor(message, opts) {
    super(message, opts);
  }
}

module.exports = {
  ApiError,
  IoError,
  NotFoundError
}