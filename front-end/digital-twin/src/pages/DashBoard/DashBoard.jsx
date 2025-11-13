import React from "react";
import Charts from "./_components/Charts.jsx";
import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx";
import { Link } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar.js";

function handleLogout() {
  localStorage.removeItem("user");
  window.location.href = "/login";
}

export default function DashBoard() {
  return (
    <SidebarProvider>
      <div className="flex w-full ">
        <AppSidebar />

        <div className="flex flex-col flex-1  transition-all duration-300 ">
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-2">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-800 ">Dashboard</h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
                >
                  Sair
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4">
            <Charts />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
