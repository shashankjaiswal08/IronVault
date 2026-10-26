import { Poppins, BioRhyme } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const bioRhyme = BioRhyme({
  variable: "--font-bio-rhyme",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "IRONVAULT — Make Yourself Hard As Iron",
  description:
    "Premium strength and fitness experience built around discipline, coaching, and performance.",
  openGraph: {
    title: "IRONVAULT — Make Yourself Hard As Iron",
    description:
      "Build strength. Build discipline. Make Yourself Hard As Iron.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bioRhyme.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
