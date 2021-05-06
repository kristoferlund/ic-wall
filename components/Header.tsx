import React from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import { injected } from "@/eth/connectors";
import { useEagerConnect, useInactiveListener } from "@/eth/hooks";

import UserName from "@/components/header/Username";
import ICPrincipal from "@/components/header/ICPrincipal";
import EthAccount from "@/components/header/EthAccount";
import ICLogin from "@/components/header/ICLogin";

import BrickwallIcon from "@/svg/brick-wall.svg";
import MetamaskIcon from "@/svg/metamask.svg";

export default function Component() {
  const {
    error: ethError,
    connector: ethConnector,
    activate: ethActivate,
  } = useWeb3React();

  // Attempt to activate pre-existing connection
  const triedEager = useEagerConnect();

  // Marks which ethConnector is being activated
  const [activatingConnector, setActivatingConnector] = React.useState<
    InjectedConnector | undefined
  >(undefined);

  const activating = injected === activatingConnector;
  const connected = injected === ethConnector;
  const connectDisabled = !triedEager || activating || connected || !!ethError;

  // Listen to and react to network events
  useInactiveListener(!triedEager || !!activatingConnector);

  // handle logic to recognize the ethConnector currently being activated
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === ethConnector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, ethConnector]);

  let ethButtonClass =
    "inline-block px-3 py-2 text-base font-semibold uppercase rounded-lg focus:outline-none " +
    (ethError
      ? "bg-red-700 hover:bg-red-700 text-white"
      : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-green-900");

  return (
    <nav>
      <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 text-3xl font-bold text-white">
              <BrickwallIcon className="w-10 h-12 mr-4 text-white" />
              The Wall
            </div>
            <div className="hidden sm:block sm:ml-6 sm:w-full ">
              <div className="flex items-center justify-end h-full">
                <div>
                  <UserName />
                  {triedEager && (!connected || (connected && !!ethError)) && (
                    <button
                      className={ethButtonClass}
                      disabled={connectDisabled || !!ethError || activating}
                      key={"Injected"}
                      onClick={() => {
                        setActivatingConnector(injected);
                        ethActivate(injected, (error) => {
                          if (error.name === "UnsupportedChainIdError")
                            alert("Please connect to Ethereum mainnet");
                          setActivatingConnector(undefined);
                        });
                      }}
                    >
                      {!ethError && activating && <div>Initializing …</div>}
                      {!ethError && !activating && (
                        <div>
                          <MetamaskIcon className="inline-block w-4 h-4 pb-1 mr-2" />
                          Connect to wallet
                        </div>
                      )}
                      {ethError &&
                        ethError.name === "UnsupportedChainIdError" && (
                          <div>Wrong network</div>
                        )}
                      {ethError &&
                        ethError.name !== "UnsupportedChainIdError" && (
                          <div>Unable to connect</div>
                        )}
                    </button>
                  )}
                  <EthAccount />
                  <ICLogin />
                  <ICPrincipal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
