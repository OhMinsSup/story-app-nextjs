import React, { useState, useRef } from 'react';
import classNames from 'classnames';

// components
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';

const noop = (value: any) => {};

const props = {
  prefixCls: 'ant-upload',
};

const { prefixCls } = props;

interface FileItemProps {}
const FileItem: React.FC<FileItemProps> = () => {
  // progress 정보를 노출하기 위해서 사용
  const [showProgress, setShowProgress] = useState(false);
  const progressRafRef = useRef<any>();
  React.useEffect(() => {
    progressRafRef.current = setTimeout(() => {
      setShowProgress(true);
    }, 300);

    return () => {
      window.clearTimeout(progressRafRef.current);
    };
  }, []);

  const spanClassName = `${prefixCls}-span`;

  const iconNode = iconRender(file);
  let icon = <div className={`${prefixCls}-text-icon`}>{iconNode}</div>;
  if (listType === 'picture' || listType === 'picture-card') {
    if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
      const uploadingClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: file.status !== 'uploading',
      });
      icon = <div className={uploadingClassName}>{iconNode}</div>;
    } else {
      const thumbnail = isImgUrl?.(file) ? (
        <img
          src={file.thumbUrl || file.url}
          alt={file.name}
          className={`${prefixCls}-list-item-image`}
        />
      ) : (
        iconNode
      );
      const aClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file),
      });
      icon = (
        <a
          className={aClassName}
          onClick={(e) => onPreview(file, e)}
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {thumbnail}
        </a>
      );
    }
  }

  const infoUploadingClass = classNames({
    [`${prefixCls}-list-item`]: true,
    [`${prefixCls}-list-item-${file.status}`]: true,
    [`${prefixCls}-list-item-list-type-${listType}`]: true,
  });
  const linkProps =
    typeof file.linkProps === 'string'
      ? JSON.parse(file.linkProps)
      : file.linkProps;

  const removeIcon = showRemoveIcon
    ? actionIconRender(
        (typeof customRemoveIcon === 'function'
          ? customRemoveIcon(file)
          : customRemoveIcon) || <DeleteOutlineIcon />,
        () => onClose(file),
        prefixCls,
      )
    : null;

  const downloadIcon =
    showDownloadIcon && file.status === 'done'
      ? actionIconRender(
          (typeof customDownloadIcon === 'function'
            ? customDownloadIcon(file)
            : customDownloadIcon) || <CloudDownloadIcon />,
          () => onDownload(file),
          prefixCls,
        )
      : null;

  const downloadOrDelete = listType !== 'picture-card' && (
    <span
      key="download-delete"
      className={classNames(`${prefixCls}-list-item-card-actions`, {
        picture: listType === 'picture',
      })}
    >
      {downloadIcon}
      {removeIcon}
    </span>
  );

  const listItemNameClass = classNames(`${prefixCls}-list-item-name`);
  const preview = file.url
    ? [
        <a
          key="view"
          target="_blank"
          rel="noopener noreferrer"
          className={listItemNameClass}
          title={file.name}
          {...linkProps}
          href={file.url}
          onClick={(e) => onPreview(file, e)}
        >
          {file.name}
        </a>,
        downloadOrDelete,
      ]
    : [
        <span
          key="view"
          className={listItemNameClass}
          onClick={(e) => onPreview(file, e)}
          title={file.name}
        >
          {file.name}
        </span>,
        downloadOrDelete,
      ];

  const previewStyle: React.CSSProperties = {
    pointerEvents: 'none',
    opacity: 0.5,
  };
  const previewIcon = showPreviewIcon ? (
    <a
      href={file.url || file.thumbUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={file.url || file.thumbUrl ? undefined : previewStyle}
      onClick={(e) => onPreview(file, e)}
      title="Preview file"
    >
      <VisibilityIcon />
    </a>
  ) : null;

  const actions = listType === 'picture-card' &&
    file.status !== 'uploading' && (
      <span className={`${prefixCls}-list-item-actions`}>
        {previewIcon}
        {file.status === 'done' && downloadIcon}
        {removeIcon}
      </span>
    );

  let message;
  if (file.response && typeof file.response === 'string') {
    message = file.response;
  } else {
    message =
      file.error?.statusText || file.error?.message || locale.uploadError;
  }
  const iconAndPreview = (
    <span className={spanClassName}>
      {icon}
      {preview}
    </span>
  );

  const dom = (
    <div className={infoUploadingClass}>
      <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
      {actions}
      {showProgress && (
        <CSSMotion
          motionName={`${rootPrefixCls}-fade`}
          visible={file.status === 'uploading'}
          motionDeadline={2000}
        >
          {({ className: motionClassName }) => {
            // show loading icon if upload progress listener is disabled
            const loadingProgress =
              'percent' in file ? (
                <Progress
                  {...progressProps}
                  type="line"
                  percent={file.percent}
                />
              ) : null;

            return (
              <div
                className={classNames(
                  `${prefixCls}-list-item-progress`,
                  motionClassName,
                )}
              >
                {loadingProgress}
              </div>
            );
          }}
        </CSSMotion>
      )}
    </div>
  );

  const listContainerNameClass = classNames(
    `${prefixCls}-list-${listType}-container`,
    className,
  );

  return (
    <div className={listContainerNameClass} style={style} ref={ref}>
      {itemRender
        ? itemRender(dom, file, items, {
            download: onDownload.bind(null, file),
            preview: onPreview.bind(null, file),
            remove: onClose.bind(null, file),
          })
        : dom}
    </div>
  );
};

export default FileItem;
