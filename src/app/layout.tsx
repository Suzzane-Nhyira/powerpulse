import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import CompleteProfile from "@/components/CompleteProfile";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerPulse",
  description: "Crowd-sourced electricity outage tracking for Ghana",
  openGraph: {
    title: "PowerPulse",
    description: "Crowd-sourced electricity outage tracking for Ghana",
    type: "website",
  },
};
export const viewport: Viewport = {
  themeColor: "#160F08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ink text-paper font-body antialiased">
        <AuthProvider>
          {children}
          <CompleteProfile />
        </AuthProvider>
      </body>
    </html>
  );
}