import { MdOutlinePostAdd } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { GrScorecard } from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FaStreetView } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";

export const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  return (
    <div className="w-screen h-auto bg-purple-800 shadow-md p-4 flex flex-col justify-between">
      <div>
        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <li
              className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <IoIosHome size={30} /> <span>Home</span>
            </li>
            <li
              className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer"
              onClick={() => navigate("/admin/approval")}
            >
              <GiArchiveRegister size={30} /> <span>Registeration Approval</span>
            </li>
            <li className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer">
              <MdOutlinePostAdd size={30} /> <span>Add Training</span>
            </li>
            <li className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer">
              <FaStreetView size={30} /> <span>View Training Status</span>
            </li>
            <li className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer">
              <GrScorecard size={30} /> <span>Report</span>
            </li>
            <li className="flex items-center space-x-2 text-base sm:text-2xl md:text-3xl font-[poppins] text-white hover:text-violet-300 cursor-pointer">
              <GrCertificate size={30} /> <span>Certification</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
