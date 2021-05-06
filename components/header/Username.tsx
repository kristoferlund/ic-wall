import { useInternetComputer } from "@/ic/context";
import { getUserProfile } from "@/store/actions/profile";

import UserIcon from "@/svg/user-solid.svg";

export default function Component() {
  const { actors, principal } = useInternetComputer();

  const [finished, result] = getUserProfile.useBeckon({ actors, principal });

  if (finished && result?.payload?.name)
    return (
      <div className="inline-block px-3 py-2 mr-4 text-base font-semibold text-white uppercase bg-green-700 rounded-lg">
        <UserIcon className="inline-block h-4 pb-1 mr-2" />
        {result.payload.name}
      </div>
    );

  return null;
}
