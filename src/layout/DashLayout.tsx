import { Outlet } from "react-router-dom";
import SideBarAdmin from "../components/SideBarAdmin/SideBarAdmin";
import HeaderDash from "../components/ui/HeaderDash/HeaderDash";

export default function DashLayout() {
  return (
    <section className="flex w-full min-h-screen">
      <SideBarAdmin />
      <main className="h-full flex-1">
        <div>
          <HeaderDash />
          <div className="py-8 px-6">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  )
}