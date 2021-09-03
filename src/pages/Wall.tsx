import Header from "@/components/Header";
import Post from "@/components/wall/post";
import SetUsername from "@/components/wall/SetUsername";
import Spinner from "@/components/wall/Spinner";
import WelcomeToast from "@/components/wall/WelcomeToast";
import WritePost from "@/components/wall/WritePost";
import { isConnected } from "@/eth/connectors";
import { useInternetComputer } from "@/ic/context";
import { getProfileByPrincipal } from "@/store/actions/profile";
import { getWall } from "@/store/actions/wall";
import { GlobalWallState } from "@/store/store";
import { ReactComponent as DfinityIcon } from "@/svg/dfinity.svg";
import { ReactComponent as MetamaskIcon } from "@/svg/metamask.svg";
import { Post as PostInterface } from "@dfx/local/canisters/wall/wall.did";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const PAGESIZE = 25;

export default function Home() {
  const ic = useInternetComputer();
  const { connector } = useWeb3React();
  const location = useLocation();

  const [wall, setWall] = React.useState<Array<PostInterface> | undefined>(
    undefined
  );
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const [stateResetPause, setStateResetPause] = React.useState<boolean>(false);
  const [getWallFinished, wallResult, getWallLoading] = getWall.useBeckon(
    {
      actors: ic.actors,
      filter: { page: pageNumber },
    },
    { dormant: stateResetPause }
  );
  const [noMorePosts, setNoMorePosts] = React.useState<boolean>(false);

  const nextPage = () => {
    if (!stateResetPause && !noMorePosts) {
      setPageNumber((n) => n + 1);
    }
  };
  useBottomScrollListener(nextPage, { debounce: 2000 });

  const [profileFinished, profileResult] = getProfileByPrincipal.useBeckon({
    actors: ic.actors,
    principal: ic.principal,
  });

  const welcomeToastShown = GlobalWallState.useState(
    (s) => s.welcomeToastShown
  );
  React.useEffect(() => {
    if (!welcomeToastShown) {
      toast(<WelcomeToast />, {
        duration: 20000,
      });
      GlobalWallState.update((s) => {
        s.welcomeToastShown = !welcomeToastShown;
      });
    }
  }, [welcomeToastShown]);

  // Reset wall on page switch
  React.useEffect(() => {
    setStateResetPause(true);
    setTimeout(() => {
      setStateResetPause(false);
    }, 1000);
    setPageNumber(1);
    setNoMorePosts(false);
    setWall(undefined);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!wallResult || wallResult.error) return;
    if (wallResult.payload.length < PAGESIZE) setNoMorePosts(true);
    if (pageNumber === 1) {
      setWall(wallResult.payload);
    } else {
      setWall((w) => (w ? w.concat(wallResult.payload) : wallResult.payload));
    }
  }, [getWallFinished, wallResult, pageNumber]);

  return (
    <div className="bg-green-900">
      <Header />
      <main>
        <Toaster position="bottom-right" reverseOrder={true} />{" "}
        <div className="w-full leading-normal text-white">
          <div className="pt-40 pb-20 bg-right-top bg-no-repeat bg-contain sm:pb-32">
            <div className="text-xl wall-container">
              {/* SET USERNAME */}
              {!stateResetPause &&
                ic.principal &&
                profileFinished &&
                !profileResult?.payload?.name && <SetUsername />}

              {/* CONNECT METAMASK */}
              {!stateResetPause &&
                connector &&
                ic.principal &&
                !isConnected(connector) && (
                  <div className="mb-10 text-3xl text-center">
                    Connect
                    <MetamaskIcon className="inline-block w-8 h-8 mx-2" />
                    and login to
                    <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                    to write on the wall!
                  </div>
                )}

              {/* LOGIN TO DFINITY */}
              {!stateResetPause &&
                connector &&
                !ic.principal &&
                isConnected(connector) && (
                  <div className="mb-10 text-3xl text-center">
                    Login to
                    <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                    to write on the wall!
                  </div>
                )}

              {/* WRITE A POST */}
              {!stateResetPause &&
                wall &&
                profileFinished &&
                profileResult?.payload?.name && <WritePost />}

              {/* THE WALL! */}
              {!stateResetPause && wall && (
                <div className="pb-4">
                  {wall.map((postData, i) => (
                    <Post data={postData} key={i} />
                  ))}
                </div>
              )}

              {/* EMPTY WALL MESSAGE */}
              {!stateResetPause && wall && wall.length === 0 && (
                <div className="p-5 mb-4 text-center bg-green-800 rounded-lg">
                  The wall is empty, start filling it!
                </div>
              )}

              {/* LOADER */}
              {(stateResetPause || getWallLoading) && (
                <div className="pt-5 text-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
