export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let lastArgs: Parameters<T>

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...lastArgs)
        timeout = null
      }, delay)
    }
  }

  return throttled
}
