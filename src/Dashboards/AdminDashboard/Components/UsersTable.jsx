import axios from "axios";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import { toast } from "react-toastify";

export const UsersTable = ({ users: initialUsers }) => {
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState({}); // Track approval loading state
    const token = localStorage.getItem("authToken");

    const handleApprove = async (userId) => {
        setLoading((prev) => ({ ...prev, [userId]: true })); // Set loading state

        try {
            const response = await axios.put(
                `http://localhost:8082/admin/users/${userId}/approved`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data);

                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, approved: true } : user
                    )
                );
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user");
        } finally {
            setLoading((prev) => ({ ...prev, [userId]: false })); // Remove loading state
        }
    };

    const fetchDocument = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:8082/admin/user/${userId}/view`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const url = URL.createObjectURL(response.data);
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error fetching document: ", error);
            toast.error("Failed to fetch document");
        }
    };

    return (
        <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
            <table className="w-full border-collapse border border-gray-300 min-w-[700px]">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Organization</th>
                        <th className="border p-2">View Document</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td className="border p-2">{user.fullName}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.userName}</td>
                                <td className="border p-2">{user.organisation}</td>
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
                                        className={`px-3 py-1 cursor-pointer flex items-center justify-center rounded w-[110px] h-[35px] ${
                                            user.approved
                                                ? "bg-green-500 text-white cursor-default"
                                                : "bg-green-700 text-white hover:bg-green-600"
                                        }`}
                                        onClick={() => !user.approved && handleApprove(user.id)}
                                        disabled={loading[user.id] || user.approved}
                                    >
                                       {loading[user.id] ? (
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
                                        className="px-3 py-1 cursor-pointer rounded bg-red-700 text-white hover:bg-red-600 w-[90px] h-[35px]"
                                        disabled={loading[user.id]} // Disable reject button while approving
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">
                                No unapproved users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
