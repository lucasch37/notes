import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Intellinote",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <body className={inter.className}>
                <link rel="icon" href="/favicon.ico?url" sizes="any" />
                <div className="antialiased min-h-screen dark:bg-grid-white/[0.04] bg-grid-black/[0.02]">
                    <Providers>
                        <Navbar />
                        {children}
                        <Toaster />
                    </Providers>
                </div>
            </body>
        </html>
    );
}
