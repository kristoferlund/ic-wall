import Spinner from "@/components/Spinner";
import { EmptyWallMessage, WallPosts } from "@/components/wall";
import { SetUsernameIfNone } from "@/components/wall/SetUsername";
import WelcomeToast from "@/components/wall/WelcomeToast";
import { WritePostIfUsername } from "@/components/wall/WritePost";
import { isConnected } from "@/eth/connectors";
import { useInternetComputer } from "@/ic/context";
import { WelcomeToastShown } from "@/store/index";
import { ReactComponent as DfinityIcon } from "@/svg/dfinity.svg";
import { ReactComponent as MetamaskIcon } from "@/svg/metamask.svg";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";

const Loading = () => {
  return (
    <div className="pt-5 text-center">
      <Spinner />
    </div>
  );
};

export default function Wall() {
  const ic = useInternetComputer();
  const { connector } = useWeb3React();

  const [loadPause, setLoadPause] = React.useState(true);

  const [welcomeToastShown, setWelcomeToastShown] =
    useRecoilState(WelcomeToastShown);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setLoadPause(false);
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  React.useEffect(() => {
    if (!welcomeToastShown) {
      toast(<WelcomeToast />, {
        duration: 20000,
      });
      setWelcomeToastShown(true);
    }
  }, [welcomeToastShown, setWelcomeToastShown]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />{" "}
      <div className="w-full leading-normal text-white">
        <div className="pt-40 pb-20 bg-right-top bg-no-repeat bg-contain sm:pb-32">
          {!loadPause && (
            <div className="text-xl wall-container">
              {/* SET USERNAME */}
              <SetUsernameIfNone />

              {/* CONNECT METAMASK */}
              {connector && ic.principal && !isConnected(connector) && (
                <div className="mb-10 text-3xl text-center">
                  Connect
                  <MetamaskIcon className="inline-block w-8 h-8 mx-2" />
                  and login to
                  <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                  to write on the wall!
                </div>
              )}

              {/* LOGIN TO DFINITY */}
              {connector && !ic.principal && isConnected(connector) && (
                <div className="mb-10 text-3xl text-center">
                  Login to
                  <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                  to write on the wall!
                </div>
              )}

              {/* WRITE A POST */}
              <WritePostIfUsername />

              {/* THE WALL! */}
              <React.Suspense fallback={<Loading />}>
                <WallPosts />
              </React.Suspense>

              {/* EMPTY WALL MESSAGE */}
              <React.Suspense fallback={null}>
                <EmptyWallMessage />
              </React.Suspense>
            </div>
          )}
          {/* LOADER */}
          {loadPause && <Loading />}
        </div>
      </div>
    </>
  );
}
