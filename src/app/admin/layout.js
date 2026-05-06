import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar /> 
      <main>{children}</main>
      <AdminFooter />
    </>
  );
}
