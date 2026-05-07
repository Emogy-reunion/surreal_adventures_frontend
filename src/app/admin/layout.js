import AdminNavbar from "@/components/navbar/AdminNavbar";
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
