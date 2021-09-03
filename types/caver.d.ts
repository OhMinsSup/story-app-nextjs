/// <reference types="klaytn.d.ts" />

declare module 'caver-js' {
  interface HttpProvider {}

  interface WebsocketProvider {}

  interface IpcProvider {}

  export type AccountKeyLegacy = {
    keyType: 1;
    key: Object;
  };

  export type AccountKeyPublic = {
    keyType: 2;
    key: {
      x: string;
      y: string;
    };
  };

  export type AccountKeyFail = {
    keyType: 3;
    key: Object;
  };

  export type AccountKeyWeightedMultiSig = {
    keyType: 4;
    key: {
      threshold: number;
      keys: [
        {
          weight: number;
          key: Pick<AccountKeyPublic, 'key'>;
        },
      ];
    };
  };

  export type AccountKeyRoleBased = {
    keyType: 5;
    key: AccountKeyPublic[];
  };

  export type AllAccountKeyTypes =
    | AccountKeyLegacy
    | AccountKeyPublic
    | AccountKeyFail
    | AccountKeyWeightedMultiSig
    | AccountKeyRoleBased;

  interface AccountResultObject {
    accType: number;
    account: {
      nonce: number;
      balance: string;
      humanReadable: boolean;
      key: AllAccountKeyTypes;
    };
  }

  export class Klay {
    /**
     * @constructor
     * @param {Caver}  연결할 노드의 url 문자열입니다. 공급자 인스턴스를 직접 전달할 수 있습니다
     * */
    constructor(
      provider: string | HttpProvider | WebsocketProvider | IpcProvider,
    );

    /**
     * @description 다음 메서드의 매개변수에 from 속성이 지정되지 않은 경우 이 기본 주소가 기본 from 속성으로 사용됩니다.
     * @description 20바이트 문자열 - 모든 Klaytn 주소. 노드 또는 키 저장소에 해당 주소에 대한 개인 키가 있어야 합니다. 기본값은 정의되지 않습니다
     * */
    public defaultAccount?: string;

    /**
     * @description 주소와 연결된 계정이 생성되면 true를 반환합니다. 그렇지 않으면 false를 반환합니다.
     * @description NOTE accountCreated는 네트워크에 계정이 존재하는지 확인하기 때문에 키 페어가 생성되어도
     * @description 실제 블록체인 네트워크에 해당 주소와 일치하는 계정이 없으면 false를 반환한다.
     * @param {string} 네트워크에서 생성되었는지 확인하기 위해 쿼리하려는 계정의 주소입니다.
     * @param {number | string | undefined} defaultBlock 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {(err: any, result: boolean) => void | undefined} callback 콜백함수로 결과를 받습니다.
     * @returns {Promise<boolean>} 입력 주소의 존재.
     * @example
     * caver.klay.accountCreated('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
     * true
     * caver.klay.accountCreated('0x6a616d696e652e6b6c6179746t00000000000000').then(console.log);
     * false
     * */
    public accountCreated(
      address: string,
      defaultBlock?: number | string,
      callback?: (err: any, result: boolean) => void,
    ): Promise<boolean>;

    /**
     * @description 선택한 계정의 현재 잔액을 반환합니다.
     * @param {string} address 잔액을 가져올 주소입니다.
     * @param {number | string} (선택 사항) 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @returns {Promise<string>} 현재 잔액 (현재 잔액(peb)의 정수입니다.)
     * @example
     * const account = provider.selectedAddress
     * const balance = await caver.klay.getBalance(account)
     * */
    public getBalance: (
      account: string,
      defaultBlock?: number | string,
    ) => Promise<string>;

    /**
     * @description 주어진 주소의 계정 정보를 반환합니다.
     * @description Klaytn에는 외부 소유 계정(EOA)과 스마트 계약 계정의 두 가지 계정 유형이 있습니다. Klaytn 계정을 참조하십시오.
     * @param {string} address 잔액을 가져올 주소입니다.
     * @param {number | string} (선택 사항) 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @returns {Promise<AccountResultObject | null>} Promise는 계정 정보를 포함하는 JSON 개체인 JSON 개체를 반환합니다.
     * @example
     * > caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c').then(console.log);
        { 
          accType: 1,
          account:
          { 
            nonce: 3,
            balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
            humanReadable: false,
            key: { keyType: 1, key: {} } 
          } 
        }

        > caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c', 'latest').then(console.log);
        { 
          accType: 1,
          account:
          { 
            nonce: 3,
            balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
            humanReadable: false,
            key: { keyType: 1, key: {} } 
          } 
        }
     * */
    public getAccount: (
      address: string,
      defaultBlock?: number | string,
      callback?: (err: any, result: AccountResultObject | null) => void,
    ) => Promise<AccountResultObject | null>;

