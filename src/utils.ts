/** @private is the given object a Function? */
export const isFunction = (obj: any): obj is Function => typeof obj === "function";

export const isMobile = () => {
  return !window.matchMedia("(min-width: 640px)").matches;
};
