import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    if (isAuthPage) {
        return (
            <div className="h-16 w-full bg-purple-950 flex items-center px-4 justify-between">
                <Link to="/">
                    <img src="/cdac-logo.png" alt="cdac" className="h-14" />
                </Link>
                <Link to="/" className="text-lg font-[Poppins] text-white hover:underline">
                    Home
                </Link>
            </div>
        );
    }

    return (
<div className="sticky top-0 mt-10 z-50 h-20 w-400 ml-30 bg-amber-100/20 backdrop-blur-xl flex items-center px-6 justify-between rounded-full shadow-md border">
{/* Logo */}
            <Link to="/" className="flex items-center">
                <img src="/cdac-logo.png" alt="cdac" className="h-12" />
            </Link>

            {/* Nav Links */}
            <div className={`absolute lg:static top-20 left-0 right-0 lg:flex bg-white lg:bg-transparent flex-col lg:flex-row items-center justify-center gap-4 font-medium text-black transition-all duration-300 ease-in-out ${menuOpen ? "flex py-4" : "hidden lg:flex"}`}>
                {isHomePage ? (
                    <>
                        <ScrollLink
                            to="home"
                            smooth={true}
                            offset={-80}
                            duration={500}
                            spy={true}
                            isDynamic={true}
                            activeClass="text-orange-600 underline"
                            className="text-lg cursor-pointer hover:text-orange-500"
                        >
                            Home
                        </ScrollLink>
                        <ScrollLink
                            to="about"
                            smooth={true}
                            offset={-80}
                            duration={500}
                            spy={true}
                            isDynamic={true}
                            activeClass="text-orange-600 underline"
                            className="text-lg cursor-pointer hover:text-orange-500"
                        >
                            About Us
                        </ScrollLink>
                        <ScrollLink
                            to="eligibility"
                            smooth={true}
                            offset={-80}
                            duration={500}
                            spy={true}
                            isDynamic={true}
                            activeClass="text-orange-600 underline"
                            className="text-lg cursor-pointer hover:text-orange-500"
                        >
                            Who is Eligible
                        </ScrollLink>
                        <ScrollLink
                            to="contact"
                            smooth={true}
                            offset={-150} // Adjust the offset here for better alignment
                            duration={500}
                            spy={true}
                            isDynamic={true}
                            activeClass="text-orange-600 underline"
                            className="text-lg cursor-pointer hover:text-orange-500"
                        >
                            Contact Us
                        </ScrollLink>
                    </>
                ) : (
                    <>
                        <Link to="/" className={`${location.pathname === "/" ? "text-orange-600 underline" : ""} hover:text-orange-500`}>
                            Home
                        </Link>
                        <Link to="/about" className={`${location.pathname === "/about" ? "text-orange-600 underline" : ""} hover:text-orange-500`}>
                            About Us
                        </Link>
                        <Link to="/eligibility" className={`${location.pathname === "/eligibility" ? "text-orange-600 underline" : ""} hover:text-orange-500`}>
                            Who is Eligible
                        </Link>
                        <Link to="/contact" className={`${location.pathname === "/contact" ? "text-orange-600 underline" : ""} hover:text-orange-500`}>
                            Contact Us
                        </Link>
                    </>
                )}
                <Link to="/calendar" className={`${location.pathname === "/calendar" ? "text-orange-600 underline" : ""} hover:text-orange-500 text-lg `}>
                    Training Calendar
                </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4 font-medium">
                <Link to="/login" className="border-2 border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                    Log in
                </Link>
                <Link to="/signup" className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600">
                    Register
                </Link>
            </div>

            {/* Hamburger Menu */}
            <div className="lg:hidden z-50 ml-auto cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </div>

            {/* Mobile Auth Buttons */}
            {menuOpen && (
                <div className="lg:hidden absolute top-[calc(100%+0.5rem)] right-4 bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center gap-2 mt-2">
                    <Link to="/signup" className="text-blue-700 hover:text-blue-900">Register</Link>
                    <Link to="/login" className="text-blue-700 hover:text-blue-900">Login</Link>
                </div>
            )}
        </div>
    );
};
