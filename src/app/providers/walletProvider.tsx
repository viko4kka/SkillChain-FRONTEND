"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/wagmiConfig";
import { useDisconnect } from "wagmi";
import useMe from "@/hooks/useMe";
import { useEffect } from "react";

const queryClient = new QueryClient();

function WalletAutoDisconnect() {
  const { disconnect } = useDisconnect();
  const { me, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && !me) {
      disconnect();
    }
  }, [me, isLoading, disconnect]);

  return null;
}

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({
            borderRadius: "medium",
            overlayBlur: "small",
            fontStack: "system",
          })}
        >
          <WalletAutoDisconnect />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
