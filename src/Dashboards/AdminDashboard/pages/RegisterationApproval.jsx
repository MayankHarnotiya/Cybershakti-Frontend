import { useEffect, useState } from "react"

import axios from "axios"
import { toast,ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Pending } from "../Components/Pending"
import { Approved } from "../Components/Approved"


export const RegisterationApproval = () => {
    const [unApprovedusers, setUnapprovedUsers] = useState([])
    const [approvedUsers,setApprovedUsers]=useState([])
    const [rejectedUsers,setRejectedUsers]=useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("authToken")
                if (!token) {
                    toast.error("Unauthorized.Please log in")
                    setLoading(false)
                    return
                }
                const response = await axios.get("http://localhost:8082/admin/users/unApproved", {
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
        fetchUsers()
    }, [])

    useEffect(()=>{
       const fetchUsers=async ()=>{
        try {
            const token=localStorage.getItem("authToken")
            if(!token)
            {
                toast.error("Unauthorized.Please Login")
                setLoading(false)
                return
            }
            const response=await axios.get("http://localhost:8082/admin/users/approved",{
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
       fetchUsers()
    },[])

    useEffect(()=>{
    const fetchUsers=async ()=>{
        try {
            const token=localStorage.getItem("authToken")
            if(!token)
            {
                toast.error("Unauthorized.Please Login")
                setLoading(false)
                return
            }
    
            const response=await axios.get("http://localhost:8082/admin/users/reject",{
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
    fetchUsers()
    },[])

    return (
        <>
       <div className="">
       <h2 className="text-4xl font-bold mb-4 text-center">Pending Approvals</h2>
        <div className="p-6 bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A]">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <Pending users={unApprovedusers} />
            )}
        </div>
       </div>
       <div className="">
       <h2 className="text-4xl font-bold mb-4 text-center">Approved Users</h2>
        <div className="p-6 bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A]">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <Approved users={approvedUsers} />
            )}
        </div>
       </div>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </>
    )
}