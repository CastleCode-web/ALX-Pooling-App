import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/hooks/useToast";
import { AuthProvider } from "@/lib/context/AuthContext";
import ErrorBoundary from "@/components/layout/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ALX Polly - Create and Participate in Polls",
  description:
    "A modern polling platform for creating engaging polls, gathering insights, and making data-driven decisions.",
  keywords:
    "polls, voting, surveys, community, engagement, feedback, analytics",
  authors: [{ name: "ALX Polly Team" }],
  creator: "ALX Polly",
  publisher: "ALX Polly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ALX Polly - Create and Participate in Polls",
    description:
      "A modern polling platform for creating engaging polls, gathering insights, and making data-driven decisions.",
    siteName: "ALX Polly",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALX Polly - Create and Participate in Polls",
    description:
      "A modern polling platform for creating engaging polls, gathering insights, and making data-driven decisions.",
    creator: "@alxpolly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
