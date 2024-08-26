import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Managament",
  description: "Social Book Platform",
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
          <SignedOut>

            <SignInButton/>

          </SignedOut>

          <SignedIn>
            <UserButton/>
          </SignedIn>
           {children}
        </body>
      </html>

    </ClerkProvider>
  
  );
}
