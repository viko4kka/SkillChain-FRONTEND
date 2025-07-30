"use client";

import WalletProvider from "@/app/walletProvider";
import { AuthGuard } from "@/guards/AuthGuard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <WalletProvider>{children}</WalletProvider>;
    </AuthGuard>
  );
}
