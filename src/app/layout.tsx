
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Chatprovider} from '@/context/contextapi'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projectyle.chat",
  description: "A real time chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
   

       <div>
        {children}
        </div>
          
    
    
        
        </body>
    </html>
  );
}
