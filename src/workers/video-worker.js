importScripts('/js/mp4box.all.min.js');

self.onmessage = async function (e) {
  const fileObj = e.data.file;
  const objectURL = URL.createObjectURL(fileObj);

  const file = self.MP4Box.createFile();
  file.onError = (e) => {
    console.log(e);
    URL.revokeObjectURL(objectURL);
    self.postMessage({
      type: 'ERROR',
      mp4File: null,
      error: e,
    });
  };

  file.onReady = (info) => {
    console.log(info);
    URL.revokeObjectURL(objectURL);
    self.postMessage({
      type: 'SUCCESS',
      mp4File: info,
      error: null,
    });
  };

  const resp = await self.fetch(objectURL);
  const reader = resp.body.getReader();

  let offset = 0;
  let mp4File = file;

  function appendBuffers({ done, value }) {
    if (done) {
      mp4File.flush();
      return;
    }

    let buf = value.buffer;
    buf.fileStart = offset;

    offset += buf.byteLength;

    mp4File.appendBuffer(buf);

    return reader.read().then(appendBuffers);
  }

  await reader.read().then(appendBuffers);
};
