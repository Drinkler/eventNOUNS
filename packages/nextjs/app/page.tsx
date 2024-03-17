"use client";

import React, { useEffect, useState } from "react";
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

    const signer = new ethers.Wallet(privateKeyInput, provider);

    const contractFactory = new ethers.ContractFactory(SampleERC20Token.abi, SampleERC20Token.bytecode, signer);
    const contract = await contractFactory.deploy(tokenName, tokenSymbol);

    console.log("Waiting for Deployment");

    await contract.waitForDeployment();

    console.log("Contract deployed to:", contract.getAddress());
  };

  const [baseURI, setBaseURI] = useState("");

  const deployNFT = async () => {
    const rpcUrl = "https://spicy-rpc.chiliz.com/";
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKeyInput, provider);

    const contractFactory = new ethers.ContractFactory(NFTContract.abi, NFTContract.bytecode, signer);

    const contract = await contractFactory.deploy(tokenName, tokenSymbol, baseURI);

    console.log("Deploying NFT Contract...");

    await contract.waitForDeployment();

    console.log("NFT Contract deployed to:", contract.getAddress());
  };

  const handleVenueClick = (venueId: number) => {
    console.log(`Venue ${venueId} clicked`);
  };

  const [userNFTs, setUserNFTs] = useState<number[]>([]);

  const userAddress = "0x80601B0519620a0bC5dd65307e40c2a562aC6338";

  useEffect(() => {
    fetchUserNFTs();
  }, [userAddress]);

  const fetchUserNFTs = async () => {
    if (!userAddress) return;

    const rpcUrl = "https://spicy-rpc.chiliz.com/";
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const nftContract = new ethers.Contract("0xF4E1bdC9e6542dE0d80C019c9Fa0F091Ec86aa75", NFTContract.abi, provider);

    try {
      const tokenIds = await nftContract.walletOfOwner(userAddress);
      console.log(typeof tokenIds[0]);
      const tokenIdsNumberArray = tokenIds.map((tokenId: any) => Number(tokenId));
      console.log(tokenIdsNumberArray[0]);
      console.log(typeof tokenIdsNumberArray[0]);

      const bytesret = await nftContract.tokenURI(tokenIds[0]);
      console.log(bytesret);

      setUserNFTs(tokenIdsNumberArray);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    }
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
        <h3 className="text-center text-2xl font-bold mb-8">Your NOUNS Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {userNFTs.map(id => (
            <VenueCard
              key={id}
              imageUrl={`https://noun-api.com/beta/pfp?head=${id}&glasses=0&background=1&body=1&accessory=2`}
              name={`Event ${id}`}
              description="This is an awesome event."
              onClick={() => handleVenueClick(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
