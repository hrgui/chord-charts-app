import db from "api/db";

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
};

const pouchDbAdapter = {
  [ApiMethod.get]: (args: PouchDbBaseQueryArgs) => db.get(args.id as string),
  [ApiMethod.list]: (args: PouchDbBaseQueryArgs) => db.find({ selector: { type: args.type } }),
  [ApiMethod.create]: (args: Required<PouchDbBaseQueryArgs>) =>
    db.put({ _id: new Date().toISOString(), type: args.type, ...args.body }),
  [ApiMethod.update]: (args: Required<PouchDbBaseQueryArgs>) => db.put(args.body),
  [ApiMethod.delete]: (args: Required<PouchDbBaseQueryArgs>) =>
    db.remove(args.body as { [name: string]: any; _id: string; _rev: string }),
};

const pouchDbBaseQuery = async (
  args: PouchDbBaseQueryArgs,
  { signal, dispatch, getState },
  extraOptions
) => {
  try {
    console.log("sup", args);
    const res = await pouchDbAdapter[args.method](args as Required<PouchDbBaseQueryArgs>);
    return { data: res };
  } catch (e) {
    return { error: e };
  }
};

export default pouchDbBaseQuery;
