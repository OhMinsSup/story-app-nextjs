// valid check key store file
export const validKeystore = (keystore?: string | ArrayBuffer | null) => {
  if (!keystore) return false;
  if (keystore instanceof ArrayBuffer) {
    keystore = JSON.stringify(Array.from(new Uint8Array(keystore)));
  }

  const parsedKeystore = JSON.parse(keystore);
  const keys = ['version', 'id', 'address', 'keyring'];
  return keys.every((key) => parsedKeystore[key]);
};

// valid klaytn and kaikas
export const isKlaytn =
  typeof window === 'undefined' ||
  typeof window.klaytn === 'undefined' ||
  !window.klaytn.isKaikas;

// make signature from message
export const signatureMessage = (
  walletAddress: string,
  requestType: string,
) => {
  return `address:${walletAddress}\n timestamp:${Date.now()} ${requestType}`;
};
