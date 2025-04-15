import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



export const Approved = ({approvedUsers,pendingUsers,fetchApprovedUsers}) => {
    const [users, setUsers] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState({})
    const [loading,setLoading]=useState(true)
    const token = localStorage.getItem("authToken");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
   
    // const fetchApprovedUsers=async ()=>{
    //     try {
    //         const token=localStorage.getItem("authToken")
    //         if(!token)
    //         {
    //             toast.error("Unauthorized.Please Login")
    //             setLoading(false)
    //             return
    //         }
    //         const response=await axios.get(`${BASE_URL}/admin/users/approved`,{
    //             headers:{
    //                 Authorization:`Bearer ${token}`,
    //                 "Content-Type":"application/json"
    //             }
    //         })
    //         console.log("approved",response)
    //         setUsers(response.data)
    //     } catch (error) {
    //         toast.error("Error Fetching users")
    //         console.log(error)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    //    }
    useEffect(()=>{
        
        fetchApprovedUsers()
        console.log("ddd")
     },[approvedUsers])
 
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
       
        
        setLoadingDelete((prev) => ({ ...prev, [userId]: true }));
         
        try {
            console.log("Delete",token)
            const response = await axios.delete(
                `${BASE_URL}/admin/users/${userId}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data || "User deleted successfully");
            fetchApprovedUsers()
        } catch (error) {
            const message = error?.response?.data || "Failed to delete user";
            toast.error(message);
            console.error("Error deleting user:", message);
        } finally {
            setLoadingDelete((prev) => ({ ...prev, [userId]: false }));
        }
    };


    const fetchDocument = async (userId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/user/${userId}/view`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const contentType = response.headers["content-type"];

            //  Check if it's NOT a valid PDF (likely an error blob)
            if (!contentType.includes("application/pdf")) {
                const text = await response.data.text(); // Convert Blob to string
                toast.error(text || "Unknown error from server");
                console.error("Backend returned error blob:", text);
                return;
            }

            //  It's a valid PDF
            const blob = new Blob([response.data], { type: contentType });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");

        } catch (error) {
            //  Handle 404 or other errors with Blob response
            if (
                error?.response?.data instanceof Blob &&
                error.response?.headers["content-type"]?.includes("application/json")
            ) {
                const text = await error.response.data.text(); // Get error message from blob
                toast.error(text || "Something went wrong");
                console.error("Error from backend:", text);
            } else {
                //  Fallback error handling
                toast.error(error?.message || "Failed to fetch document.");
                console.error("Unexpected error:", error);
            }
        }
    };



    return (
        <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
            <ToastContainer position="top-center" autoClose={3000} />

            <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Organization</th>
                        <th className="border p-2">Desgnation</th>
                        <th className="border p-2">Mobile Number</th>
                        <th className="border p-2">View Document</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {approvedUsers.length > 0 ? (
                        approvedUsers.map((user) => (
                            <tr key={user.id} className="text-center text-white">
                                <td className="border p-2">{user.fullName}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.userName}</td>
                                <td className="border p-2">{user.organisation}</td>
                                <td className="border p-2">{user.designation}</td>
                                <td className="border p-2">{user.mobileNumber}</td>


                                <td className="border p-2">
                                    <button
                                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                                        onClick={() => fetchDocument(user.id)}
                                        title="View Document"
                                    >
                                        <LuEye size={20} />
                                    </button>
                                </td>
                                <td className="border p-2 flex justify-center">
                                    <button
                                        className={`px-3 py-1 cursor-pointer flex items-center justify-center rounded w-[110px] h-[35px] ${user.approved
                                            ? "bg-red-500 text-white cursor-default"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                            }`}
                                        onClick={() => handleDelete(user.id)}
                                        disabled={loadingDelete[user.id] } // Disable reject button while approving
                                    >
                                        {loadingDelete[user.id] ? (
                                            <>
                                                <FaSpinner className="animate-spin text-white mb-1" size={18} />
                                                <span className="text-xs">Deleting...</span>
                                            </>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center text-white font-bold text-xl p-4">
                                No Approved users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
