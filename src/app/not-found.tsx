import Button from "@/components/Button";
import WhiteBackgroundFrame from "@/components/WhiteBackgroundFrame";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mt-22 flex h-screen items-start justify-center">
      <WhiteBackgroundFrame>
        <div className="my-12 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-mainBlue text-4xl font-bold md:text-6xl">404</p>
          <p className="text-mainBlue text-3xl font-bold md:text-4xl">
            Page not found
          </p>
          <p className="text-dark-text mx-4 my-4 md:text-lg">
            Looks like you&apos;ve taken a wrong turn. The page you&apos;re
            looking for doesn&apos;t exist.
          </p>

          <Link href="/search">
            <Button size="md">Back to Home</Button>
          </Link>
        </div>
      </WhiteBackgroundFrame>
    </div>
  );
}
