import {} from "react";
import styles from "./styles.module.css";

const features = [
    {
        heading: "/assests/sub2.0.png",
        content:
            "Streamlined complaint submission process for effortless, structured, and rapid issue reporting.",
    },
    {
        heading: "/assests/processtran2.0.png",
        content:
            "Transparent grievance lifecycle management providing all stakeholders with real-time progress visibility.",
    },
    {
        heading: "/assests/statustrack2.0.0.png",
        content:
            "Track the status of filed issues across verification, assignment, and resolution phases seamlessly.",
    },
    {
        heading: "/assests/docver2.0.png",
        content:
            "Robust document verification and cryptographic hash checks to uphold integrity and eliminate duplicate spam.",
    },
];


const About = () => {
    return (
        <div id="about" className="flex flex-col items-center gap-10 px-5 py-10 bg-blue-900">
            <div className="">
            <p className="text-lg font-bold text-center text-white">Features</p>
            <p className="text-2xl font-semibold text-center text-white">Complaint Management System</p>  
            </div>
            <div className={`flex flex-wrap gap-3`}>
                {features.map((feature, index) => (
                    <div key={index}
                         className={`shadow-lg p-4 w-64  rounded-xl flex flex-col bg-white gap-6 items-center text-center justify-between`}>
                        <img src={feature.heading}  height={100} width={100} />
                        <div className="text-base font-semibold">{feature.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
