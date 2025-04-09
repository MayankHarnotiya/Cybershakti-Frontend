import { BiLogOut } from "react-icons/bi";
import { FiBell, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("authToken")
        navigate('/login')
       }
    return (
        <>
            <div className="w-full h-20 bg-purple-950 flex space-x-335 ">
                <img
                    src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                    alt="cdac"
                    className="h-14 mt-2"
                />
                <div>
                    <button className="text-lg text-white font-semibold pr-5 cursor-pointer mt-2" onClick={handleLogout}>  <BiLogOut size={36}  className=""/>Logout</button>

                </div>
            </div>
        </>
    );
};
