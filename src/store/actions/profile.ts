import { Principal } from "@dfinity/principal";
import { Profile } from "@dfx/local/canisters/profile/profile.did";
import { createAsyncAction, errorResult, successResult } from "pullstate";

export const getProfileByPrincipal = createAsyncAction(
  async ({ actors, principal }) => {
    if (!actors || !principal) return errorResult();
    const result: Array<Profile> = await actors.profile.getProfileByPrincipal(
      principal
    );
    if (result && result.length > 0) {
      return successResult(result[0]);
    }
    return errorResult();
  }
);

export const getProfileByEth = createAsyncAction(
  async ({ actors, ethAddress }) => {
    if (!actors || !ethAddress) return errorResult();
    const result: Array<Profile> = await actors.profile.getProfileByEth(
      ethAddress
    );
    if (result && result.length > 0) {
      return successResult(result[0]);
    }
    return errorResult();
  }
);

export const getPrincipalByEth = createAsyncAction(
  async ({ actors, ethAddress }) => {
    if (!actors || !ethAddress) return errorResult();
    const result: Array<Principal> = await actors.profile.getPrincipalByEth(
      ethAddress
    );
    if (result && result.length > 0) {
      return successResult(result[0]);
    }
    return errorResult();
  }
);
