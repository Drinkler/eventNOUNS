"use client";

import React, { useState } from "react";
import SampleERC20Token from "../../hardhat/artifacts/contracts/token.sol/SampleERC20Token.json";
import { ethers } from "ethers";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const deployToken = async () => {
    const rpcUrl = "https://spicy-rpc.chiliz.com/";
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const privateKey = "0x6003dbf575e0796ea69d6f1ad95c9715a8bdac13d3a8199401c183b2458741b1";
    const signer = new ethers.Wallet(privateKey, provider);

    const contractFactory = new ethers.ContractFactory(SampleERC20Token.abi, SampleERC20Token.bytecode, signer);
    const contract = await contractFactory.deploy(tokenName, tokenSymbol);

    console.log("Waiting for Deployment");

    await contract.waitForDeployment();

    console.log("Contract deployed to:", contract.getAddress());
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">EventNOUNS DAO</span>
          </h1>
          <p className="text-center text-lg">
            Jumpstart your journey with EventNOUNS by customizing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/pages/index.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Craft your DAO's governance and events smart contracts in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts/EventNouns.sol
            </code>
          </p>
        </div>
      </div>

      <div className="bg-base-300 w-full mt-16 px-8 py-12 flex flex-wrap justify-center gap-8">
        <div className="flex flex-col bg-base-100 px-6 py-6 text-center items-center max-w-xs rounded-3xl">
          <img
            src="https://noun-api.com/beta/pfp"
            alt="Description of First Image"
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
          <p>Description or caption for the first image</p>
        </div>
        <div className="flex flex-col bg-base-100 px-6 py-6 text-center items-center max-w-xs rounded-3xl">
          <img
            src="https://noun-api.com/beta/pfp"
            alt="Description of Second Image"
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
          <p>Description or caption for the second image</p>
        </div>
        <div className="flex flex-col bg-base-100 px-6 py-6 text-center items-center max-w-xs rounded-3xl">
          <img
            src="https://noun-api.com/beta/pfp"
            alt="Description of Third Image"
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
          <p>Description or caption for the third image</p>
        </div>
        <div className="flex flex-col bg-base-100 px-6 py-6 text-center items-center max-w-xs rounded-3xl">
          <img
            src="https://noun-api.com/beta/pfp"
            alt="Description of Fourth Image"
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
          <p>Description or caption for the fourth image</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <input
          className="mr-2 border-2"
          placeholder="Token Name"
          value={tokenName}
          onChange={e => setTokenName(e.target.value)}
        />
        <input
          className="mr-2 border-2"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={e => setTokenSymbol(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={deployToken}>
          Create Token
        </button>
      </div>
    </>
  );
};

export default Home;
