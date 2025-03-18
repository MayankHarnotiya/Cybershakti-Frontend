import { useEffect, useState } from "react"
import { UsersTable } from "../Components/UsersTable"
import axios from "axios"


export const RegisterationApproval = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("authToken")
                if (!token) {
                    setError("Unauthorized.Please log in")
                    setLoading(false)
                    return
                }
                console.log(123)
                const response = await axios.get("http://localhost:8082/admin/users/unApproved", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type':'application/json'
                        
                    }
                })
                console.log(12)
                console.log(response)
               // setUsers(response.data)

            } catch (error) {
                setError("Error Fetching users")
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Registration Approvals</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <UsersTable users={users} setUsers={setUsers} />
                )}
            </div>
        </>
    )
}