import "./globals.css";
import ClientWrapper from '@/context/ClientWrapper';
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
	  <ClientWrapper>
        	<Navbar />

        	<main className="main">
          		{children}
        	</main>

        	<Footer />
	  </ClientWrapper>
      </body>
    </html>
  );
}
