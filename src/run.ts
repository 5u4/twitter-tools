import { Action } from "./actions/action";

export const run = async (actions: Action[]) => {
  for (const action of actions) await action();
};
