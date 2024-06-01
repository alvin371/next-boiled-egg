import { ThemeProvider } from "@/context/theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Skeleton } from "antd";
import FrontOfficeLayout from "@/components/templates/page-layout";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#1890ff",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  title: "Draft Alvin Boilerplate",
  description: "Alvin Boilerplate",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  keywords: [],
  authors: [
    {
      name: "Alvin Dimas Satria",
      url: "https://www.linkedin.com/in/alvindimas/"
    }
  ],
  icons: [
    { rel: "favicon", url: "/icons/icon.png" },
    { rel: "apple-touch-icon", url: "/icons/icon.png" },
    { rel: "icon", url: "/icons/icon.png" }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AntdRegistry>
            <FrontOfficeLayout>
              <Suspense fallback={<Skeleton />}>{children}</Suspense>
            </FrontOfficeLayout>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
