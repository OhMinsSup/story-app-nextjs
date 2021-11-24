import React, { useMemo } from 'react';
import UAParser from 'ua-parser-js';

const useUAParser = (uastring: string | undefined = undefined) => {
  const ua = useMemo(() => {
    return new UAParser(uastring);
  }, [uastring]);
  return ua;
};

export default useUAParser;
