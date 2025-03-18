import { MdOutlinePostAdd } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { GrScorecard } from "react-icons/gr";
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
export  const Sidebar = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
   localStorage.removeItem("authToken")
   navigate('/login')
  }
  return (
    <div className="w-64 h-screen bg-blue-400 shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="ml-4 mb-5">
          <img src="https://cdaccybergyan.uat.dcservices.in/images/cdac-wo-bg.png" alt="CDAC" className="size-45 cursor-pointer" onClick={()=>navigate("/admin")}/>
        </div>
        <nav>
          <ul className="">
            <div className="flex flex-col gap-2 mb-15 ">
            <p className="text-xl font-bold px-1 text-slate-900">Main</p>
            <hr className="w-55 mx-auto border-t-2 border-gray-500 mb-2" />
            <li className="flex items-center space-x-2 text-lg font-[poppins] text-gray-700 hover:text-blue-800 cursor-pointer"
            onClick={()=>navigate("/admin/approval")}
            >
              <GiArchiveRegister size={22} /> <span>Registeration Approval</span>
            </li>
            <li className="flex items-center space-x-2 text-lg font-[poppins] text-gray-700 hover:text-blue-800 cursor-pointer">
              <MdOutlinePostAdd size={22} /> <span>Add Training</span>
            </li>
            <li className="flex items-center space-x-2 text-lg font-[poppins] text-gray-700 hover:text-blue-800 cursor-pointer">
              <TbReport size={22} /> <span>Reports</span>
            </li>
            <li className="flex items-center space-x-2 text-lg font-[poppins] text-gray-700 hover:text-blue-800 cursor-pointer">
              <GrCertificate size={22} /> <span>Certification </span>
            </li>
            <li className="flex items-center space-x-2 text-lg font-[poppins] text-gray-700 hover:text-blue-800 cursor-pointer">
              <GrScorecard size={22} /> <span>Scoring</span>
            </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col  items-center cursor-pointer">
       
        <button className="text-lg font-semibold pr-5 cursor-pointer" onClick={handleLogout}>  <BiLogOut size={38}/>Logout</button>
        {/* <p className="text-lg font-semibold ">Logout</p> */}
      </div>
   
    </div>
  );
};

export default Sidebar;
