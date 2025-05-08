import { useState } from "react";
import { FiCalendar, FiClock, FiUpload, FiType, FiEdit3 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AttendanceModal = ({ onClose, onUpload }) => {
    const [formData, setFormData] = useState({
        trainingType: "",
        trainingName: "",
        startDateTime: "",
        endDateTime: "",
        file: null,
    });



    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            toast.error("Please upload a valid Excel file (.xlsx)");
            return;
        }
        setFormData({ ...formData, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.trainingType || !formData.trainingName || !formData.file) {
            toast.error("Please fill all required fields and upload a file.");
            return;
        }

        const form = new FormData();
        form.append("attendance", formData.file);

        try {
            const response = await axios.post(
                `${BASE_URL}/admin/training/${formData.trainingName}/attendance/upload`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            toast.success(response.data || "Attendance uploaded successfully!");
            onClose();
        } catch (err) {
            const errorMessage = err.response?.data || "Something went wrong.";
            toast.error(`Upload failed: ${errorMessage}`);
        }
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <form onSubmit={handleSubmit} className="space-y-10 p-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
                <h1 className="text-center text-3xl font-bold text-purple-700 ">UPLOAD ATTENDANCE</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiType size={20} />
                            <h1>Training Type</h1>
                        </div>
                        <select
                            value={formData.trainingType}
                            onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-md focus:ring-purple-600 focus:border-purple-600"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Virtual">Virtual</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiEdit3 size={20} />
                            <h1>Training Name</h1>
                        </div>
                        <select
                            value={formData.trainingName}
                            onChange={(e) => setFormData({ ...formData, trainingName: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-md focus:ring-purple-600 focus:border-purple-600"
                            required
                        >
                            <option value="">Select Training</option>
                            {/* Populate dynamically based on trainingType */}
                        </select>
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiCalendar size={20} />
                            <h1>Start DateTime</h1>
                        </div>
                        <input
                            type="datetime-local"
                            value={formData.startDateTime}
                            onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-md focus:ring-purple-600 focus:border-purple-600"
                            disabled
                        />
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiClock size={20} />
                            <h1>End DateTime</h1>
                        </div>
                        <input
                            type="datetime-local"
                            value={formData.endDateTime}
                            onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-md focus:ring-purple-600 focus:border-purple-600"
                            disabled
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2 mb-1">
                            <FiUpload size={20} />
                            <h1>Upload Attendance (Excel)</h1>
                        </div>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-base font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 text-base font-medium text-white bg-purple-700 rounded-lg shadow-md hover:bg-purple-800"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </>
    );
};
