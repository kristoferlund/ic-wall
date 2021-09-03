import { useInternetComputer } from "@/ic/context";
import { getProfileByPrincipal } from "@/store/actions/profile";
import { ReactComponent as UserIcon } from "@/svg/user-solid.svg";
import { Link } from "react-router-dom";

export default function Username() {
  const { actors, principal } = useInternetComputer();
  const [profileFinished, profileResult] = getProfileByPrincipal.useBeckon({
    actors,
    principal,
  });

  if (profileFinished && profileResult?.payload?.name)
    return (
      <Link to={profileResult.payload.address}>
        <div className="inline-block px-3 py-2 mr-4 text-base font-semibold text-white uppercase bg-green-700 rounded-lg">
          <UserIcon className="inline-block h-4 pb-1 mr-2" />
          {profileResult.payload.name}
        </div>
      </Link>
    );

  return null;
}
