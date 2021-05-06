import React from "react";

import { useInternetComputer } from "@/ic/context";
import { Post } from "@/ic/generated/wall/wall";
import { getUserProfile } from "@/store/actions/profile";
import { getWall } from "@/store/actions/wall";

import Spinner from "@/components/Spinner";

export default function Component() {
  const { actors, principal } = useInternetComputer();
  const [profileFinished, profileResult] = getUserProfile.useBeckon({
    actors,
    principal,
  });

  const [post, setPost] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const handlePostChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPost(event.currentTarget.value);
  };

  const resetForm = () => {
    setPost("");
    setSuccess(false);
    setLoading(false);
    setFinished(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finished) return;
    if (post.length === 0) return;
    setLoading(true);
    actors.wall
      .write(post)
      .then(() => {
        actors.wall.get().then((wall: Array<Post>) => {
          getWall.clearCache({ actors });
        });
        setSuccess(true);
      })
      .catch((error: any) => {
        setSuccess(false);
      })
      .finally(() => {
        resetForm();
      });
  };

  if (!profileFinished) return null;
  if (!profileResult?.payload?.name) return null;

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="text"
          className="flex-grow p-4 mr-4 text-xl placeholder-green-400 bg-green-900 border-t-0 border-l-0 border-r-0 border-green-400 sm:mb-0 sm:w-auto disabled:opacity-50 focus:ring-0 focus:border-green-400 px-0.5 focus:text-green-100"
          placeholder="Write on the wall"
          disabled={loading}
          onChange={handlePostChange}
          value={post}
        />
        <button
          className="p-4 px-8 text-xl font-semibold text-green-900 uppercase bg-green-400 rounded-lg hover:bg-yellow-200 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Sending
            </>
          ) : finished ? (
            success ? (
              "👍👍👍"
            ) : (
              <span className="text-red-500">🤖 Error</span>
            )
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
