import { triggerDownload, triggerUpload } from "./dom-file";

let _fileHandle: FileSystemFileHandle | null = null;

export function getCurrentFileHandle(): FileSystemFileHandle | null {
  return _fileHandle;
}

export function setFileHandle(fileHandle: FileSystemFileHandle | null) {
  _fileHandle = fileHandle;
}

export async function writeFile(fileHandle: FileSystemFileHandle, contents: string) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}

export async function getNewFileHandle() {
  const handle = await window.showSaveFilePicker();
  return handle;
}

function isFileHandleUnsupported() {
  return !window.showOpenFilePicker || !window.showSaveFilePicker;
}

function _unsupportedFileSave(fileContents) {
  const filename = prompt("Save file as...") || "db.json";
  return triggerDownload(fileContents, filename!);
}

export async function handleFileSave(fileContents: string, promptNewFilePicker) {
  if (isFileHandleUnsupported()) {
    return _unsupportedFileSave(fileContents);
  }

  let currentFileHandle = getCurrentFileHandle();

  // if the file is not set, ask the user to save a file
  // or if its a file save as
  if (!currentFileHandle || promptNewFilePicker) {
    currentFileHandle = await getNewFileHandle();
    setFileHandle(currentFileHandle);
  }

  await writeFile(currentFileHandle!, fileContents);
}

export async function handleFileOpen() {
  if (isFileHandleUnsupported()) {
    const file = await triggerUpload();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsText(file!);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
    });
  }

  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  return contents;
}
