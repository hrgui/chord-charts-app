import { action, thunk, Action, Thunk } from "easy-peasy";
import { getDevUser } from "dev/auth";

function _isAuthenticated() {
  if (process.env.DEV && process.env.VITE_APP_USE_DEV_AUTH === "1") {
    return getDevUser();
  }
}

export interface AuthModel {
  user?: any;
  setUser: Action<any, any>;
  isAuthenticated: Thunk<any>;
  setCurrentGroup: Action<any, string>;
  logout: Thunk<any, any>;
  setCurrentGroupInSession: Thunk<any, any>;
}

const auth: AuthModel = {
  user: undefined,
  setUser: action((state: any, payload) => {
    state.user = payload;
  }),
  logout: thunk(async (actions: any) => {
    actions.setUser(null);
  }),
  setCurrentGroupInSession: thunk(async (actions: any, payload) => {
    window.location.reload();
  }),
  setCurrentGroup: action((state: any, payload: string) => {
    state.user.currentGroupId = payload;
  }),
  isAuthenticated: thunk(async (actions: any, payload, { getState }) => {
    const currentUser = (getState() as any).user;
    if (currentUser) {
      return currentUser;
    }
    const user = await _isAuthenticated();
    actions.setUser(user);
    return user;
  }),
};

export default auth;
