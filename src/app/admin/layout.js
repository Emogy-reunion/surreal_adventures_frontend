import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminNavbar from "@/components/navbar/AdminNavBar";
import AdminFooter from "@/components/footer/AdminFooter";

// Force Next.js to run this check on every single request dynamically
export const dynamic = 'force-dynamic';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export default async function AdminLayout({ children }) {
  let hasAccess = false;

  try {
    const cookieStore = await cookies();
    
    // Notice we drop the extra '/v1' path step because your Flask blueprint maps to '/is_logged_in'
    const response = await fetch(`${BACKEND_URL}/api/v1/is_logged_in`, {
      method: 'GET',
      headers: { 
        cookie: cookieStore.toString() 
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      
      // Both admin and superadmin pass the security gate
      if (data?.role === 'admin' || data?.role === 'superadmin') {
        hasAccess = true;
      }
    }
  } catch (error) {
    console.error("Admin layout verification error:", error);
  }

  // SECURITY TRIGGER: Kick out anyone who isn't an admin or superadmin
  if (!hasAccess) {
    redirect('/guest/login');
  }

  // Render the dashboard components safely for authenticated managers
  return (
    <>
      <AdminNavbar /> 
      <main>{children}</main>
      <AdminFooter />
    </>
  );
}
