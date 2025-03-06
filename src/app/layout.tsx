import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import ReactQueryProvider from "~/providers/react-query-provider";
import NavBar from "~/components/navbar";

export const metadata: Metadata = {
  title: "Hurtopony Recruitment Task",
  description: "Hurtopony Recruitment Task",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ReactQueryProvider>
          <NavBar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
