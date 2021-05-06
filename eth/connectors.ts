import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector/dist";

export const injected = new InjectedConnector({
  supportedChainIds: [1], // Mainnet only
});

export function isConnected(connector: AbstractConnector | undefined): boolean {
  return injected === connector;
}
