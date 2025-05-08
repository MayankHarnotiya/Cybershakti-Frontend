import { BiLogOut } from "react-icons/bi";
import { FiBell, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }
    return (
        <>
            <div className="w-full h-20 bg-purple-950 flex items-center justify-between px-6">
                <img
                    src="https://cdaccybergyan.uat.dcservices.in/images/cdac-logo.png"
                    alt="cdac"
                    className="h-14"
                />
                <button
                    className="text-2xl cursor-pointer hover:text-purple-400 text-white font-semibold font-[poppins] flex items-center gap-2"
                    onClick={handleLogout}
                >
                    <BiLogOut size={30} />
                    Logout
                </button>
            </div>

        </>
    );
};
