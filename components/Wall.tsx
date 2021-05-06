import React from "react";

import { getWall } from "@/store/actions/wall";
import { createAnonymousActors } from "@/ic/actor";

import Userinfo from "@/components/wall/Userinfo";

export default function Component() {
  const actors = createAnonymousActors();
  const [finished, result] = getWall.useBeckon({ actors });
  const wall = result?.payload;

  if (!finished) return <div>Loading…</div>;
  if (!wall) return <div>Error</div>;

  if (wall.length === 0)
    return (
      <div className="p-5 mb-4 text-center bg-green-800 rounded-lg">
        The wall is empty, start filling it!
      </div>
    );

  return (
    <div className="pb-4">
      {wall
        .slice()
        .reverse()
        .map((post) => (
          <div className="mb-5 text-center">
            <div className="p-5 mb-2 text-white bg-green-800 rounded-lg">
              {post.text}
            </div>
            <Userinfo principal={post.user} />
          </div>
        ))}
    </div>
  );
}
