import { MdOutlinePostAdd } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrCertificate, GrScorecard } from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStreetView } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: <IoIosHome size={30} />, label: "Home" },
    { path: "/admin/approval", icon: <GiArchiveRegister size={30} />, label: "Registration Approval" },
    { path: "/admin/add-training", icon: <MdOutlinePostAdd size={30} />, label: "Add Training" },
    { path: "/admin/view-training", icon: <FaStreetView size={30} />, label: "View Training Status" },
    { path: "/admin/report", icon: <GrScorecard size={30} />, label: "Report" },
    { path: "/admin/certification", icon: <GrCertificate size={30} />, label: "Certification" },
  ];

  return (
    <div className="w-screen h-auto bg-purple-800 shadow-md p-4 flex flex-col justify-between">
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                className={`flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] cursor-pointer ${
                  isActive ? "text-yellow-300 font-bold" : "text-white"
                } hover:text-violet-300`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
