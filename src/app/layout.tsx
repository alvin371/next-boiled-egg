"use client";

import { ThemeProvider } from "@/context/theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.css";
import { Suspense } from "react";
import { Skeleton } from "antd";
import FrontOfficeLayout from "@/components/templates/page-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const metadata = {
    title: "Next Boiled Egg",
    description: "Alvin Dimas Satria Boilerplate for Next.js",
    generator: "Next.js",
    manifest: "/manifest.webmanifest",
    keywords: [],
    authors: [
      {
        name: "Alvin Dimas Satria",
        url: "https://www.linkedin.com/in/alvindimas/"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/*TODO: Add other meta tags as needed */}
        {metadata.manifest && <link rel="manifest" href={metadata.manifest} />}
        {metadata.keywords && (
          <meta name="keywords" content={metadata.keywords.join(", ")} />
        )}
      </head>
      <body>
        <ThemeProvider>
          <AntdRegistry>
            <QueryClientProvider client={queryClient}>
              <FrontOfficeLayout>
                <Suspense fallback={<Skeleton />}>{children}</Suspense>
              </FrontOfficeLayout>
            </QueryClientProvider>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
