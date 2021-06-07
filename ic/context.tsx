import React, { useState, createContext, useContext, useCallback } from "react";

import { useWeb3React } from "@web3-react/core";

import { Ed25519KeyIdentity } from "@dfinity/identity";
import type { Principal } from "@dfinity/principal";

import { createActors } from "./actor";
import { loadSavedIdentity } from "./identity";

export interface IC {
  identity: Ed25519KeyIdentity | undefined;
  actors: any | undefined;
  principal: Principal | undefined;
  loadIdentity: (account: string) => void;
  setIdentity: (Identity: Ed25519KeyIdentity) => void;
  clearActiveIdentity: () => void;
}

export const ICContextDefaults: IC = {
  identity: undefined,
  actors: undefined,
  principal: undefined,
  loadIdentity: () => null,
  setIdentity: () => null,
  clearActiveIdentity: () => null,
};

export const ICContext = createContext<IC>(ICContextDefaults);

export function useICContextValues(): IC {
  const [identity, _setIdentity] =
    useState<Ed25519KeyIdentity | undefined>(undefined);
  const [actors, _setActors] = useState<any | undefined>(undefined);
  const [principal, _setPrincipal] = useState<Principal | undefined>(undefined);

  React.useEffect(() => {
    if (!identity) return;
    _setActors(createActors(identity));
  }, [identity]);

  React.useEffect(() => {
    if (!actors) return;
    actors.profile.getOwnPrincipalId().then((principal: Principal) => {
      _setPrincipal(principal);
    });
  }, [actors]);

  const loadIdentity = useCallback(
    (account: string) => {
      const identity = loadSavedIdentity(account);
      if (!identity) {
        clearActiveIdentity();
        return;
      }
      setIdentity(identity);
    },
    [_setIdentity]
  );

  const setIdentity = useCallback(
    (identity: Ed25519KeyIdentity) => {
      _setIdentity(identity);
    },
    [_setIdentity]
  );

  const clearActiveIdentity = useCallback(() => {
    _setIdentity(undefined);
    _setActors(undefined);
    _setPrincipal(undefined);
  }, [_setIdentity, _setActors, _setPrincipal]);

  return {
    identity,
    actors,
    principal,
    loadIdentity,
    setIdentity,
    clearActiveIdentity,
  };
}

export function useInternetComputer() {
  const { account } = useWeb3React();
  const icContext = useContext(ICContext);

  React.useEffect(() => {
    if (!account) {
      icContext.clearActiveIdentity();
      return;
    }
    icContext.loadIdentity(account);
  }, [account]);

  return icContext;
}
