import "./globals.css";
import ClientWrapper from '@/context/ClientWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
	  <ClientWrapper>
	  	{children}
	  </ClientWrapper>
      </body>
    </html>
  );
}
