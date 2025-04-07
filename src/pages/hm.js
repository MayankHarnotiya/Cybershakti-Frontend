import { motion } from "framer-motion";
import { Lock, ShieldCheck, Code, Server, Bug, AlertTriangle, Contact } from "lucide-react"; // Cybersecurity-related icons
import { Element } from "react-scroll";
import { About } from "./About";
import { Eligible } from "./Eligible";
import {Contact as ContactUs} from "./Contact"

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Element name="home">
      <div className="bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A] w-full h-170 mt-3 rounded-lg flex items-center justify-center relative overflow-hidden">
      
      <div className="bg-gradient-to-bl from-[#1E0B39] via-[#7B1FA2] to-[#D4145A] h-150 w-450 rounded-xl flex flex-row items-center p-10 relative">
        
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-between items-start h-full w-2/3">
          <h1 className="text-7xl text-violet-950 font-lexend">CYBERSHAKTI</h1>
          <h2 className="text-4xl font-semibold text-white mb-70">
            “Empowering Indian Women Government Officials in Cybersecurity”
          </h2>
          <p className="text-slate-50 text-xl font-lexend text-center">
            In an era where digital security is of paramount importance, CYBERSHAKTI emerges as a groundbreaking initiative aimed at empowering Indian women government officials with cutting-edge cybersecurity skills. This program is designed to equip, educate, and elevate women in public service by providing comprehensive training in cyber defense, risk management, and digital forensics.
          </p>
        </div>

        {/* Animated Cyber Attack Elements in a Row */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-around px-10">
          <CyberAnimation />
        </div>

        {/* Right Side - Image */}
        <div className="w-1/3 flex items-center justify-end">
          <img src="/cybershaktiLogo.png" alt="cybershakti" className="size-130 rounded-ss-4xl rounded-ee-4xl border-purple-800 border-3" />
        </div>
      </div>
    </div>
      </Element>

      {/* About Us Section */}
      <Element name="about">
        <About/>
      </Element>

      {/* Who is Eligible Section */}
      <Element name="eligibility">
        <Eligible/>
      </Element>

      {/* Contact Section */}
      <Element name="contact">
        <ContactUs/>
      </Element>
    </div>
  );
};

/* Cyber Attack Floating Elements */
const CyberAnimation = () => {
  const icons = [
    { Icon: Lock, color: "text-blue-400" }, // Encryption Lock
    { Icon: ShieldCheck, color: "text-green-400" }, // Security Shield
    { Icon: Code, color: "text-yellow-400" }, // Coding
    { Icon: Server, color: "text-cyan-400" }, // Server Attack
    { Icon: Bug, color: "text-red-400" }, // Malware Bug
    { Icon: AlertTriangle, color: "text-orange-400" }, // Firewall Breach Alert
  ];

  return (
    <div className="flex space-x-10">
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          initial={{ y: -10, opacity: 0.8 }}
          animate={{ y: 10, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: index * 0.2 }}
          className={`p-8 bg-white/10 rounded-full border ${color} shadow-2xl`}
        >
          <Icon size={65} className={`${color}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default Home;
