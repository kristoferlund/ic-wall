import { ProfileByPrincipal } from "@/store/profile";
import { ReactComponent as UserIcon } from "@/svg/user-solid.svg";
import { Principal } from "@dfinity/principal";
import React from "react";
import { useRecoilValue } from "recoil";
import useENSName from "@/hooks/useENSName";
import { shortenAddress } from "@/utils/index";

interface Props {
  principal: Principal;
}

const UserInfoInner = ({ principal }: Props) => {
  const profile = useRecoilValue(ProfileByPrincipal({ principal }));
  const { ENSName } = useENSName(profile?.address ?? undefined);

  if (profile?.name)
    return (
      <div className="pb-10 text-green-500">
        <UserIcon className="inline-block h-20 pb-3 mr-2" />
        <div className="mb-2 text-xl text-bold">{profile.name}</div>
        <div className="text-sm">ETH: {ENSName || shortenAddress(profile.address)}</div>
        <div className="text-sm">IC: {principal.toString()}</div>
      </div>
    );

  return null;
};

export default function UserInfo({ principal }: Props) {
  return (
    <React.Suspense fallback={null}>
      <UserInfoInner principal={principal} />
    </React.Suspense>
  );
}
