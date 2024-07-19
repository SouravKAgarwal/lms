"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./@utils/ThemeProvider";
import { Providers } from "./provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlices";
import Loading from "./@components/Loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 text-black dark:text-white dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Layout>{children}</Layout>
              <Toaster position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Layout = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};
