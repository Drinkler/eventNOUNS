"use client";

import { useEffect } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { Toaster } from "react-hot-toast";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import scaffoldConfig from "~~/scaffold.config";
import { useGlobalState } from "~~/services/store/store";

// Setting up list of evmNetworks
const evmNetworks = [
  {
    blockExplorerUrls: ["http://spicy-explorer.chiliz.com/"],
    chainId: 88882,
    chainName: "Chiliz Spicy Testnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: "Chiliz",
    nativeCurrency: {
      decimals: 18,
      name: "Chiliz",
      symbol: "CHZ",
    },
    networkId: 88882,
    rpcUrls: ["https://spicy-rpc.chiliz.com"],
    vanityName: "Chiliz",
  },
  {
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainId: 137,
    chainName: "Matic Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: "Polygon",
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    networkId: 137,
    rpcUrls: ["https://polygon-rpc.com"],
    vanityName: "Polygon",
  },
];

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: scaffoldConfig.dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors],
        evmNetworks,
      }}
      theme={isDarkMode ? "dark" : "light"}
    >
      <ProgressBar />
      <DynamicWagmiConnector>
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};
