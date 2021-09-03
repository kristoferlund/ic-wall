import { ReactComponent as GitHub } from "@/svg/github.svg";

export default function Toast() {
  return (
    <div className="">
      <b>The Wall</b> is a crossover Ethereum/Internet Computer demo app. Use
      Metamask to login to Internet Computer. Then, write on the wall!
      <div className="mt-2">
        <GitHub className="inline-block mr-2" />

        <a
          href="https://github.com/kristoferlund/ic-wall"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          kristoferlund/ic-wall
        </a>
      </div>
    </div>
  );
}
