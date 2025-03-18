import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Check if the current path is Signup or Login
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

    if (isAuthPage) {
        return (
            <div className="h-16 w-full bg-blue-100 flex items-center px-4 justify-between">
                <Link to="/">
                    <img
                        src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                        alt="cdac"
                        className="h-14"
                    />
                </Link>

                <Link to="/" className="text-lg font-[Poppin] text-blue-800 hover:underline">
                    Home
                </Link>
            </div>
        );
    }

    return (
        <div className="h-20 w-full bg-blue-100 flex items-center px-4 relative">
            {/* Logo */}
            <div className="flex-shrink-0">
                <img
                    src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                    alt="cdac"
                    className="h-14"
                />
            </div>

            {/* Hamburger Menu (Appears at lg breakpoint or smaller) */}
            <div className="lg:hidden cursor-pointer ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </div>

            {/* Navigation Links */}
            <div className={`absolute lg:static font-lexend left-0 right-0 top-16 lg:top-0 text-xl  font-l flex flex-col lg:flex-row items-center justify-center mx-auto overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "flex w-full py-2" : "hidden lg:flex"}`}>
                <Link to="/" className={`px-4 py-2 rounded-xl text-blue-800 hover:text-blue-900 transition-all font-semibold duration-300 cursor-pointer ${location.pathname === '/' ? "underline underline-offset-5" : ""}`}>
                    Home
                </Link>
                <Link to="/about" className={`px-4 py-2 rounded-xl text-blue-800 hover:text-blue-900 transition-all duration-300 font-semibold cursor-pointer ${location.pathname === '/about' ? "underline underline-offset-5" : ""}`}>
                    About Us
                </Link>
                <Link to="/eligibility" className={`px-4 py-2 rounded-xl text-blue-800 hover:text-blue-900 transition-all duration-300 font-semibold cursor-pointer ${location.pathname === '/eligibility' ? "underline underline-offset-5" : ""}`}>
                    Who is Eligible
                </Link>
                <Link to="/contact" className={`px-4 py-2 rounded-xl text-blue-800 hover:text-blue-900 transition-all duration-300 font-semibold cursor-pointer ${location.pathname === '/contact' ? "underline underline-offset-5" : ""}`}>
                    Contact Us
                </Link>
                <Link to="/calendar" className={`px-4 py-2 rounded-xl text-blue-800 hover:text-blue-900 transition-all duration-300 font-semibold cursor-pointer ${location.pathname === '/calendar' ? "underline underline-offset-5" : ""}`}>
                    Training Calendar
                </Link>

                {/* Login & Registration (Mobile) */}
                <div className="w-full flex flex-col lg:hidden items-center mt-2">
                    <Link to="/signup" className="px-4 py-2 w-full text-center rounded-xl text-blue-950 transition-all duration-300 cursor-pointer">
                        Registration
                    </Link>
                    <Link to="/login" className="px-4 py-2 font-  w-full text-center rounded-xl text-blue-950 transition-all duration-300 cursor-pointer">
                        Login
                    </Link>
                </div>
            </div>

            {/* Login & Registration (Desktop) */}
            <div className="hidden lg:flex text-blue-800 text-3xl font-semibold font-[poppin] rounded-xl overflow-hidden transition-all duration-300 ease-in-out ml-auto">
                <Link to="/login" className="px-4 py-2 rounded-xl hover:text-blue-900 transition-all duration-300 cursor-pointer">
                    Login
                </Link>
            </div>
        </div>
    );
};
