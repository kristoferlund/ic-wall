import type { Principal } from "@dfinity/principal";

import { createAnonymousActors } from "@/ic/actor";
import { getUserProfile } from "@/store/actions/profile";

import UserIcon from "@/svg/user-solid.svg";
import { Jazzicon } from "@ukstv/jazzicon-react";
import { Profile } from "@/ic/generated/profile/profile";

interface Props {
  principal: Principal;
}

export default function Component({ principal }: Props) {
  const actors = createAnonymousActors();
  const [finished, result] = getUserProfile.useBeckon({ actors, principal });

  if (finished) {
    const profile: Profile | null = result?.payload;

    if (!profile) return null;

    return (
      <div className="text-sm text-green-500">
        <UserIcon className="inline-block h-4 pb-1 mr-1" />
        {profile.name}
        <div
          style={{ width: "12px", height: "12px" }}
          className="inline-block ml-3 mr-1"
        >
          <Jazzicon address={profile.address} />
        </div>
        {profile.address.substring(0, 6)}...
        {profile.address.substring(profile.address.length - 4)} {" "}
      </div>
    );
  }

  return <div>Loading…</div>;
}
