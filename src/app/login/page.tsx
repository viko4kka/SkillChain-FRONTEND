import LoginFrame from "@/components/LoginFrame";
import WhiteBackgroundFrame from "@/components/WhiteBackgroundFrame";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="mt-[40px] px-4">
        <WhiteBackgroundFrame>
          <LoginFrame />
        </WhiteBackgroundFrame>
      </div>
    </div>
  );
}
