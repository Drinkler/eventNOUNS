# eventNOUNS

## Introduction
eventNOUNS is a transformative platform designed to bridge the gap between event venues and their patrons through a novel rewards mechanism using tokens. Developed at ETHGlobal London, eventNOUNS introduces a Web3 framework enabling event spaces to recognize and reward their loyal customers.

## Features
- Wallet Integration: Instant access to a wallet for issuing 'Fan Tokens' post-onboarding.
- Token Issuance: Automatic creation of an Ethereum wallet for NFT-based tickets and engagement reward tokens issuance.
- Happenings: Ability to create events or experiences, represented by NFTs granting access and allocations of 'Fan Tokens' and rewards tokens.
- Fan Tokens: Venue-specific tokens redeemable for special access and experiences.
- Engagement Tokens: Usable across any event space within the eventNOUNS platform for enhanced experiences.
- DAO Creation: Facilitates venues in creating their own DAOs for community governance.
- NFT Tickets: Ticketing solution through NFTs for events and experiences.

## How It's Made
### Technologies Used
- Dynamics: Simplifies the venue onboarding process with its multi-wallet multichain feature, enabling automatic wallet creation.
Scaffold-eth: Serves as the foundation for the frontend, incorporating Next.js, Ether.js, and Hardhat for a robust Web3 application.
OpenZeppelin Libraries: For secure and standard-compliant smart contract functionalities, particularly ERC721Enumerable and Ownable contracts.
- Ethers.js: Facilitates smart contract interactions, including deployment and management of ERC20 and ERC721 contracts.

### Workflow
- Venue Onboarding: Upon signing up, venues receive a wallet for issuing 'Fan Tokens' and an Ethereum wallet for NFTs and engagement tokens.
- Happening Creation: Venues can create tickets (NFTs) for events/experiences, which are minted on the chiliz blockchain.
- Fan Engagement: Fans with an ApeCoin NFT can access and purchase 'Happenings', receiving 'Fan Tokens' and rewards tokens.
DAO Integration: Enables venues to manage community proposals and voting through their DAOs, enhancing engagement and governance.
Implementation
- NFT and Token Deployment: Utilizes Ethers.js for deploying ERC20 tokens and ERC721 NFTs, enabling venues to mint and manage their digital assets.
- User Interface: A user-friendly frontend allows fans to browse and purchase 'Happenings', interact with venues, and participate in DAOs.
- Security and Compliance: By leveraging OpenZeppelin contracts, eventNOUNS ensures the safety and standard adherence of its token and NFT functionalities.


## Planned Improvements
- DAO Management: Enhancements to allow venues to create, manage, and interact with their DAOs directly from the platform.
- Fan Engagement: Integration of NFTs, Fan Tokens, and ApeCoins to influence DAO participation, proposal creation, and voting mechanisms.

## Scaffold-ETH

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
