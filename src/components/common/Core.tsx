import React, { useEffect } from "react";
import { existsKlaytn } from "@utils/utils";
import useKlaytn from "@store/useKlaytn";

const Core: React.FC = () => {
  const { setNetwork, network } = useKlaytn();

  console.log("network", network);

  useEffect(() => {
    if (!existsKlaytn) {
      klaytn.on("networkChanged", () => {
        setNetwork(klaytn.networkVersion);
      });

      klaytn.on("accountsChanged", async () => {
        console.log(klaytn);
        const account = klaytn.selectedAddresst;
        // TODO: checked current login account is same as account
      });
    }
  }, []);

  return null;
};

export default Core;
