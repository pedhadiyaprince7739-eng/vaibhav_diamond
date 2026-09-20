import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./component/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vaibhav Diamond",
  description: "Precision diamond cutting and polishing atelier based in Rajkot, Gujarat.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
