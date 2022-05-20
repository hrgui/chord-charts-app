export function triggerDownload(dataOrUri: Uint8Array, name: string): void {
  // If the data is provided as Buffer, we create a
  // blob URL out of it to produce a valid link
  let url: string;
  const blob = new Blob([dataOrUri]);
  url = URL.createObjectURL(blob);

  // Ensure to free the data from DOM eventually
  setTimeout(() => URL.revokeObjectURL(url));

  // In order to download from the browser, the only way seems
  // to be creating a <a> element with download attribute that
  // points to the file to download.
  // See also https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download
  const anchor = document.createElement("a");
  document.body.appendChild(anchor);
  anchor.download = name;
  anchor.href = url;
  anchor.click();

  // Ensure to remove the element from DOM eventually
  setTimeout(() => document.body.removeChild(anchor));
}

export function triggerUpload(): Promise<File | undefined> {
  return new Promise<File | undefined>((resolve) => {
    // In order to upload to the browser, create a
    // input element of type `file` and click it
    // to gather the selected files
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.type = "file";
    input.multiple = true;

    input.onchange = () => {
      let file = (input as any).files[0];
      resolve(file);
    };

    input.click();

    // Ensure to remove the element from DOM eventually
    setTimeout(() => document.body.removeChild(input));
  });
}
