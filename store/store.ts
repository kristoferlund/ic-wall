import { useMemo } from "react";
import { Store, createPullstateCore } from "pullstate";

// Not currently in use
export const UIStore = new Store({});

export const PullstateCore = createPullstateCore({
  UIStore,
});

export function useInstance(snapshot: any) {
  return useMemo(() => {
    if (!snapshot) return PullstateCore.instantiate();
    return PullstateCore.instantiate({ hydrateSnapshot: JSON.parse(snapshot) });
  }, [snapshot]);
}
