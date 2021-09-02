/// <reference types="klaytn.d.ts" />

declare module 'caver-js' {
  export interface HttpProvider {}

  export interface WebsocketProvider {}

  export interface IpcProvider {}

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
