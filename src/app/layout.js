import "./globals.css";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
