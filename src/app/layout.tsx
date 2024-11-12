import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stockup",
  description: "Your stock trading app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <footer className="bg-[#949494] py-4">
          <ul className="flex justify-center flex-col md:flex-row gap-3 md:gap-5 text-center">
            <li className="text-sm">
              <Link className="hover:underline" href="/">
                Privacy Policy
              </Link>
            </li>
            <li className="text-sm">
              <Link className="hover:underline" href="/">
                Terms of Service
              </Link>
            </li>
            <li className="text-sm">
              <Link className="hover:underline" href="/">
                Help
              </Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
