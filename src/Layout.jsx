import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";

export const Layout = () => {
    const location = useLocation();

    // Check if the current route is Signup or Login
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

    return (
        <div className="flex flex-col min-h-screen">
            {/* Show normal Navbar unless on auth pages */}
            {!isAuthPage && <Navbar />}

            {/* Outlet for rendering child routes */}
            <main className="flex-grow p-5">
                <Outlet />
            </main>

            {/* Footer remains the same */}
            <Footer />
        </div>
    );
};
