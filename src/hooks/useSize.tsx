import { useLayoutEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useRafState from './useRafState';
import { BasicTarget, getTargetElement } from '@utils/utils';

type Size = { width?: number; height?: number };

function useSize(target: BasicTarget): Size {
  const [state, setState] = useRafState<Size>(() => {
    const el = getTargetElement(target);
    return {
      width: ((el || {}) as HTMLElement).clientWidth,
      height: ((el || {}) as HTMLElement).clientHeight,
    };
  });

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(el as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setState, target]);

  return state;
}

export default useSize;
