export type Action = () => Promise<void>;

export const runActions = async (actions: Action[]) => {
  for (const action of actions) await action();
};
