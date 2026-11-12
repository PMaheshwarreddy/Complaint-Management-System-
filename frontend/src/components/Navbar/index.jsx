import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "@/utils";
import { useUser } from "@/contexts/UserContextProvider";

const Navbar = ({ auLinks = [], unAuLinks = [] }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const checkedLinks = user ? auLinks : unAuLinks;
    const activeCheck = (isActive) => {
        return isActive
            ? "px-3 py-1.5 rounded-md bg-blue-800 text-white font-medium transition text-base"
            : "px-3 py-1.5 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white transition text-base";
    };

    return (
        <header className="sticky top-0 z-50 bg-blue-900 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Brand Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => navigate('/')}
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white shadow-md">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-tight">
                            Resolve<span className="text-orange-400">CMS</span>
                        </span>
                        <span className="text-xs text-blue-200 font-medium tracking-wide">
                            Complaint Management System
                        </span>
                    </div>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="md:hidden text-white text-2xl focus:outline-none p-1"
                    onClick={toggleDropdown}
                    aria-label="Toggle navigation"
                >
                    {isDropdownOpen ? '✕' : '☰'}
                </button>

                {/* Nav Links */}
                <div className={`md:flex items-center gap-6 ${isDropdownOpen ? 'flex flex-col absolute top-full left-0 w-full bg-blue-900 p-5 shadow-xl border-t border-blue-800' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-4 list-none m-0 p-0">
                        {checkedLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => activeCheck(isActive)}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            {!user ? (
                                <NavLink
                                    to="/login"
                                    className="px-5 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 shadow-sm transition block"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Sign In / Login
                                </NavLink>
                            ) : (
                                <button
                                    className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition"
                                    onClick={useLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
