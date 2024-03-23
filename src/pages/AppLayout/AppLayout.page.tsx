import { NavbarComponent } from "../../components/NavBar/Navbar.component";
import { Outlet } from "react-router-dom";

export const AppLayoutPage = () => {
  return <div className="h-screen">
    <NavbarComponent />


    <div className="mt-5 w-[1200px] mx-auto">
      <Outlet />
    </div>
  </div>;
};