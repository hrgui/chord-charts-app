import PouchDB from "pouchdb-browser";
import pouchDbFind from "pouchdb-find";
PouchDB.plugin(pouchDbFind);

const db = new PouchDB("chord-charts");

db.createIndex({
  index: {
    fields: ["type"],
  },
});

export default db;

(window as any).db = db;
