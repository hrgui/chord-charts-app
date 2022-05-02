import PouchDB from "pouchdb-browser";
import pouchDbFind from "pouchdb-find";
PouchDB.plugin(pouchDbFind);

const db = new PouchDB("chord-charts");

db.createIndex({
  index: {
    fields: ["type"],
  },
})
  .then((x) => console.log(x))
  .catch((e) => console.error(e));

export default db;

window.db = db;
