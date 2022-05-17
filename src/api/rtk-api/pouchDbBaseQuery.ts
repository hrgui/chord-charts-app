import { getDb } from "api/db";
import { nanoid } from "nanoid";

export enum ApiMethod {
  get = "get",
  create = "create",
  list = "list",
  update = "update",
  delete = "delete",
}

export type PouchDbBaseQueryArgs = {
  method: ApiMethod;
  type: string;
  body?: { [name: string]: any };
  id?: string | number;
  listArgs?: { [name: string]: any };
};

// await db.find({selector: {type: "Song", _id: {$in: ["2022-05-02T15:29:47.390Z", "2022-05-02T04:25:40.871Z"]}}})

const pouchDbAdapter = {
  [ApiMethod.get]: (args: PouchDbBaseQueryArgs) => getDb().get(args.id as string),
  [ApiMethod.list]: (args: PouchDbBaseQueryArgs) =>
    getDb().find({ selector: { type: args.type, ...args.listArgs } }),
  [ApiMethod.create]: (args: Required<PouchDbBaseQueryArgs>) =>
    getDb().put({ _id: nanoid(), type: args.type, ...args.body }),
  [ApiMethod.update]: (args: Required<PouchDbBaseQueryArgs>) => getDb().put(args.body),
  [ApiMethod.delete]: (args: Required<PouchDbBaseQueryArgs>) =>
    getDb().remove(args.body as { [name: string]: any; _id: string; _rev: string }),
};

const pouchDbBaseQuery = async (
  args: PouchDbBaseQueryArgs,
  { signal, dispatch, getState },
  extraOptions
) => {
  try {
    console.log("pouchDbBaseQuery args", args);
    const res = await pouchDbAdapter[args.method](args as Required<PouchDbBaseQueryArgs>);
    console.log("pouchDbBaseQuery response", res);
    return { data: res };
  } catch (e) {
    return { error: e };
  }
};

export default pouchDbBaseQuery;
