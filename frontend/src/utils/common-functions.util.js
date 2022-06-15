function debounce(func, delay = 500) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    return new Promise(
      (resolve) =>
        (timeout = setTimeout(() => {
          resolve(func.apply(this, args))
        }, delay))
    )
  }
}

module.exports = {
  debounce,
}
