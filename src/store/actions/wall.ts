import { Post } from "@/ic/canisters_generated/wall/wall.did";
import { createAsyncAction, errorResult, successResult } from "pullstate";

export const getWall = createAsyncAction(async ({ actors, filter }) => {
  if (!actors) return errorResult();
  filter = filter || {};
  const result: Array<Post> = await actors.wall.wall(JSON.stringify(filter));
  if (result) {
    return successResult(result);
  }
  console.error(errorResult);
  return errorResult();
});
