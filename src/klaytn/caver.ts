/**
 * caver-js library helps making connection with klaytn node.
 * You can connect to specific klaytn node by setting 'rpcURL' value.
 * default rpcURL is 'https://api.baobab.klaytn.net:8651'.
 */
import Caver from 'caver-js';
import { existsKlaytn } from '@utils/utils';

// const BAOBAB_TESTNET_RPC_URL = 'https://api.baobab.klaytn.net:8651/';
// const rpcURL = BAOBAB_TESTNET_RPC_URL;

let caver: any = null;
if (!existsKlaytn) {
  caver = new Caver(window.klaytn);
}

export default caver;
