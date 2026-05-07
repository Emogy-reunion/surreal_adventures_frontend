import AdminNavbar from "@/components/navbar/AdminNavBar";
import AdminFooter from "@/components/footer/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar /> 
      <main>{children}</main>
      <AdminFooter />
    </>
  );
}
