import React, { useEffect } from 'react';

// hooks
import { useRouter } from 'next/router';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';
import { useAtomValue } from 'jotai';
import { authAtom } from '@atoms/authAtom';

export const withAuthGuard = (
  WrappedComponent: React.ComponentType,
): React.FC => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const isAuthication = useAtomValue(authAtom);

    useEffect(() => {
      if (isAuthication) return;
      const redirect = router.asPath;
      router.replace(`${PAGE_ENDPOINTS.LOGIN}?${redirect}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthication]);

    return <WrappedComponent {...props} />;
  };
};

export const withAuthGuardRedirect = (
  WrappedComponent: React.ComponentType,
  redirect?: string,
): React.FC => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const isAuthication = useAtomValue(authAtom);
    const router = useRouter();

    useEffect(() => {
      if (isAuthication) {
        const override = redirect || PAGE_ENDPOINTS.INDEX;
        router.replace(override);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthication]);

    return <WrappedComponent {...props} />;
  };
};
