"use client";

import WalletProvider from "@/app/walletProvider";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletProvider>{children}</WalletProvider>;
}
