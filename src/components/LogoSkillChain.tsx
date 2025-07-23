import Image from "next/image";

export default function LogoSkillChain() {
  return (
    <div className={`relative h-[55px] w-[55px]`}>
      <Image
        src="/logo-skillchain.svg"
        fill
        alt="SkillChain"
        className="object-contain"
      />
    </div>
  );
}
