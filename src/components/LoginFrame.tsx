"use client";

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

const handleLinkedInLoginButton = () => {
  console.log("LinkedIn login button clicked");
  window.location.href = "http://localhost:3001/auth/linkedin";
};

function LoginFrame() {
  return (
    <div className="my-6 flex flex-col items-center justify-center gap-y-2">
      <div className={`relative h-[90px] w-[90px]`}>
        <Image
          src="/logo-skillchain.svg"
          fill
          alt="SkillChain"
          className="object-contain"
        />
      </div>

      <h2 className="text-mainBlue mt-4 px-8 text-2xl font-bold lg:text-3xl">
        Welcome to SkillChain!
      </h2>
      <p className="text-dark-text mt-4 w-full px-6 text-center text-sm break-words sm:mt-6 sm:text-base lg:px-20 lg:text-lg">
        Here, you can approve your friends’ skills, showcase your own or find
        the perfect person for your project or company
      </p>
      <button
        onClick={handleLinkedInLoginButton}
        className="bg-mainBlue hover:bg-mainBlueHover mt-6 flex cursor-pointer flex-row items-center gap-x-2 rounded-lg px-3.5 py-1.5 text-white lg:px-4.5 lg:py-2 lg:text-lg"
      >
        <span className="text-lg lg:text-xl">
          <FaLinkedinIn />
        </span>
        Log in with LinkedIn
      </button>
    </div>
  );
}

export default LoginFrame;
