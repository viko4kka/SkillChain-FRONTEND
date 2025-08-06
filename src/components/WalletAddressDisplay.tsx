import toast from "react-hot-toast";

interface WalletAddressDisplayProps {
  walletAddress: string;
}

export function WalletAddressDisplay({
  walletAddress,
}: WalletAddressDisplayProps) {
  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      toast.dismiss("copy-toast");
      toast.success("Copied!", { id: "copy-toast" });
    }
  };

  return (
    <span
      className="inline-block max-w-full cursor-pointer rounded-lg border border-[#2563EB] bg-[#2563EB]/10 px-4 py-2 font-mono text-sm break-all text-[#2563EB] shadow transition duration-200 select-none hover:bg-[#2563EB] hover:text-white hover:shadow-lg sm:text-base md:px-5 md:py-2 md:text-lg"
      onClick={handleCopy}
    >
      {walletAddress.slice(0, 5)}...{walletAddress.slice(-3)}
    </span>
  );
}
