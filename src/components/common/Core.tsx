import React, { useEffect } from 'react';
import { existsKlaytn } from '@utils/utils';

const Core: React.FC = () => {
  useEffect(() => {
    if (!existsKlaytn) {
      klaytn.on('networkChanged', () => {
        // setNetwork(klaytn.networkVersion);
      });

      klaytn.on('accountsChanged', () => {
        console.log(klaytn);
        // const account = klaytn.selectedAddress;
        // TODO: checked current login account is same as account
      });
    }
  }, []);

  return null;
};

export default Core;
