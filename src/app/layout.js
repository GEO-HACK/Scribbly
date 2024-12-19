import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
        <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="wrapper py-2">
              <Navbar/>
              {children}
              <Footer/>
            </div>
          </div>
        </div>
          
        </ThemeProvider>
        
      </body>
    </html>
  );
}
