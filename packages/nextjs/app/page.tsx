"use client";

import React, { useState } from "react";
import NFTContract from "../../hardhat/artifacts/contracts/nft.sol/NFT.json";
import SampleERC20Token from "../../hardhat/artifacts/contracts/token.sol/SampleERC20Token.json";
import VenueCard from "./../components/VenueCard.js";
import { ethers } from "ethers";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [privateKeyInput, setPrivateKeyInput] = useState("");

  const deployToken = async () => {
    const rpcUrl = "https://spicy-rpc.chiliz.com/";
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // Warning: Storing the private key in client-side code is insecure and should be avoided.
    const signer = new ethers.Wallet(privateKeyInput, provider);

    const contractFactory = new ethers.ContractFactory(SampleERC20Token.abi, SampleERC20Token.bytecode, signer);
    const contract = await contractFactory.deploy(tokenName, tokenSymbol);

    console.log("Waiting for Deployment");

    await contract.waitForDeployment();

    console.log("Contract deployed to:", contract.getAddress());
  };

  const [baseURI, setBaseURI] = useState("");

  const deployNFT = async () => {
    const rpcUrl = "https://spicy-rpc.chiliz.com/"; // Use the appropriate RPC URL
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKeyInput, provider);

    const contractFactory = new ethers.ContractFactory(NFTContract.abi, NFTContract.bytecode, signer);
    // Assuming the constructor of your NFT contract requires a baseURI
    const contract = await contractFactory.deploy(tokenName, tokenSymbol, baseURI);

    console.log("Deploying NFT Contract...");

    await contract.waitForDeployment();

    console.log("NFT Contract deployed to:", contract.getAddress());
  };

  const venues = [
    { id: 1, imageUrl: "https://noun-api.com/beta/pfp", name: "Venue 1", description: "This is an awesome venue 1." },
    { id: 2, imageUrl: "https://noun-api.com/beta/pfp", name: "Venue 2", description: "This is an awesome venue 2." },
    { id: 3, imageUrl: "https://noun-api.com/beta/pfp", name: "Venue 3", description: "This is an awesome venue 3." },
  ];

  // Function to handle click on a venue card
  const handleVenueClick = (venueId: number) => {
    console.log(`Venue ${venueId} clicked`);
    // Implement navigation or any other logic upon clicking a venue card
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 px-5">
        <h1 className="text-3xl font-bold">EventNOUNS</h1>
      </div>
      <div className="text-center mt-10">
        <input
          className="mr-2 border-2"
          placeholder="Private key"
          value={privateKeyInput}
          onChange={e => setPrivateKeyInput(e.target.value)}
        />
        <h2 className="text-2xl font-bold mb-8">Create a Venue</h2>
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

      <div className="text-center mt-10">
        <input
          className="mr-2 border-2"
          placeholder="Base URI"
          value={baseURI}
          onChange={e => setBaseURI(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={deployNFT}>
          Deploy NFT
        </button>
      </div>

      <div className="mt-16 px-8 py-12 bg-base-300">
        <h3 className="text-center text-2xl font-bold mb-8">Venues Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {venues.map(({ id, imageUrl, name, description }) => (
            <VenueCard
              key={id}
              imageUrl={imageUrl}
              name={name}
              description={description}
              onClick={() => handleVenueClick(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
