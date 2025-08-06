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
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
        <Image
          src={imgUrl || "/person.jpg"}
          fill
          className="object-cover"
          alt={`${firstName} ${lastName}`}
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">
          {firstName} {lastName}
        </h3>
        <p className="text-sm font-medium text-blue-600">
          {job || "No job specified"}
        </p>
        {location && (
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <CiLocationOn className="h-4 w-4" />
            <span>{location.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
