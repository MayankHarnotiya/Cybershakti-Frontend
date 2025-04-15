import axios from "axios"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"
import { LuEye } from "react-icons/lu";

export const Rejected=({fetchRejectedUsers,rejectedUsers,pendingUsers})=>{
 const [users,setUsers]=useState([])
 const [loading,setLoading]=useState(true)
 const token=localStorage.getItem("authToken")
 const [loadingReApprove,setLoadingReApprove]=useState([])
 const[loadingDelete,setLoadingDelete]=useState([])
 const BASE_URL = import.meta.env.VITE_BASE_URL;

//  const fetchRejectedUsers=async ()=>{
//     try {
//         const token=localStorage.getItem("authToken")
//         if(!token)
//         {
//             toast.error("Unauthorized.Please Login")
//             setLoading(false)
//             return
//         }

//         const response=await axios.get(`${BASE_URL}/admin/users/reject`,{
//             headers:{
//                 Authorization:`Bearer ${token}`,
//                 "Content-Type":"application/json"
//             }
//         })

//         console.log("rejected",response)
//         setUsers(response.data)
        
//     } catch (error) {
//         toast.error("Error Fetching users")
//         console.log(error)
//     }
//     finally{
//         setLoading(false)
//     }
// }
 useEffect(()=>{
   
    fetchRejectedUsers()
    },[rejectedUsers])

 const handleReApprove = async (userId) => {
    setLoadingReApprove((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/rejected/users/${userId}/approved`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success(response.data || "User re-approved successfully");
  
      fetchRejectedUsers()
      fetchRejectedUsers()
    } catch (error) {
      const message = error?.response?.data || "Failed to re-approve user";
      toast.error(message);
      console.error("Error re-approving user:", message);
    } finally {
      setLoadingReApprove((prev) => ({ ...prev, [userId]: false }));
    }
  };
  


const handleDelete=async (userId)=>{
    if (!window.confirm("Are you sure you want to delete this user?")) return;
       
        
    setLoadingDelete((prev) => ({ ...prev, [userId]: true }));
    console.log("approve"+token)

    try {
        const response=await axios.delete(`${BASE_URL}/admin/rejected/users/${userId}/delete`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        toast.success(response.data || "User deleted successfully");
        fetchRejectedUsers()
    } catch (error) {
        const message = error?.response?.data || "Failed to delete user";
        toast.error(message);
        console.error("Error deleting user:", message);
    }
    finally {
        setLoadingDelete((prev) => ({ ...prev, [userId]: false }));
    }
}
const fetchDocument = async (userId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/admin/rejected/user/${userId}/view`,
            {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const contentType = response.headers["content-type"];

        // Check if it's NOT a valid PDF (likely an error blob)
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
}

return (
    <div className="overflow-x-auto">
    <ToastContainer position="top-center" autoClose={3000} />

    <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
        <thead>
            <tr className="bg-gray-200">
                <th className="border p-2">Full Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Organization</th>
                <th className="border p-2">Designation</th>
                <th className="border p-2">Mobile Number</th>
                <th className="border p-2">View Document</th>
                <th className="border p-2">Actions</th>
            </tr>
        </thead>

        <tbody>
            {rejectedUsers.length> 0 ? (
                rejectedUsers.map((user) => (
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

                        <td className="border p-2 flex gap-2 justify-center">
                            {/* Re-approve button */}
                            <button
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded flex items-center justify-center gap-1"
                                onClick={() => handleReApprove(user.id)}
                                disabled={loadingReApprove[user.id]}
                            >
                                {loadingReApprove[user.id] ? (
                                    <>
                                        <FaSpinner className="animate-spin" size={16} />
                                        <span className="text-xs">Re-approving...</span>
                                    </>
                                ) : (
                                    "Re-approve"
                                )}
                            </button>

                            {/* Delete button */}
                            <button
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded flex items-center justify-center gap-1"
                                onClick={() => handleDelete(user.id)}
                                disabled={loadingDelete[user.id]}
                            >
                                {loadingDelete[user.id] ? (
                                    <>
                                        <FaSpinner className="animate-spin" size={16} />
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
                    <td colSpan="8" className="text-center p-4 text-white font-bold text-xl">
                        No rejected users found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
)
}
