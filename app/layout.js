import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoticeModal from './components/NoticeModal';

export const metadata = {
  title: "AURA — Modern Haute Couture & Fashion",
  description: "Curated luxury fashion, streetwear, and minimalist apparel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col justify-between"
        suppressHydrationWarning>
          <NoticeModal />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}