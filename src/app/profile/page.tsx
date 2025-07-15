import UserFrameInProfilePage from "../_components/UserFrameInProfilePage";
import WhiteBackgroundFrame from "../_components/WhiteBackgroundFrame";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="mt-[40px] ">
        <WhiteBackgroundFrame>
          <UserFrameInProfilePage />
        </WhiteBackgroundFrame>
      </div>
    </div>
  );
}
