import { useState } from 'react';

// cookie
import Cookies from 'js-cookie';

// hooks
import { useMemoizedFn } from './useMemoizedFn';

// utils
import { isFunction, isString } from '@utils/assertion';

export type State = string | undefined;

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

export function useCookieState(cookieKey: string, options: Options = {}) {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey);

    if (isString(cookieValue)) return cookieValue;

    if (isFunction(options.defaultValue)) {
      return options.defaultValue();
    }

    return options.defaultValue;
  });

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      const { defaultValue, ...restOptions } = { ...options, ...newOptions };
      setState((prevState) => {
        const value = isFunction(newValue) ? newValue(prevState) : newValue;
        if (value === undefined) {
          Cookies.remove(cookieKey);
        } else {
          Cookies.set(cookieKey, value, restOptions);
        }
        return value;
      });
    },
  );

  return [state, updateState] as const;
}
