import React from "react";
import Charts from "./_components/Charts.jsx";
import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx";
import { SidebarProvider } from "@/components/ui/sidebar.js";

export default function DashBoard() {
  return (
    <SidebarProvider>
      <div className="flex w-full ">
        <AppSidebar />

        <div className="flex flex-col flex-1  p-6 transition-all duration-300 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 p-3 border rounded-lg shadow bg-slate-300 dark:bg-slate-700 dark:text-gray-200">Dashboard</h1>

          <div className="flex-1">
            <Charts />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
