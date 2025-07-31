import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WALLET_ENDPOINT } from "../enviroments/config";

interface SaveWalletArgs {
  walletAddress: string;
  signature: string;
}

export function useSaveWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ walletAddress, signature }: SaveWalletArgs) => {
      const res = await fetch(WALLET_ENDPOINT, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save wallet address");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
