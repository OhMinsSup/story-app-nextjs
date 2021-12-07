import React, { useState, useMemo } from 'react';
import RcUpload, { UploadProps as RcUploadProps } from 'rc-upload';
import CSSMotion, { CSSMotionList, CSSMotionListProps } from 'rc-motion';
import classNames from 'classnames';

import { useMergedState } from '@hooks/useMergedState';

import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from './interface';

const Upload: React.FC<UploadProps> = ({
  defaultFileList,
  fileList,
  onChange,
  onDrop,
  maxCount,
  children,
}) => {
  const [mergedFileList, setMergedFileList] = useMergedState(
    defaultFileList || [],
    {
      value: fileList,
      postState: (list) => list ?? [],
    },
  );

  const [dragState, setDragState] = useState<string>('drop');

  // Control mode will auto fill file uid if not provided
  useMemo(() => {
    const timestamp = Date.now();

    (fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`;
      }
    });
  }, [fileList]);

  console.log('fileList ===>', fileList);

  console.log('mergedFileList ===>', mergedFileList);

  const onInternalChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: { percent: number },
  ) => {
    let cloneList = [...changedFileList];

    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }

    setMergedFileList(cloneList);

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList,
    };

    if (event) {
      changeInfo.event = event;
    }

    onChange?.(changeInfo);
  };

  const mergedBeforeUpload = (file: RcFile, fileListArgs: RcFile[]) => {};

  const onBatchStart = () => {};

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type);

    if (e.type === 'drop') {
      onDrop?.(e);
    }
  };

  const renderUploadList = () => {};

  return (
    <span>
      <div onDrop={onFileDrop} onDragOver={onFileDrop} onDragLeave={onFileDrop}>
        <RcUpload>{children}</RcUpload>
      </div>
      {renderUploadList()}
    </span>
  );
};

export default Upload;
