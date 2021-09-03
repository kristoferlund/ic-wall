import { Profile } from "@/ic/canisters_generated/profile/profile.did";
import { Post } from "@/ic/canisters_generated/wall/wall.did";
import { useInternetComputer } from "@/ic/context";
import { getProfileByPrincipal } from "@/store/actions/profile";
import { ReactComponent as UserIcon } from "@/svg/user-solid.svg";
import { Principal } from "@dfinity/principal";
import { Jazzicon } from "@ukstv/jazzicon-react";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";

interface Props {
  data: Post;
}

export default function PostMeta({ data }: Props) {
  const { actors } = useInternetComputer();
  const [finished, result] = getProfileByPrincipal.useBeckon({
    actors,
    principal: Principal.fromText(data.user_id),
  });

  if (finished) {
    const profile: Profile | null = result?.payload;

    if (!profile) return null;

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
          {profile.address.substring(0, 6)}...
          {profile.address.substring(profile.address.length - 4)} {" "}
        </Link>
      </div>
    );
  }

  return <div>Loading…</div>;
}
