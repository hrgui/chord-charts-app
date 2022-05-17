import PouchDB from "pouchdb-browser";
import pouchDbFind from "pouchdb-find";
PouchDB.plugin(pouchDbFind);

let dbInstance = createDb();

export async function hasUserInputtedData() {
  const data = await getDb().allDocs({ include_docs: true });
  // a row exists with type
  const userInputtedData = data.rows.filter((d) => {
    const _doc = d.doc as unknown as { type: "string" };
    return !!_doc.type;
  });

  return userInputtedData.length > 0;
}

function createDb() {
  const _db = new PouchDB("chord-charts");
  _db.createIndex({
    index: {
      fields: ["type"],
    },
  });

  (window as any).db = _db;

  return _db;
}

export async function destroySession() {
  await getDb().destroy();
  return setDb(createDb());
}

export function setDb(db) {
  dbInstance = db;
}

export function getDb() {
  return dbInstance;
}
