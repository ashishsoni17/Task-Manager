import {Outlet} from "react-router-dom";
import Sidebar from "../pages/Sidebar.jsx";
import Navbar from "../pages/Navbar.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 h-dvh flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
        
      </div>
    </div>
  )
}

export default Layout