import { MdOutlinePostAdd } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrCertificate, GrScorecard } from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStreetView } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/user", icon: <IoIosHome size={25} />, label: "Dashboard" },
    { path: "/user/approval", icon: <GiArchiveRegister size={25} />, label: "Training Details" },
    { path: "/user/add-training", icon: <MdOutlinePostAdd size={25} />, label: "Profile" },
    { path: "/user/view-training", icon: <FaStreetView size={25} />, label: "Certificates" },
  ];

  return (
    <div className="w-screen  h-auto bg-purple-800 shadow-md p-4 flex flex-col justify-between">
      <nav>
        <ul className="flex flex-wrap items-center  justify-center gap-6 sm:gap-10">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                className={`flex items-center space-x-2  sm:text-2xl  font-[poppins] cursor-pointer ${
                  isActive ? "text-yellow-300 font-bold" : "text-white"
                } hover:text-violet-300`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="text-2xl">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
