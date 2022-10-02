import { isNull, isUndefined } from '@utils/assertion';
import { delay } from '@utils/utils';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

type UnionFileSchema = FileSchema | UploadRespSchema;

const resourceMap = new Map<string | number, Resource>();

const imgloader =
  ({ decode = true, crossOrigin = '' }) =>
  (record: UnionFileSchema | undefined): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isUndefined(record)) {
        return reject(new Error('No image source found for this resource'));
      }

      const i = new Image();
      if (crossOrigin) i.crossOrigin = crossOrigin;
      i.onload = () => {
        decode && i.decode ? i.decode().then(resolve).catch(reject) : resolve();
      };
      i.onerror = reject;
      i.src = record.secureUrl;
    });
  };

const videoLoader =
  () =>
  (record: UnionFileSchema | undefined): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isUndefined(record)) {
        return reject(new Error('No video source found for this resource'));
      }

      const video = document.createElement('video');
      video.onloadeddata = () => {
        document.body.removeChild(video);
        resolve();
      };
      video.hidden = true;
      video.onerror = reject;
      video.src = record.secureUrl;
      document.body.appendChild(video);
    });
  };

// sequential map.find for promises
const promiseFind = (arr: UnionFileSchema[], type: 'IMAGE' | 'VIDEO') => {
  let done = false;
  return new Promise<UnionFileSchema | undefined>((resolve, reject) => {
    const queueNext = async (record: UnionFileSchema | undefined) => {
      if (isUndefined(record)) {
        return undefined;
      }

      await delay(1000);

      if (type === 'VIDEO') {
        return videoLoader()(record).then(() => {
          done = true;
          resolve(record);
        });
      }

      return imgloader({ decode: true })(record).then(() => {
        done = true;
        resolve(record);
      });
    };

    arr
      .reduce((p, record) => {
        // ensure we aren't done before enquing the next source
        return p.catch(() => {
          if (!done) return queueNext(record);
        });
      }, queueNext(arr.shift()))
      .catch(reject);
  });
};

interface ResourceConstructor {
  file: UnionFileSchema | null;
  type: 'IMAGE' | 'VIDEO';
}

class Resource {
  private _resources: UnionFileSchema[] = [];

  private _error: Error | null = null;
  private _loader: ReturnType<typeof promiseFind>;
  private _promise: ReturnType<typeof promiseFind> | null = null;
  private _result: UnionFileSchema | null;

  constructor(params: ResourceConstructor) {
    if (params.file) {
      this._resources.push(params.file);
    }

    this._error = null;
    this._loader = promiseFind(this._resources, params.type);
    this._promise = null;
    this._result = null;
  }

  /**
   * Loads the resource if necessary.
   */
  load() {
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader
        .then((result) => {
          if (result) {
            this._result = result;
          }
          return result;
        })
        .catch((error: Error) => {
          this._error = error;
          throw error;
        });
      this._promise = promise;
    }
    return promise;
  }

  get() {
    if (this._result != null) {
      return this._result;
    }
  }

  read() {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

// one loading
export const MediaResource = (
  module: UnionFileSchema,
  type: 'IMAGE' | 'VIDEO',
) => {
  let resource = resourceMap.get(module.id);
  if (isNull(resource) || isUndefined(resource)) {
    resource = new Resource({
      file: module,
      type,
    });
    resourceMap.set(module.id, resource);
  }

  const resourceData = resource.get();

  if (
    type === 'IMAGE' &&
    resourceData &&
    module.secureUrl !== resourceData.secureUrl
  ) {
    // 이미 한번 로드된 데이터인데 이미지가 변경된 경우 다시 로드하도록 한다.
    resource = new Resource({
      file: module,
      type,
    });
    resourceMap.set(module.id, resource);
  } else if (
    type === 'VIDEO' &&
    resourceData &&
    module.secureUrl !== resourceData.secureUrl
  ) {
    // 이미 한번 로드된 데이터인데 비디오가 변경된 경우 다시 로드하도록 한다.
    resource = new Resource({
      file: module,
      type,
    });
    resourceMap.set(module.id, resource);
  }

  return resource;
};
