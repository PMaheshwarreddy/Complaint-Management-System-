import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContextProvider.jsx";
import React from "react";
import { pages } from "@/constants";

const ActualHome = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        if (user) {
            navigate(pages.registerComplaint);
        } else {
            navigate(pages.login);
        }
    };

    return (
        <section id="home" className="bg-gradient-to-b from-gray-100 to-gray-200 py-14 md:py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                <div className="flex flex-col md:w-3/5 gap-5 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 bg-blue-100 rounded-full w-fit">
                        Open-Source Issue Tracking
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-950 leading-tight">
                        Streamlined Complaint Management & Fast Resolution
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        An end-to-end platform built for institutions, workspaces, and organizations to report issues, upload proof, verify legitimacy, and dispatch technicians. Track every grievance transparently from submission to complete resolution.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button
                            className="px-6 py-3 text-base font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 hover:shadow-lg transition shadow-md cursor-pointer"
                            onClick={handleRegisterClick}
                        >
                            {user ? "File a Complaint" : "Register / File a Grievance"}
                        </button>
                        {user && (
                            <button
                                className="px-6 py-3 text-base font-semibold text-blue-900 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition shadow-sm cursor-pointer"
                                onClick={() => navigate(pages.dashboard)}
                            >
                                Open Dashboard
                            </button>
                        )}
                        <a
                            href="#about"
                            className="px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>
                <div className="md:w-2/5 flex justify-center">
                    <img
                        src="/assests/hero-banner.png"
                        alt="Complaint Management"
                        className="w-full max-w-sm drop-shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default ActualHome;
