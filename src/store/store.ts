import { createPullstateCore, Store } from "pullstate";
import { useMemo } from "react";

// Not currently in use
export const GlobalWallState = new Store({
  welcomeToastShown: false,
});

export const PullstateCore = createPullstateCore({
  GlobalWallState,
});

export function useInstance(snapshot: any) {
  return useMemo(() => {
    if (!snapshot) return PullstateCore.instantiate();
    return PullstateCore.instantiate({ hydrateSnapshot: JSON.parse(snapshot) });
  }, [snapshot]);
}
