import "./globals.css";
import ClientWrapper from '@/context/ClientWrapper';


export const metadata = {
  metadataBase: new URL("https://surrealadventures.co.ke"),

  title: {
    default: "Surreal Adventures",
    template: "%s | Surreal Adventures",
  },

  description:
    "Explore unforgettable adventures, travel experiences, and nature escapes across Kenya and beyond.",

  keywords: [
    "adventure",
    "travel Kenya",
    "safaris",
    "outdoor experiences",
    "rafting",
    "tour company",
  ],

  authors: [{ name: "Surreal Adventures" }],
  creator: "Surreal Adventures",

  openGraph: {
    title: "Surreal Adventures",
    description:
      "Discover unique adventure experiences and travel packages across Kenya.",
    url: "https://surrealadventures.co.ke",
    siteName: "Surreal Adventures",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Surreal Adventures Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

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
