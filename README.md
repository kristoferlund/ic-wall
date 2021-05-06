# The Wall

The purpose with this app is to try out and showcase a few concepts with regards to building crossover Ethereum/Dfinity (Internet Computer / IC) apps.

The app lets the user login to the IC by signing a message using Metamask. The goal was to make this process as straightforward (and secure) as possible.

1. User signs login message using Metamask
2. App generates a `Ed25519KeyIdentity` based on the signature hash
3. Message hash and signature is sent to IC where the address used to sign the message is recovered and linked to the IC identity.

to generate a key and login to the Dfinity Internet Computer. Link eth address to IC account.

## Install dfinity

```bash
DFX_VERSION=0.7.0-beta.6 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

git clone https://github.com/kristoferlund/ic-wall.git
yarn

dfx start
dfx deploy

## Install Rust and the `wasm32-unknown-unknown`target

https://doc.rust-lang.org/cargo/getting-started/installation.html

```bash
curl https://sh.rustup.rs -sSf | sh
rustup update
rustup target add wasm32-unknown-unknown
sudo apt-get -y install cmake
cargo install ic-cdk-optimizer --root target
export PATH="./target/bin:$PATH"
dfx deploy
```

```bash
nvm use v15.1.0
npm run export
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
