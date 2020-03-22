export function sleep(time, ...args) {
  return new Promise(resolve => setTimeout(resolve, time, ...args))
}
