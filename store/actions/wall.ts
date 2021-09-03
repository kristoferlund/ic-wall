import { Post } from "@/ic/canisters_generated/wall/wall.did";
import { createAsyncAction, errorResult, successResult } from "pullstate";

export const getWall = createAsyncAction(async ({ actors }) => {
  const result: Array<Post> = await actors.wall.get();
  if (result) {
    return successResult(result);
  }
  return errorResult();
});
