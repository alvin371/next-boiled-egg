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
  return (
    <html lang="en">
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
