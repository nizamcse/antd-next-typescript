import { AntdRegistry } from "@ant-design/nextjs-registry";

import AdminLayout from "@/layouts/admin-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AdminLayout>{children}</AdminLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}

/**
 * TASKS
 * Use reset css to remove default margin, pading etc from browser
 * Create expense calculator functionalicy
 * Create todo list functionality
 */
