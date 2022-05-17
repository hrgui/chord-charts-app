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

export async function handleFileSave(fileContents: string, promptNewFilePicker) {
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
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  return contents;
}
