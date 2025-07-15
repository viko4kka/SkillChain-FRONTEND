import Header from "../components/Header";
import "./_styles/globals.css";

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
      <body className=" bg-main-background  h-screen w-full overflow-hidden">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
