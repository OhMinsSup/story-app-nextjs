import { WEB_APP } from '@constants/constant';
import localforage from 'localforage';
import uniqueId from 'lodash-es/uniqueId';

class LocalforageStorage {
  private id: string;
  private storageKey: string;
  private ready: boolean;
  private localforage: LocalForage;

  constructor(storageKey?: string) {
    this.id = uniqueId('story-storage-');

    this.storageKey = storageKey ?? WEB_APP;

    this.ready = false;

    localforage.config({ name: this.storageKey });

    this.localforage = localforage.createInstance({
      name: this.storageKey,
      driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB],
    });
  }

  async getLocalStorageKeys() {
    const keys = await this.localforage.keys();
    return keys;
  }

  async getData() {
    await this.readyStorage();
    const output: Record<string, any> = {};
    const keys = await this.getLocalStorageKeys();
    const promises = keys.map((key) =>
      this.getItem(key).then((data) => {
        output[key] = data;
      }),
    );
    await Promise.all(promises);
    return output;
  }

  async getItem(key: string) {
    const originalData = await this.localforage.getItem(key);
    try {
      const { value } = originalData as Record<string, any>;
      return value as any;
    } catch (error) {
      return undefined;
    }
  }

  async setItem(
    key: string,
    value: Record<string, any> | string | number | boolean,
  ) {
    await this.localforage.setItem(key, {
      value,
      setter: this.id,
    });
  }

  async removeItem(key: string) {
    await this.localforage.removeItem(key);
  }

  get instanceId() {
    return this.id;
  }

  get instance() {
    return this.localforage;
  }

  get driver() {
    switch (this.localforage.driver()) {
      case localforage.WEBSQL:
        return 'WEBSQL';
      case localforage.INDEXEDDB:
        return 'INDEXEDDB';
      case localforage.LOCALSTORAGE:
        return 'LOCALSTORAGE';
      default:
        return null;
    }
  }

  async readyStorage() {
    if (this.ready) {
      return;
    }
    if (typeof this.localforage.ready === 'function') {
      await this.localforage.ready();
    }
    this.ready = true;
  }
}

export const StoryStorage = new LocalforageStorage();

export default LocalforageStorage;
