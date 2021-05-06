import { createAsyncAction, errorResult, successResult } from "pullstate";
import { Post } from "@/ic/generated/wall/wall";

export const getWall = createAsyncAction(async ({ actors }) => {
  const result: Array<Post> = await actors.wall.get();
  if (result) {
    return successResult(result);
  }
  return errorResult();
});
