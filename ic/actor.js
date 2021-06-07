import { Actor, HttpAgent } from "@dfinity/agent";
import * as profile from "@/ic/generated/profile/profile";
import * as wall from "@/ic/generated/wall/wall";

export function createActors(identity) {
  const agent = new HttpAgent({
    host: process.env.NEXT_PUBLIC_IC_HOST,
    identity,
  });
  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey();
  }
  const actors = {
    profile: Actor.createActor(profile.idlFactory, {
      agent,
      canisterId: profile.canisterId,
    }),
    wall: Actor.createActor(wall.idlFactory, {
      agent,
      canisterId: wall.canisterId,
    }),
  };
  return actors;
}

export function createAnonymousActors() {
  const agent = new HttpAgent({
    host: process.env.NEXT_PUBLIC_IC_HOST,
  });
  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey();
  }
  const actors = {
    profile: Actor.createActor(profile.idlFactory, {
      agent,
      canisterId: profile.canisterId,
    }),
    wall: Actor.createActor(wall.idlFactory, {
      agent,
      canisterId: wall.canisterId,
    }),
  };
  return actors;
}

// 🤔 BETA WORKAROUND
// The generated code in .dfx dont' play nicely with Typescript.
// Something with call signatures..
//
// Function used by the ICLogin component to link identity with
// eth address.
export function linkAddress(identity, loginMessageHash, signature) {
  const actors = createActors(identity);
  actors.profile.linkAddress(loginMessageHash, signature);
}
