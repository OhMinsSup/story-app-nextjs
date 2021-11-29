import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {}
const FileUpload: React.FC<FileUploadProps> = (props) => {
  const [files, setFiles] = useState<any[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div
      className="inline-flex rounded-sm mb-2 mr-2 w-28 h-28 p-1 box-border border-solid bg-gray-100"
      key={file.name}
    >
      <div className="flex w-full overflow-hidden">
        <img
          className="object-cover w-full h-full block"
          src={file.preview}
          alt="thumb"
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="dropzone-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>파일을 업로드 해주세요.</p>
      </div>

      <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
};

export default FileUpload;
