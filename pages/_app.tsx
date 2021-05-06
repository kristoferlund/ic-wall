import "../styles/globals.css";

import type { AppProps } from "next/app";

import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

import { ICContext, useICContextValues } from "@/ic/context";

import { useInstance } from "@/store/store";
import { PullstateProvider } from "pullstate";

function getLibrary(provider: ExternalProvider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  const pullStateInstance = useInstance(pageProps.snapshot);
  const icContextValues = useICContextValues();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ICContext.Provider value={icContextValues}>
        <PullstateProvider instance={pullStateInstance}>
          <Component {...pageProps} />
        </PullstateProvider>
      </ICContext.Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
