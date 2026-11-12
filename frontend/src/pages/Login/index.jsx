import React from 'react';
import styles from './styles.module.css';
import googleIcon from '../../assets/google.png';
import { apiRoutes, UserTypes, pages } from '@/constants';
import illutiration from '/public/assests/com.svg';
import { useUser } from '@/contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        window.open(`${apiRoutes.login}`, '_self');
    };

    const handleDemoLogin = (roleName, roleType, domain = undefined) => {
        setUser({
            displayName: `Demo ${roleName}`,
            email: `${roleName.toLowerCase()}@demo.com`,
            role: roleType,
            rollNo: "DEMO-001",
            domain,
            noOfComplaints: 5,
            solvedComplaints: 4,
            image: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        });
        navigate(pages.dashboard);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                {/* Brand Logo & Title */}
                <div className="flex items-center gap-3 mb-4 justify-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white shadow-md">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold tracking-tight text-blue-950 leading-tight">
                            Resolve<span className="text-orange-500">CMS</span>
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                            Complaint Management System
                        </span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-gray-500 text-sm mb-6">Sign in to submit, track, and manage grievances</p>

                {/* Primary Google Login */}
                <div className={styles.googleButton}>
                    <button
                        type="button"
                        className={`${styles.googleSignin} w-full cursor-pointer border border-gray-300 hover:shadow-md transition`}
                        onClick={handleGoogleSignIn}
                    >
                        <span className={styles.icon}>
                            <img src={googleIcon} alt="Google" className={styles.googleImage} />
                        </span>
                        <span className={styles.text}>Sign in with Google</span>
                    </button>
                </div>

                {/* Quick Demo Preview Modes */}
                <div className="mt-8 pt-6 border-t border-gray-200 w-full text-center">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Instant Role Previews (Offline / Demo)
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("Complainant", UserTypes.Complainant)}
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition border border-blue-200 cursor-pointer"
                        >
                            👤 Complainant
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("Verifier", UserTypes.Verifier)}
                            className="px-3 py-2 bg-amber-50 text-amber-800 rounded-md font-medium hover:bg-amber-100 transition border border-amber-200 cursor-pointer"
                        >
                            🔍 Verifier
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("Technician", UserTypes.Technician, 0)}
                            className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md font-medium hover:bg-purple-100 transition border border-purple-200 cursor-pointer"
                        >
                            🔧 Technician
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("Admin", UserTypes.Admin)}
                            className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded-md font-medium hover:bg-emerald-100 transition border border-emerald-200 cursor-pointer"
                        >
                            ⚙️ Administrator
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.illustrationContainer}>
                <img src={illutiration} alt="Illustration" className={styles.illustration} />
            </div>
        </div>
    );
};

export default Login;
