import styles from "./styles.module.css";
import React from "react";

const Contact = () => {
    return (
        <section id="contact" className="flex flex-col gap-8 p-8 md:p-14 bg-white border-t border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900">Contact & Support</h2>
            <div className="max-w-6xl mx-auto flex items-center flex-wrap justify-center gap-12 md:gap-20">
                <div className="flex flex-col gap-3 w-80">
                    <span className="text-2xl font-bold text-gray-800">Support Desk</span>
                    <span className="text-base text-gray-600 leading-relaxed">
                        For deployment guidance, feature inquiries, or general support with the Complaint Management System, our team is here to assist.
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-2">
                        <div className="text-lg font-bold text-gray-800">Email:</div>
                        <div className="text-base text-blue-600 font-medium">support@complaintms.org</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="text-lg font-bold text-gray-800">Hours:</div>
                        <div className="text-base text-gray-600">Monday – Friday (9:00 AM – 6:00 PM)</div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        <div className="text-lg font-bold text-gray-800">Community Channels:</div>
                        <div className="flex flex-row gap-3">
                            <a href="#contact" aria-label="Facebook" className="hover:opacity-80 transition">
                                <img src="/assests/SVGS/facebook.svg" height={32} width={32} alt="Facebook" />
                            </a>
                            <div className="border-r border-gray-300"></div>
                            <a href="#contact" aria-label="Instagram" className="hover:opacity-80 transition">
                                <img src="/assests/SVGS/instragram.svg" height={32} width={32} alt="Instagram" />
                            </a>
                            <div className="border-r border-gray-300"></div>
                            <a href="#contact" aria-label="LinkedIn" className="hover:opacity-80 transition">
                                <img src="/assests/SVGS/linkedan.svg" height={32} width={32} alt="LinkedIn" />
                            </a>
                            <div className="border-r border-gray-300"></div>
                            <a href="#contact" aria-label="Twitter" className="hover:opacity-80 transition">
                                <img src="/assests/SVGS/twitter.svg" height={32} width={32} alt="Twitter" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* Brand Graphic */}
                <div className="flex items-center justify-center p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-md">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-blue-950">Resolve<span className="text-orange-500">CMS</span></span>
                        <span className="text-xs text-gray-500 font-medium">Open-Source Edition</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
