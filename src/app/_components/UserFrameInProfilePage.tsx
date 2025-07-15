import { LiaGithub } from "react-icons/lia";
import Button from "./Button";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

export default function UserFrameInProfilePage() {
  return (
    <div className="flex flex-col">
      <div className="bg-pink-400">
        <div className=" relative rounded-full w-[70px] h-[70px]  ">
          <Image
            src="/person.jpg"
            fill
            className="object-cover overflow-hidden rounded-full border-2 border-main-background"
            alt="Profile Picture"
          />
        </div>
        <div className="bg-green-300">
          <h4>Anna Kowalska</h4>
          <h5>Senior Developer</h5>
          <h6>
            <span>
              <CiLocationOn />
            </span>{" "}
            Rzeszów, Polska
          </h6>
        </div>
        <div className="bg-purple-400">
          <Button variant="lightButtonMobile">Connect with MetaMask</Button>
          <div>
            <span>
              <GoPencil />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-yellow-500">
        <Button variant="lightButtonMobile">
          <span className="text-lg">
            <LiaGithub />
          </span>
          GitHub
        </Button>
        <Button variant="lightButtonMobile">
          <span className="text-lg">
            <FaLinkedinIn />
          </span>
          LinkedIn
        </Button>
      </div>
    </div>
  );
}
