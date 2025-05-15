import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";

export const Layout = () => {
    const location = useLocation();

    // Check if the current route is Signup or Login
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#fde8d1]">
            {!isAuthPage &&  <Navbar /> }

            <main className="flex-grow w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
