"use client";

import WalletProvider from "@/app/providers/walletProvider";
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
