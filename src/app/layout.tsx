
import QueryProvider from "@/components/QueryProvider";
import Header from "../components/Header";
import "./../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "SkillChain",
  },
  description:
    "SkillChain is a collaborative platform where users can verify each other's skills, making it easier for employers to identify trusted and proven talent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-main-background h-screen w-full">
        <QueryProvider>
          <Header />
          <main>{children}</main>
        </QueryProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              zIndex: 1000,
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
            className: "bg-white text-black",
          }}
        />
      </body>
    </html>
  );
}
