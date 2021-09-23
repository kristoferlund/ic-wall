import { isConnected } from "@/eth/connectors";
import { Jazzicon } from "@ukstv/jazzicon-react";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import useENSName from "@/hooks/useENSName";
import { shortenAddress } from "@/utils/index";

export default function EthAccount() {
  const { connector, account } = useWeb3React();
  const { ENSName } = useENSName(account ?? undefined);

  if (isConnected(connector) && account)
    return (
      <Link to={account.toLowerCase()}>
        <div className="inline-block px-3 py-2 mr-4 text-base font-semibold text-white uppercase bg-green-700 rounded-lg">
          <div
            style={{ width: "15px", height: "15px" }}
            className="inline-block mr-2"
          >
            <Jazzicon address={account} />
          </div>
            {ENSName || shortenAddress(account)}
        </div>
      </Link>
    );

  return null;
}
