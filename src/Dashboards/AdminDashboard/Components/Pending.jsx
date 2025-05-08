import axios from "axios";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Pending = ({ pendingUsers, fetchPendingUsers, fetchApprovedUsers, fetchRejectedUsers }) => {
    const [loadingApprove, setLoadingApprove] = useState({});
    const [loadingReject, setLoadingReject] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const token = localStorage.getItem("authToken");
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (userId) => {
        setLoadingApprove((prev) => ({ ...prev, [userId]: true }));
        try {
            await axios.put(`${BASE_URL}/admin/users/${userId}/approved`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingUsers();
            fetchApprovedUsers();
            toast.success("User approved successfully");
        } catch (error) {
            toast.error(error?.response?.data || "Failed to approve user");
        } finally {
            setLoadingApprove((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const handleReject = async (userId) => {
        setLoadingReject((prev) => ({ ...prev, [userId]: true }));
        try {
            await axios.post(`${BASE_URL}/admin/users/${userId}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingUsers();
            fetchRejectedUsers();
            toast.success("User rejected successfully");
        } catch (error) {
            toast.error(error?.response?.data || "Failed to reject user");
        } finally {
            setLoadingReject((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const fetchDocument = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/user/${userId}/view`, {
                responseType: "blob",
                headers: { Authorization: `Bearer ${token}` }
            });

            const contentType = response.headers["content-type"];
            if (!contentType.includes("application/pdf")) {
                const text = await response.data.text();
                toast.error(text || "Unknown error from server");
                return;
            }

            const blob = new Blob([response.data], { type: contentType });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");

        } catch (error) {
            toast.error("Failed to fetch document.");
        }
    };

    const renderSortIcon = () => <i className="pi pi-sort-alt ml-2" />;

    return (
        <div className="w-full flex flex-col bg-gray-100 rounded-lg overflow-x-auto">
            <ToastContainer position="top-center" autoClose={3000} />

            {/* Header */}
            <div className="w-full bg-purple-400 p-4 rounded-t-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-700">Pending Users</h2>
                <div className="w-full md:w-72">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <i className="pi pi-search absolute left-3 top-2.5 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex-grow overflow-x-auto">
                <table className="w-full text-left table-auto bg-white rounded-md shadow-sm">
                    <thead className="bg-purple-300 sticky top-0 z-10">
                        <tr className="text-center text-lg text-gray-800">
                            <th className="p-4">Full Name {renderSortIcon()}</th>
                            <th className="p-4">Email {renderSortIcon()}</th>
                            <th className="p-4">Username {renderSortIcon()}</th>
                            <th className="p-4">Organization {renderSortIcon()}</th>
                            <th className="p-4">Designation {renderSortIcon()}</th>
                            <th className="p-4">Mobile Number {renderSortIcon()}</th>
                            <th className="p-4">View Document</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingUsers.length > 0 ? (
                            pendingUsers.map((user) => (
                                <tr key={user.id} className="text-center text-gray-800 hover:bg-gray-50 transition">
                                    <td className="p-4 border-b border-gray-200">{user.fullName}</td>
                                    <td className="p-4 border-b border-gray-200">{user.email}</td>
                                    <td className="p-4 border-b border-gray-200">{user.userName}</td>
                                    <td className="p-4 border-b border-gray-200">{user.organisation}</td>
                                    <td className="p-4 border-b border-gray-200">{user.designation}</td>
                                    <td className="p-4 border-b border-gray-200">{user.mobileNumber}</td>
                                    <td className="p-4 border-b border-gray-200">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => fetchDocument(user.id)}
                                            title="View Document"
                                        >
                                            <LuEye size={20} />
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-gray-200 flex justify-center gap-2 flex-wrap">
                                        <button
                                            className={`px-3 py-1 flex items-center justify-center rounded w-[110px] h-[35px] ${
                                                user.approved
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
                                            className={`px-3 py-1 flex items-center justify-center rounded w-[110px] h-[35px] ${
                                                user.rejected
                                                    ? "bg-red-500 text-white cursor-default"
                                                    : "bg-red-600 text-white hover:bg-red-700"
                                            }`}
                                            onClick={() => !user.rejected && handleReject(user.id)}
                                            disabled={loadingReject[user.id] || user.rejected || user.approved}
                                        >
                                            {loadingReject[user.id] ? (
                                                <>
                                                    <FaSpinner className="animate-spin text-white mb-1" size={18} />
                                                    <span className="text-xs">Rejecting...</span>
                                                </>
                                            ) : user.rejected ? (
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
                                <td colSpan="8" className="text-center text-gray-700 font-bold text-xl p-6">
                                    No unapproved users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            <div className="bg-purple-50 p-4 flex flex-col md:flex-row md:justify-between items-center rounded-b-md shadow gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-lg font-semibold text-gray-700">Show</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="p-2 border border-gray-300 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        {[10, 20, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <span className="text-lg font-semibold text-gray-700">entries</span>
                </div>

                <div className="text-lg font-semibold text-gray-700">
                    Showing {(currentPage * itemsPerPage) + 1}–{(currentPage + 1) * itemsPerPage}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            currentPage <= 0
                                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                        } transition`}
                    >
                        &lt;
                    </button>
                    <span className="bg-purple-500 text-white font-semibold px-3 py-1 rounded-full text-md shadow">
                        {currentPage + 1}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-3 py-1 rounded-full text-md font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 transition"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};
