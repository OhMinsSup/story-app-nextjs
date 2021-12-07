import {
  RcFile as OriRcFile,
  UploadRequestOption as RcCustomRequestOptions,
} from 'rc-upload/lib/interface';

export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'done'
  | 'uploading'
  | 'removed';

export type UploadType = 'drag' | 'select';
export type UploadListType = 'text' | 'picture' | 'picture-card';
export type UploadListProgressProps = Omit<any, 'percent' | 'type'>;

export interface RcFile extends OriRcFile {
  readonly lastModifiedDate: Date;
}

export interface UploadFile<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: RcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}

export interface UploadChangeParam<T extends object = UploadFile> {
  file: T;
  fileList: UploadFile[];
  event?: { percent: number };
}

export interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: RcFile;
}

export interface UploadProps<T = any> {
  defaultFileList?: Array<UploadFile<T>>;
  fileList?: Array<UploadFile<T>>;
  style?: React.CSSProperties;

  // actions
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  onChange?: (info: UploadChangeParam) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

  // config
  id?: string;
  maxCount?: number;
  listType?: UploadListType;
}
