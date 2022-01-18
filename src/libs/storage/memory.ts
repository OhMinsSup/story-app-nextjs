class MemoryStorage {
  private data: Map<string, any>;
  constructor() {
    this.data = new Map();
  }

  getItem(key: string) {
    return this.data.get(key);
  }

  setItem(key: string, value: Record<string, any>) {
    this.data.set(key, value);
  }

  removeItem(key: string) {
    this.data.delete(key);
  }

  get length() {
    return this.data.size;
  }

  key(idx: number) {
    return [...this.data.keys()][idx];
  }

  keys() {
    return [...this.data.keys()];
  }

  ready() {
    return true;
  }

  clear() {
    this.data.clear();
  }
}

export default MemoryStorage;
