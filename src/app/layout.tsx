import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eugene Maposa | Computer Science Graduate & Software Developer",
  description: "Computer Science graduate with an Upper Second Division (2.1) honours degree from the National University of Science and Technology (NUST) and two years of practical experience at the Technovation Centre.",
  keywords: [
    "Eugene Maposa",
    "Computer Science Graduate",
    "NUST Bulawayo",
    "Technovation Centre",
    "Zimscore",
    "Software Developer Zimbabwe",
    "Full-Stack Web Development",
    "Node.js & Express"
  ],
  authors: [{ name: "Eugene Maposa" }],
  openGraph: {
    title: "Eugene Maposa | Computer Science Graduate & Software Developer",
    description: "Portfolio of Eugene Maposa — B.Sc. Honours Computer Science (2.1, 496 credits) from NUST, featuring the ZIMSCORE platform, Technovation Centre experience, and full-stack software projects.",
    url: "https://eugenemaposa.dev",
    siteName: "Eugene Maposa Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugene Maposa | Computer Science Graduate & Software Developer",
    description: "B.Sc. Honours in Computer Science (2.1) from NUST. Software developer with 2 years practical experience at the Technovation Centre.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
