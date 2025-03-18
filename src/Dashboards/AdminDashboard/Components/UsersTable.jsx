export const UsersTable = ({ users }) => {
    const handleApprove = (userId) => {
        
    }

    const handleDisapprove = (userId) => {
       
    }
    return (
        <>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Organization</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td className="border p-2">{user.fullName}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.username}</td>
                                    <td className="border p-2">{user.organization}</td>
                                    <td className="border p-2 flex justify-center gap-2">
                                        <button className={`px-3 py-1 rounded ${user.approved
                                            ? "bg-green-500 text-white cursor-default"
                                            : "bg-green-700 text-white hover:bg-green-600"
                                            }`}
                                            onClick={() => !user.approved && handleApprove(user.id)}
                                            disabled={user.approved}
                                        >
                                            {user.approved ? "Approved" : "Approve"}
                                        </button>

                                        <button className={`px-3 py-1 rounded ${user.disapproved
                                            ? "bg-red-500 text-white cursor-default"
                                            : "bg-red-700 text-white hover:bg-red-600"
                                            }`}
                                            onClick={() => !user.approved && handleDisApprove(user.id)}
                                            disabled={user.approved}
                                        >
                                            {user.approved ? "Approved" : "Approve"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No unapproved users found.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}