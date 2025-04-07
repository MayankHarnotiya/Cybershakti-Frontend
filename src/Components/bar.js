import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling
import { Link, useLocation } from "react-router-dom"; // Regular routing

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Check if user is on the homepage
    const isHomePage = location.pathname === "/";

    // Check if user is on Login or Signup (Auth Pages)
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

    // Close menu when navigating to a new page
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    if (isAuthPage) {
        return (
            <div className="h-16 w-full bg-purple-950 flex items-center px-4 justify-between">
                <Link to="/">
                    <img
                        src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                        alt="cdac"
                        className="h-14"
                    />
                </Link>
    
                <Link to="/" className="text-lg font-[Poppins] text-white hover:underline">
                    Home
                </Link>
            </div>
        );
    }

    return (
        <div className="h-20 w-full bg-purple-950 flex items-center px-4 relative">
            {/* Logo */}
            <div className="flex-shrink-0">
                <img
                    src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                    alt="cdac"
                    className="h-14"
                />
            </div>

            {/* Hamburger Menu (For Mobile) */}
            <div className="lg:hidden cursor-pointer ml-auto z-50" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={28} className="text-white" /> : <FiMenu size={28} className="text-white" />}
            </div>

            {/* Navigation Links */}
            <div className={`absolute lg:static font-lexend left-0 right-0 top-20 bg-purple-950 lg:bg-transparent text-xl flex flex-col lg:flex-row items-center justify-center mx-auto overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "flex w-full py-4" : "hidden lg:flex"}`}>

                {/* Conditionally use smooth scrolling if on the homepage, else use regular routing */}
                {isHomePage ? (
                    <>
                        <ScrollLink to="home" smooth={true} duration={500} offset={-80} className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Home
                        </ScrollLink>
                        <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            About Us
                        </ScrollLink>
                        <ScrollLink to="eligibility" smooth={true} duration={500} offset={-80} className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Who is Eligible
                        </ScrollLink>
                        <ScrollLink to="contact" smooth={true} duration={500} offset={-80} className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Contact Us
                        </ScrollLink>
                    </>
                ) : (
                    <>
                        <Link to="/" className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Home
                        </Link>
                        <Link to="/about" className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            About Us
                        </Link>
                        <Link to="/eligibility" className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Who is Eligible
                        </Link>
                        <Link to="/contact" className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                            Contact Us
                        </Link>
                    </>
                )}

                {/* Regular routing for pages like Training Calendar */}
                <Link to="/calendar" className="px-4 py-2 text-white hover:text-purple-300 transition-all font-semibold cursor-pointer">
                    Training Calendar
                </Link>

                {/* Login & Registration (Mobile) */}
                <div className="w-full flex flex-col lg:hidden items-center mt-2">
                    <Link to="/signup" className="px-4 py-2 w-full text-center text-blue-200 hover:text-white transition-all cursor-pointer">
                        Registration
                    </Link>
                    <Link to="/login" className="px-4 py-2 w-full text-center text-blue-200 hover:text-white transition-all cursor-pointer">
                        Login
                    </Link>
                </div>
            </div>

            {/* Login & Registration (Desktop) */}
            <div className="hidden lg:flex text-white text-3xl font-semibold font-[poppin] rounded-xl overflow-hidden transition-all duration-300 ease-in-out ml-auto">
                <Link to="/login" className="px-4 py-2 rounded-xl hover:text-purple-700 transition-all duration-300 cursor-pointer">
                    Login
                </Link>
            </div>
        </div>
    );
};
