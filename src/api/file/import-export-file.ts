import { getDb } from "~/api/db";
import { handleFileOpen, handleFileSave } from ".";

export async function saveDbToFile(promptNewFilePicker = false) {
  const doc = await getDb().allDocs({ include_docs: true });
  const out = doc.rows.map(({ doc }) => doc);
  handleFileSave(JSON.stringify(out), promptNewFilePicker);
}

export async function importDbFromFile() {
  const contents = await handleFileOpen();
  await getDb().bulkDocs(JSON.parse(contents), { new_edits: false });
}
