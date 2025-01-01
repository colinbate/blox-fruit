type CallbackFunction = (...args: any[]) => void | Promise<void>;

function throttle<F extends CallbackFunction>(func: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return async function (...args: Parameters<F>) {
    if (!timeoutId) {
      await func(...args);

      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}
