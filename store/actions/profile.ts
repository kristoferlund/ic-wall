import { Profile } from "@/ic/canisters_generated/profile/profile.did";
import { createAsyncAction, errorResult, successResult } from "pullstate";

export const getOwnProfile = createAsyncAction(async ({ actors, account }) => {
  const result: Profile = await actors.profile.getOwnProfile();

  if (result) {
    return successResult(result);
  }
  return errorResult();
});

export const getUserProfile = createAsyncAction(
  async ({ actors, principal }) => {
    if (!actors || !principal) return errorResult();
    const result: Array<Profile> = await actors.profile.getByPrincipal(
      principal
    );
    if (result) {
      return successResult(result[0]);
    }
    return errorResult();
  }
);
