export async function uploadFile(url: string, file: File, onProgress: (percentage: number) => void, name = "file"): Promise<any> {
  return await new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    onProgress(0)
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      resolve(resp);
    };
    xhr.onerror = (evt) => { reject(evt); };
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append(name, file);

    xhr.send(formData);
  });
}