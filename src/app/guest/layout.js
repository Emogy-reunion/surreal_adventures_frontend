import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
