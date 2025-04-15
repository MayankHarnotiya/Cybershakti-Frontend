import { useEffect, useState } from "react"

import { toast,ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Pending } from "../Components/Pending"
import { Approved } from "../Components/Approved"
import { Rejected } from "../Components/Rejected"
import axios from "axios"


export const RegisterationApproval = () => {
     const [unApproved, setUnapprovedUsers] = useState([])
    const [approvedUsers,setApprovedUsers]=useState([])
    const [rejectedUsers,setRejectedUsers]=useState([])
    const [loading, setLoading] = useState(false)
  
    const BASE_URL=import.meta.env.VITE_BASE_URL

    const fetchPendingUsers = async () => {
             try {
                const token = localStorage.getItem("authToken")
                if (!token) {
                    toast.error("Unauthorized.Please log in")
                    setLoading(false)
                    return
                }
                const response = await axios.get(`${BASE_URL}/admin/users/unApproved`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'application/json'

                    }
                })
                console.log("unapproved",response)
                setUnapprovedUsers(response.data)

            } catch (error) {
                toast.error("Error Fetching users")
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        const fetchApprovedUsers=async ()=>{
            try {
                const token=localStorage.getItem("authToken")
                if(!token)
                {
                    toast.error("Unauthorized.Please Login")
                    setLoading(false)
                    return
                }
                const response=await axios.get(`${BASE_URL}/admin/users/approved`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
                console.log("approved",response)
                setApprovedUsers(response.data)
            } catch (error) {
                toast.error("Error Fetching users")
                console.log(error)
            }
            finally {
                setLoading(false)
            }
           }

           const fetchRejectedUsers=async ()=>{
            try {
                const token=localStorage.getItem("authToken")
                if(!token)
                {
                    toast.error("Unauthorized.Please Login")
                    setLoading(false)
                    return
                }
        
                const response=await axios.get(`${BASE_URL}/admin/users/reject`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
    
                console.log("rejected",response)
                setRejectedUsers(response.data)
    
            } catch (error) {
                toast.error("Error Fetching users")
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        
    // useEffect(() => {
    //     fetchApprovedUsers()
    //     fetchPendingUsers()
    //     fetchRejectedUsers()
    // }, [])

    return (
        <>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

       <div className="">
       <h2 className="text-4xl font-bold mb-4 text-center">Pending Approvals</h2>
        <div className="p-6 bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A]">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <Pending
                pendingUsers={unApproved}
                fetchPendingUsers={fetchPendingUsers}
                fetchApprovedUsers={fetchApprovedUsers}
                fetchRejectedUsers={fetchRejectedUsers}
                />
            )}
        </div>
       </div>
       <div className="">
       <h2 className="text-4xl font-bold mb-4 text-center">Approved Users</h2>
        <div className="p-6 bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A]">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <Approved approvedUsers={approvedUsers} pendingUsers={unApproved} fetchApprovedUsers={fetchApprovedUsers}/>
            )}
        </div>
       </div>
       <div className="">
       <h2 className="text-4xl font-bold mb-4 text-center">Rejected Users</h2>
        <div className="p-6 bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A]">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <Rejected 
                rejectedUsers={rejectedUsers}
                pendingUsers={unApproved}
                fetchRejectedUsers={fetchRejectedUsers}
                />
            )}
        </div>
       </div>
    </>
    )
}