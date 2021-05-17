![wallbanner](https://user-images.githubusercontent.com/9698363/117360892-995b1c80-aeb9-11eb-99c0-70a8b15dd305.png)
The Internet Computer by Dfinity Foundation promises to create "_a limitless environment for smart contracts that run at web speed, serve web, scale, and reduce compute costs by a million times or more_".

Ethereum apps that wants to deliver above and beyond of what is possible on chain often resorts to using regular centralised server solutions. Could off chain functionality instead run on the IC to create a mixed breed of Ethereum/IC apps - truly distributed, serverless and unstoppable?

The purpose with **The Wall** is to try out and showcase a few concepts with regards to building these crossover Ethereum/IC apps. A proof of concept, a demo and possibly a template to use as a starting point for more advanced apps.

### Key concepts

1. **Authentication**: Can public key cryptography already used by Ethereum be used to login to the IC?
2. **Link eth adresses to IC identities**: If owners of eth adresses can easily prove ownership and link that verification with IC identities, that would open up many interesting app possibilites - voting, membership and other various DAO use cases.

<img width="1055" src="https://user-images.githubusercontent.com/9698363/117355621-1fc03000-aeb3-11eb-9156-1c5e3ac96047.png">

### The Wall

The functionality of the app is super simple. Connect Metamask wallet, sign a login message, select a username. Then you can post messages to the wall.

Login details:

1. User signs a login message using Metamask. The login includes a hashed secret that for the purpose of this demo is set by the app. To add an extra layer of security this secret (password) coud instead be chosen by the user.
2. App generates the `Ed25519KeyIdentity` needed to authenticate with IC based on the signature hash.
3. Message hash and signature is sent to IC where the eth address used to sign the message is recovered and linked to the IC identity.

That's it! Now, the app can interact securely with IC, and IC has verified knowledge of which eth address the user controls.

## Run locally

### 1. Prerequisites

Make sure you have the following installed:

```bash
node
npm
git

```

### 2. Install DFINITY Canister SDK

Download and install the DFINITY Canister SDK package by running the following command:

```bash
DFX_VERSION=0.7.0-beta.8 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

### 3. Install Rust / Cargo

The app backend is written in Rust. The commands below install Rust, the package manager Cargo, etc.

```bash
curl https://sh.rustup.rs -sSf | sh
rustup update
rustup target add wasm32-unknown-unknown
sudo apt-get -y install cmake
cargo install ic-cdk-optimizer --root target
export PATH="./target/bin:$PATH"
```

### 4. Clone this repo, install dependencies

```bash
git clone https://github.com/kristoferlund/ic-wall.git
npm install
```

### 5. Run!

#### Terminal 1

Start Internet Computer

```bash
dfx start
```

#### Terminal 2

**Alt 1.** Development mode with hot reload

-   Deploy backend canisters
-   Run next.js frontend in dev mode

```bash
dfx deploy wall
dfx deploy profile
npm run dev
```

Access on [http://localhost:3000](http://localhost:3000)

**Alt 2.** Production mode

-   Export static production version of next.js frontend
-   Deploy all canisters

```bash
dfx deploy wall
dfx deploy profile
npm run export
dfx deploy ui
```

Access on [http://localhost:8000](http://localhost:8000)

In case you receive "Could not find Canister ID from Request":

-   Get UI canister ID

```bash
dfx canister id ui
```

Access on http://localhost:8000/?canisterId={id received in previous step}

### Author

Kristofer Lund, kristofer@fmckl.se

Telegram: @kristoferkristofer

### Contributing

Yes, please! Raise an issue or post a pull request.

### TODO

[ ] Error handling all over!

[ ] Refactor canisters - better structure, naming etc.

### License

MIT
