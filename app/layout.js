import localFont from "next/font/local";
import "./globals.css";
import NetflixNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Rowdies } from "next/font/google";
const londrinaOutline = Rowdies({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Moviflix",
  description: "Netflix Clone ",
};

export default function RootLayout({ children }) {
  // Use the imported fonts in your CSS
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${londrinaOutline.className}`}
        >
          <NetflixNavbar />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
