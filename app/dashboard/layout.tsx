"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { NavigationProvider } from "@/lib/context/navigation";
import LoginPage from "@/components/LoginPage";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          {/* <LoginPage /> */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}
