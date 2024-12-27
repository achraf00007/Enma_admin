import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";

export const metadata: Metadata = {
  title: "Enma - admin dashboard",
  description: "Admin dashboard to manage enma's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
