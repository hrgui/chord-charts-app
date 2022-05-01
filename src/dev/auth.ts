export function getDevUser() {
  console.log({
    uid: process.env.VITE_APP_DEV_AUTH_UID,
    displayName: process.env.VITE_APP_DEV_AUTH_DISPLAY_NAME,
    currentGroupId: process.env.VITE_APP_DEV_AUTH_CURRENT_GROUP_ID,
    role: process.env.VITE_APP_DEV_AUTH_ROLE,
  });
  return {
    uid: process.env.VITE_APP_DEV_AUTH_UID,
    displayName: process.env.VITE_APP_DEV_AUTH_DISPLAY_NAME,
    currentGroupId: process.env.VITE_APP_DEV_AUTH_CURRENT_GROUP_ID,
    role: process.env.VITE_APP_DEV_AUTH_ROLE,
  };
}

export function getDevAuthToken() {
  const user = (window as any).store ? (window as any).store.getState().auth.user : getDevUser();

  return "";
}
