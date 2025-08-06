import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

type Props = {
  firstName: string;
  lastName: string;
  job?: string;
  location?: { name: string };
  imgUrl?: string;
};

export default function UserDisplayInfo({
  firstName,
  lastName,
  job,
  location,
  imgUrl,
}: Props) {
  return (
    <div className="flex gap-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full md:h-24 md:w-24">
        <Image
          src={imgUrl || "/person.jpg"}
          fill
          className="object-cover"
          alt={`${firstName} ${lastName}`}
        />
      </div>

      <div className="mb-4 flex flex-col justify-center">
        <h2 className="text-dark-text text-xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-mainBlue text-sm font-medium">
          {job || "No job specified"}
        </p>
        {location && (
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
            <CiLocationOn className="text-dark-text text-sm md:text-base lg:text-lg" />
            {location.name}
          </div>
        )}
      </div>
    </div>
  );
}
