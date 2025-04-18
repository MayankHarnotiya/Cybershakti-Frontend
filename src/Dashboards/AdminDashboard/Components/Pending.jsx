import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



export const Pending = ({pendingUsers,fetchPendingUsers,fetchApprovedUsers, fetchRejectedUsers}) => {
    const [users, setUsers] = useState([]);
    const [loading,setLoading]=useState(true)
    const [loadingApprove, setLoadingApprove] = useState({});
    const [loadingReject,setLoadingReject]=useState({})
    const token = localStorage.getItem("authToken");
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // const fetchPendingUsers = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken")
    //         if (!token) {
    //             toast.error("Unauthorized.Please log in")
    //             setLoading(false)
    //             return
    //         }
    //         const response = await axios.get(`${BASE_URL}/admin/users/unApproved`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'content-type': 'application/json'

    //             }
    //         })
    //         console.log("unapproved",response)
    //         setUsers(response.data)

    //     } catch (error) {
    //         toast.error("Error Fetching users")
    //         console.log(error)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }
    useEffect(() => {     
        fetchPendingUsers()
    }, [])

    const handleApprove = async (userId) => {
        setLoadingApprove((prev) => ({ ...prev, [userId]: true }));

        try {
            const response = await axios.put(
                `${BASE_URL}/admin/users/${userId}/approved`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchPendingUsers()
            fetchApprovedUsers()
            toast.success(response.data || "User approved successfully");
        } catch (error) {
           const message=error?.response?.data || "Failed to approve user"
            toast.error(message)
            console.error("Error rejecting user:".message)
        } finally {
            setLoadingApprove((prev) => ({ ...prev, [userId]: false })); // Remove loading state
        }
    };

    const handleReject=async (userId)=>{
        setLoadingReject((prev) => ({ ...prev, [userId]: true }));
        try {
            const response=await axios.post(
                `${BASE_URL}/admin/users/${userId}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(response)
            toast.success(response.data || "User rejected successfully")
            fetchPendingUsers()
            fetchRejectedUsers()
        } catch (error) {
            const message=error?.response?.data || "Failed to reject user"
            toast.error(message)
            console.error("Error rejecting user:".message)
        }
        finally{
            setLoadingReject((prev)=>({...prev,[userId]:false}))
        }
    }

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
    
            // 🔎 Check if it's NOT a valid PDF (likely an error blob)
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
                    {pendingUsers.length > 0 ? (
                        pendingUsers.map((user) => (
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
                                <td className="border p-2 flex justify-center gap-2">
                                    <button
                                        className={`px-3 py-1 cursor-pointer flex items-center justify-center rounded w-[110px] h-[35px] ${user.approved
                                                ? "bg-green-500 text-white cursor-default"
                                                : "bg-green-600 text-white hover:bg-green-700"
                                            }`}
                                        onClick={() => !user.approved && handleApprove(user.id)}
                                        disabled={loadingApprove[user.id] || user.approved}
                                    >
                                        {loadingApprove[user.id] ? (
                                            <>
                                                <FaSpinner className="animate-spin text-white mb-1" size={18} />
                                                <span className="text-xs">Approving...</span>
                                            </>
                                        ) : user.approved ? (
                                            "Approved"
                                        ) : (
                                            "Approve"
                                        )}
                                    </button>

                                    <button
                                        className={`px-3 py-1 cursor-pointer flex items-center justify-center rounded w-[110px] h-[35px] ${user.approved
                                            ? "bg-red-500 text-white cursor-default"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                        }`}
                                        onClick={() => !user.rejected &&  handleReject(user.id)}
                                         disabled={loadingReject[user.id] || user.rejected || user.approved} // Disable reject button while approving
                                    >
                                         {loadingReject[user.id] ? (
                                            <>
                                                <FaSpinner className="animate-spin text-white mb-1" size={18} />
                                                <span className="text-xs">Rejecting...</span>
                                            </>
                                        ) : user.rejected? (
                                            "Rejected"
                                        ) : (
                                            "Reject"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center text-white font-bold  text-xl p-3">
                                No unapproved users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
