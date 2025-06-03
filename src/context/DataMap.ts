import type { DataMapType } from '../types/data';

class DataMap {
  #data: Partial<DataMapType> = {};

  constructor(initialData?: DataMap) {
    if (initialData instanceof DataMap) {
      this.#data = { ...initialData.#data };
    } else {
      this.#data = {};
    }
  }

  set<K extends keyof DataMapType>(key: K, value: DataMapType[K]): this {
    this.#data[key] = value;
    return this;
  }

  get<K extends keyof DataMapType>(key: K): DataMapType[K] | undefined {
    return this.#data[key];
  }

  has(key: keyof DataMapType): boolean {
    return key in this.#data;
  }

  delete(key: keyof DataMapType): boolean {
    if (key in this.#data) {
      delete this.#data[key];
      return true;
    }

    return false;
  }

  clear(): void {
    this.#data = {};
  }
}

export default DataMap;