    /**
     * @description 노드가 제어하는 ​​계정 목록을 반환합니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @returns {Promise<string[]>}
     * @example
     * > caver.klay.getAccounts().then(console.log);
      ["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
     * */
    public getAccounts: (
      callback?: (err: any, result: string[]) => void,
    ) => Promise<string[]>;

    /**
     * @description 주어진 주소의 외부 소유 계정(EOA)의 계정 키를 반환합니다.
     * @description 계정에 AccountKeyLegacy가 있거나 지정된 주소의 계정이 스마트 계약 계정인 경우 빈 키 값을 반환합니다. 계정 키를 참조하십시오.
     * @param {string} address 잔액을 가져올 주소입니다.
     * @param {number | string} (선택 사항) 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @returns {Promise<AllAccountKeyTypes | null>}
     * */
    public getAccountKey: (
      address: string,
      defaultBlock?: number | string,
      callback?: (err: any, result: AllAccountKeyTypes | null) => void,
    ) => Promise<AllAccountKeyTypes | null>;

    /**
     * @description 특정 주소의 코드를 가져옵니다.
     * @param {string} address 잔액을 가져올 주소입니다.
     * @param {number | string} (선택 사항) 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @example
     * > caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
       "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
     * @returns {Promise<string>} 주어진 주소 주소의 데이터를 반환합니다.
     * */
    public getCode: (
      address: string,
      defaultBlock?: number | string,
      callback?: (err: any, result: string) => void,
    ) => Promise<string>;

    /**
     * @description Klaytn 네트워크에 특정한 서명된 데이터를 생성합니다.
     * @description 서명이 어떻게 생성되는지는 Klaytn Platform API - klay_sign을 참조하세요.
     * @param {string} 서명할 메시지입니다.
     * @param {string} 메시지에 서명할 계정의 주소입니다.
     * @param {?(err: any, result: string) => void} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.
     * @returns {string} 계정의 개인 키로 서명된 메시지 서명을 반환합니다.
     * @example
     * const account = provider.selectedAddress
     * const message = 'Message to sign'
     * const signedMessage = await caver.klay.sign(message, from)
     * caver.klay.sign('Message to sign', '0x1427ac5d0f1c3174ee6ea05d29a9b05fd31d7579').then(console.log)
     * 0xde8bd2f5a45de6b1baea57ed0219735ab60f0ef55c5e31a4b774824abea31bfc34c8bdbca43ed4155e8e6a8e0d11d7aba191ba025e0487ada2bcc422252b81591b
     * */
    public sign: (
      message: string,
      address: string,
      callback?: (err: any, result: string) => void,
    ) => Promise<string>;

    /**
     * @description 이 주소에서 보낸 트랜잭션 수를 가져옵니다.
     * @param {string} 트랜잭션 수를 가져올 주소입니다.
     * @param {number | string} (선택 사항) 블록 번호, 보류 중인 nonce에 대해 보류 중인 문자열 또는 기본 블록 매개변수에서와 같이 가장 이른 또는 가장 늦은 문자열입니다. 생략하면 최신이 사용됩니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @example
     * > caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
       "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
     * @returns {Promise<number>} 지정된 주소에서 보낸 트랜잭션 수입니다.
     * */
    public getTransactionCount: (
      address: string,
      blockNumber?: number | string,
      callback?: (err: any, result: number) => void,
    ) => Promise<number>;

    /**
     * @description 특정 블록 번호 시점에 입력 계정에 비어 있지 않은 codeHash가 있으면 true를 반환합니다.
     * @description 계정이 EOA이거나 codeHash가 없는 스마트 계약 계정이면 false를 반환합니다.
     * @param {string} address 잔액을 가져올 주소입니다.
     * @param {number | string} (선택 사항) 이 매개변수를 전달하면 caver.klay.defaultBlock으로 설정된 기본 블록을 사용하지 않습니다.
     * @param {Function} (선택 사항) 선택적 콜백, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다
     * @returns {Promise<boolean>} true는 입력 매개변수가 기존 스마트 계약 주소임을 의미합니다
     * */
    public isContractAccount: (
      address: string,
      defaultBlock?: number | string,
      callback?: (err: any, result: boolean) => void,
    ) => Promise<boolean>;
  }

  export default class Caver implements klay {
    /**
     * @constructor
     * @param {string | HttpProvider | WebsocketProvider | IpcProvider}  연결할 노드의 url 문자열입니다. 공급자 인스턴스를 직접 전달할 수 있습니다
     * */
    constructor(
      provider: string | HttpProvider | WebsocketProvider | IpcProvider,
    );

    public klay: Klay;
  }
}
