import useENSName from "@/hooks/useENSName";
import { Post } from "@/ic/canisters_generated/wall/wall.did";
import { ProfileByPrincipal } from "@/store/profile";
import { ReactComponent as UserIcon } from "@/svg/user-solid.svg";
import { shortenAddress } from "@/utils/index";
import { Principal } from "@dfinity/principal";
import { Jazzicon } from "@ukstv/jazzicon-react";
import formatDistance from "date-fns/formatDistance";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface Props {
  data: Post;
}

export const PostMeta = ({ data }: Props) => {
  const PostMetaInner = ({ data }: Props) => {
    const profile = useRecoilValue(
      ProfileByPrincipal({ principal: Principal.fromText(data.user_id) })
    );
    const { ENSName } = useENSName(profile?.address ?? undefined);

    if (profile) {
      const timestamp = parseInt(data.timestamp.toString().substr(0, 13));
      const fromNow = formatDistance(timestamp, Date.now());

      return (
        <div className="text-sm text-green-500">
          <UserIcon className="inline-block h-4 pb-1 mr-1" />
          <Link to={profile.address.toLowerCase()}>{profile.name}</Link>
          <div className="inline-block mr-1">, {fromNow} ago</div>
          <Link to={profile.address.toLowerCase()}>
            <div
              style={{ width: "12px", height: "12px" }}
              className="inline-block ml-3 mr-1"
            >
              <Jazzicon address={profile.address} />
            </div>
            {ENSName || shortenAddress(profile.address)}
          </Link>
        </div>
      );
    }

    return null;
  };

  return (
    <React.Suspense fallback={null}>
      <PostMetaInner data={data} />
    </React.Suspense>
  );
};

export default PostMeta;
