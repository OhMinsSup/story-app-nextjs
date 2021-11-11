import React from 'react';

interface IntersectionObserverParams {
  onIntersect: (...args: any[]) => void;
  target?: React.MutableRefObject<HTMLElement | null>;
  root?: HTMLElement & { current: HTMLElement | null };
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: IntersectionObserverParams) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect(entry)),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [target, enabled]);
}
