import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const blast = {
  id: 168587773,
  network: "Blast Sepolia",
  name: "Blast",
  nativeCurrency: { name: "Blast Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.blast.io"],
    },
    public: {
      http: ["https://sepolia.blast.io"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io",
    },
    default: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io",
    },
  },
  testnet: true,
} as any;

export function MyWeb3Provider({ children }: any) {
  const { chains, provider } = configureChains(
    [blast],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `https://sepolia.blast.io/`,
        }),
      }),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiConfig = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
