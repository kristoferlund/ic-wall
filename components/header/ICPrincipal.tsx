import { useInternetComputer } from "@/ic/context";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";

import DfinityIcon from "@/svg/dfinity.svg";

export default function Component() {
  const { connector, error } = useWeb3React();
  const { principal } = useInternetComputer();

  if (isConnected(connector) && !error && principal)
    return (
      <div className="inline-block px-3 py-2 text-base font-semibold text-white uppercase bg-green-700 rounded-lg">
        <DfinityIcon className="inline-block h-4 pb-1 mr-2" />
        {principal.toString().substring(0, 12)}...{" "}
      </div>
    );

  return null;
}
