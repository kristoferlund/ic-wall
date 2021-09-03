import { useInternetComputer } from "@/ic/context";
import { getProfileByPrincipal } from "@/store/actions/profile";
import { ReactComponent as UserIcon } from "@/svg/user-solid.svg";
import { Principal } from "@dfinity/principal";

interface Props {
  principal: Principal;
}

export default function UserInfo({ principal }: Props) {
  const { actors } = useInternetComputer();
  const [profileFinished, profileResult] = getProfileByPrincipal.useBeckon({
    actors,
    principal,
  });

  if (profileFinished && profileResult?.payload?.name)
    return (
      <div className="pb-10 text-green-500">
        <UserIcon className="inline-block h-20 pb-3 mr-2" />
        <div className="mb-2 text-xl text-bold">
          {profileResult.payload.name}
        </div>
        <div className="text-sm">ETH: {profileResult.payload.address}</div>
        <div className="text-sm">IC: {principal.toString()}</div>
      </div>
    );

  return null;
}
