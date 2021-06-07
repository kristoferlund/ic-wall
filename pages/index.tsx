import React from "react";
import Head from "next/head";

import { useInternetComputer } from "@/ic/context";

import Header from "@/components/Header";
import Post from "@/components/Post";
import SetUsername from "@/components/SetUsername";
import Wall from "@/components/Wall";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";
import toast, { Toaster } from "react-hot-toast";

import MetamaskIcon from "@/svg/metamask.svg";
import DfinityIcon from "@/svg/dfinity.svg";
import GitHub from "@/svg/github.svg";

export default function Home() {
  const { principal } = useInternetComputer();
  const { connector } = useWeb3React();

  if (typeof window === "undefined") return null;

  //<BrickwallIcon className="inline-block w-6 h-6 mr-1 text-black" />

  React.useEffect(() => {
    toast(
      <div className="">
        <b>The Wall</b> is a crossover Ethereum/Internet Computer demo app. Use
        Metamask to sign in and automatically generate an IC identity.
        <div className="mt-2">
          <GitHub className="inline-block mr-2" />

          <a
            href="https://github.com/kristoferlund/ic-wall"
            className="underline"
            target="_blank"
          >
            kristoferlund/ic-wall
          </a>
        </div>
      </div>,
      {
        duration: 20000,
      }
    );
  }, []);

  return (
    <div className="bg-green-900">
      <Head>
        <title>Write on the wall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <Toaster position="bottom-right" reverseOrder={true} />{" "}
        <div className="w-full leading-normal text-white">
          <div className="pt-40 pb-20 bg-right-top bg-no-repeat bg-contain sm:pb-32">
            <div className="text-xl wall-container">
              {principal && (
                <>
                  <SetUsername />
                  <Post />
                </>
              )}
              {!principal && !isConnected(connector) && (
                <div className="mb-10 text-3xl text-center">
                  Connect
                  <MetamaskIcon className="inline-block w-8 h-8 mx-2" />
                  and login to
                  <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                  to write on the wall!
                </div>
              )}
              {!principal && isConnected(connector) && (
                <div className="mb-10 text-3xl text-center">
                  Login to
                  <DfinityIcon className="inline-block w-8 h-8 mx-2" />
                  to write on the wall!
                </div>
              )}
              <Wall />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
