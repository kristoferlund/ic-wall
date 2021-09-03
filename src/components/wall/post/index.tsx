import { Post as PostInterface } from "@dfx/local/canisters/wall/wall.did";
import Linkify from "linkifyjs/react";
import PostMeta from "./PostMeta";

interface Props {
  data: PostInterface;
}

export default function Post({ data }: Props) {
  return (
    <div className="mb-5 text-center">
      <div className="p-5 mb-2 overflow-hidden text-white bg-green-800 rounded-lg">
        <Linkify
          options={{
            className: "underline hover:text-yellow-200",
            target: "_blank",
          }}
        >
          {data.text}
        </Linkify>
      </div>
      <PostMeta data={data} />
    </div>
  );
}
