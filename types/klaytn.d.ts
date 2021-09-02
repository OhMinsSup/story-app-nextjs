interface TransactionParameter {
  gas: string;
  to: string;
  from: string;
  value: string;
}

interface WalletWatchAsset {
  type: 'ERC20'; // Initially only supports ERC20, but eventually more!
  options: {
    address: string; // The address that the token is at.
    symbol: string; // A ticker symbol or shorthand, up to 5 chars.
    decimals: number; // The number of decimals in the token
    image: string; // A string url of the token logo
  };
}

interface KlaytnSendAsyncParams {
  method: 'klay_sendTransaction' | 'wallet_watchAsset';
  params: TransactionParameter[] | WalletWatchAsset;
  from?: string;
  id?: number;
}

declare namespace klaytn {
  /**
   * @description 현재 블록체인의 네트워크 ID를 나타내는 숫자 문자열을 반환합니다.
   * @description'1001': Baobab Test Network
   * @description '8217': Cypress Main Network
   * */
  const networkVersion: number;

  /**
   * @description 현재 사용자가 선택한 주소를 나타내는 16진수 접두사가 붙은 문자열을 반환합니다
   * @example (예: "0xfdea65c8e26263f6d9a1b5de9555d2931a33b825").
   * */
  const selectedAddress: string;

  /**
   * @description 사용자가 Kaikas를 설치했는지 여부에 따라 true 또는 false를 반환합니다.
   * */
  const isKaikas: boolean;

  /**
   * @description 네트워크가 변경되면 Kaikas는 공급자에게 요청한 모든 페이지를 다시 로드합니다.
   * @description 네트워크 변경 시 자동 새로 고침을 비활성화하려면 다음을 수행할 수 있습니다.
   * @description 이것은 언제든지 켜거나 끌 수 있습니다. (기본값은 true)
   * */
  const autoRefreshOnNetworkChange: boolean;

  /**
   * @description  Kaikas 사용자에게 연결 요청을 보냅니다.
   * @description 16진 접두사가 붙은 Klaytn 주소 문자열 배열의 약속을 반환합니다.
   * @description 사용자가 요청을 수락하면 BApp에 사용자 계정 정보에 대한 액세스 권한이 부여됩니다.
   * */
  function enable(): Promise<string[]>;

  /**
   * @description klay_sendTransaction Kaikas 브라우저에 메시지를 보냅니다. 메시지 형식은 Klaytn JSON-RPC API 형식에 매핑됩니다.
   * @description wallet_watchAsset wallet_watchAsset은 토큰을 등록하는 특별한 방법입니다. 자세한 내용은 토큰 등록을 참조하세요
   * */
  function sendAsync(
    options: KlaytnSendAsyncParams,
    callback: (...args: any[]) => void,
  ): void;

  /**
   * @description 공급자는 일부 이벤트에 대한 수신을 지원합니다.
   * @description accountChanged, 업데이트된 계정 배열을 반환합니다.
   * @description networkChanged는 네트워크 ID 문자열을 반환합니다.
   * */
  function on(
    event: 'accountsChanged' | 'networkChanged',
    callback: (...args: any[]) => void,
  ): void;

  /**
   * @description 개발자의 편의를 위해 Kaikas는 _kaikas 네임스페이스 아래에 3가지 유용한 메서드를 제공합니다.
   * */
  interface _kaikas {
    /**
     * @description 이 메서드는 현재 도메인에 사용자 계정에 대한 액세스 권한이 있는지 여부를 나타내는 부울을 반환합니다.
     * @description 이는 사용자가 현재 세션에 대한 계정 액세스를 승인했는지 여부를 확인하는 데 유용합니다.
     * */
    isEnabled: () => boolean;

    /**
     * @description 이 메서드는 현재 도메인에 캐시된 승인이 있는지 여부를 나타내는 부울로 확인되는 약속을 반환합니다.
     * @description 이는 과거 승인이 있는지 여부를 나타내기 때문에 klaytn.enable()이 호출될 때 승인 팝업이 표시되는지 여부를 결정하는 데 유용합니다.
     * */
    isApproved: () => Promise<boolean>;

    /**
     * @description 이 메서드는 Kaikas가 잠금 해제되었는지 여부를 나타내는 부울로 확인되는 Promise를 반환합니다.
     * @description 이것은 사용자가 계정 노출을 승인했는지 여부를 나타내지 않습니다.
     * */
    isUnlocked: () => Promise<boolean>;
  }
}
