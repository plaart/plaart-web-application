type TimerFunction = (callback: FrameRequestCallback) => number;
type ThrottledFunction = (callback: () => void) => void;

const throttle = (timer: TimerFunction): ThrottledFunction => {
  let queuedCallback: (() => void) | null = null;

  return (callback: () => void) => {
    if (!queuedCallback) {
      timer(() => {
        const cb = queuedCallback;
        queuedCallback = null;
        cb?.();
      });
    }
    queuedCallback = callback;
  };
};

export const throttleWrite: ThrottledFunction = throttle(requestAnimationFrame);
