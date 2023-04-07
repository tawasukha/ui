export function debouncePromise<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  abortValue: any = undefined,
) {
  let cancel = () => { };
  // type Awaited<T> = T extends PromiseLike<infer U> ? U : T
  type ReturnT = Awaited<ReturnType<T>>;
  const wrapFunc = async (...args: Parameters<T>): Promise<ReturnT> => {
    cancel();
    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => { resolve(fn(...args)); }, wait);
      cancel = () => {
        clearTimeout(timer);
        if (abortValue !== undefined) {
          reject(abortValue);
        }
      };
    });
  };
  return wrapFunc;
}