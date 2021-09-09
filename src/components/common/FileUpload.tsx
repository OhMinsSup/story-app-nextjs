import React, { useCallback, useEffect, useRef } from "react";

// Import React FilePond
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import type { FilePondErrorDescription, FilePondFile } from "filepond";

// 이미지 미리보기 ( png, jpg, jpeg )
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// 파일 타입 검사
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// 파일 사이즈 검사
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// 이미지 사이즈 검사
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
// 파일 다운로드
import FilePondPluginGetFile from "filepond-plugin-get-file";
// 미디어 미리보기 ( mp4, mp3 )
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";

registerPlugin(
  FilePondPluginMediaPreview,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginGetFile,
);

export interface FileUploadProps extends FilePondProps {
  onSetUploadFile: (
    file: FilePondFile | null,
    error: FilePondErrorDescription | null,
    removeFile?: FilePondFile | null,
  ) => void;
  getPond?: (pond: FilePond) => void;
  enabledDescription?: boolean;
  file?: string | File | null;
  acceptMineTypes?: string[];
  acceptExtensions?: string[];
  limitSize?: string;
  imageMaxWidth?: number;
  imageMaxHeight?: number;
  imagePreviewMaxHeight?: number;
  imagePreviewMinHeight?: number;
  desc?: string;
  disabled?: boolean;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onSetUploadFile,
  getPond,
  acceptMineTypes,
  acceptExtensions,
  limitSize,
  imageMaxWidth,
  imageMaxHeight,
  maxFiles,
  desc,
  file,
  disabled,
  imagePreviewMinHeight,
  imagePreviewMaxHeight,
  enabledDescription,
  children,
  ...reset
}) => {
  const uploadRef = useRef<FilePond | null>(null);

  useEffect(() => {
    if (!uploadRef.current) return;
    if (!file) return;
    if (file instanceof File) {
      console.log(uploadRef.current?.addFile);
      uploadRef.current?.addFile(file, { type: "local" });
      return;
    }

    fetch(
      file, /*'https://asset.i-manual.co.kr/banner/file_1629788298320.png'*/
      {
        cache: "no-cache",
        mode: "cors",
      },
    )
      .then((res) => res.blob()) // Gets the response and returns it as a blob
      .then((blob) => {
        const profilePicture = new File([blob], "symbol", {
          type: "image/*",
        });
        uploadRef.current?.addFile(profilePicture, { type: "local" });
      })
      .catch(console.error);
  }, [uploadRef.current, file]);

  const onInit = useCallback(() => {
    if (!uploadRef.current) return;
    // powered by FilePond
    const creditsEle = document.querySelector<HTMLAnchorElement>(
      "a.filepond--credits",
    );
    // powered by FilePond remove
    if (creditsEle) creditsEle.remove();
    if (getPond && typeof getPond === "function") getPond(uploadRef.current);
  }, [uploadRef.current, getPond]);

  return (
    <>
      {enabledDescription && (
        <small id="symbolImageHelp" className="form-text text-muted">
          {desc
            ? (
              <>{desc}</>
            )
            : (
              <div className="upload-file-limit-desc">
                <div>
                  파일유형{" "}
                  <span>
                    {`${
                      acceptExtensions?.map((extention) =>
                        extention.toUpperCase()
                      )
                    }`}
                  </span>
                </div>
                <div>
                  파일용량 <span>{`${limitSize}`}</span>
                </div>
                <div>
                  파일크기 <span>{`${imageMaxWidth} x ${imageMaxHeight}`}</span>
                </div>
              </div>
            )}
        </small>
      )}
      <FilePond
        ref={uploadRef}
        acceptedFileTypes={acceptMineTypes}
        onaddfile={(error, file) => onSetUploadFile(file, error)}
        onremovefile={(error, file) => onSetUploadFile(null, error, file)}
        allowMultiple={false}
        name="files"
        oninit={onInit}
        imageValidateSizeMaxWidth={imageMaxWidth}
        imageValidateSizeMaxHeight={imageMaxHeight}
        maxFileSize={limitSize}
        maxFiles={maxFiles}
        disabled={disabled}
        imagePreviewMinHeight={imagePreviewMinHeight}
        imagePreviewMaxHeight={imagePreviewMaxHeight}
        styleButtonRemoveItemPosition={"right"}
        {...reset}
      />
      {children}
    </>
  );
};

export default FileUpload;

FileUpload.defaultProps = {
  acceptMineTypes: ["image/png", "image/jpeg"],
  acceptExtensions: ["png", "jpg", "jpeg"],
  limitSize: "100MB",
  imageMaxWidth: 65535,
  imageMaxHeight: 65535,
  imagePreviewMinHeight: 500,
  imagePreviewMaxHeight: 1000,
  maxFiles: 1,
};
