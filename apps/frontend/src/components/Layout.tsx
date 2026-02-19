import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen flex-col bg-neutral-background-3-rest">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col pb-2 pr-2">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-neutral-stroke-2-rest bg-neutral-background-1-rest">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
