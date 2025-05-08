import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiEdit3, FiFileText, FiList, FiType } from "react-icons/fi";

export const AddTrainingModal = ({ onClose, onSuccess, initialData = null, mode = 'add' }) => {
    const [formData, setFormData] = useState({
        name: "",
        trainingType: "",
        description: "",
        syllabus: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
    });


    
    const [minEndDateTime, setMinEndDateTime] = useState("");
    const token = localStorage.getItem("authToken");
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (initialData) {
            const start = new Date(initialData.startDateTime);
            const end = new Date(initialData.endDateTime);

            setFormData({
                name: initialData.name || "",
                trainingType: initialData.trainingType || "",
                description: initialData.description || "",
                syllabus: initialData.syllabus || "",
                startDate: start.toISOString().slice(0, 10),
                startTime: start.toTimeString().slice(0, 5),
                endDate: end.toISOString().slice(0, 10),
                endTime: end.toTimeString().slice(0, 5),
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const { name, trainingType, description, syllabus, startDate, startTime, endDate, endTime } = formData;
        const errorList = [];

        if (!name.trim()) errorList.push("Training name is required.");
        const normalizedTrainingType = trainingType?.trim().toUpperCase();
        if (!["VIRTUAL", "OFFLINE"].includes(normalizedTrainingType)) errorList.push("Invalid training type.");
        if (!description.trim()) errorList.push("Description is required.");
        if (!syllabus.trim()) errorList.push("Syllabus is required.");
        if (!startDate || !startTime) errorList.push("Start date and time are required.");
        if (!endDate || !endTime) errorList.push("End date and time are required.");

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const currentDate = new Date();
        currentDate.setSeconds(0, 0);

        // if (endDateTime <= startDateTime) errorList.push("End date/time must be after the start date/time.");
        // if (startDateTime < currentDate) errorList.push("Start date/time cannot be in the past.");

        if (errorList.length > 0) {
            errorList.forEach(error => toast.error(error));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            name: formData.name,
            trainingType: formData.trainingType,
            description: formData.description,
            syllabus: formData.syllabus,
            startDateTime: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
            endDateTime: new Date(`${formData.endDate}T${formData.endTime}`).toISOString(),
        };

        try {
            let response;
            if (mode === "edit") {
                response = await axios.put(`${BASE_URL}/admin/training/${initialData.id}/update`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log('updated Training Data:', response.data)
                toast.success("Training updated successfully!");
            }
            else if (mode === "clone") {
                response = await axios.post(`${BASE_URL}/admin/training/${initialData.id}/clone`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                toast.success("Training cloned successfully!");
            }
            else {
                response = await axios.post(`${BASE_URL}/admin/add/training`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log('Add training Data:', response.data)
                toast.success("Training added successfully!");
            }

            onSuccess(response.data);
            onClose();
        } catch (error) {
            toast.error(error.response?.data || `Error ${mode === "edit" ? "updating" : "adding"} training.`);
        }
    };

    useEffect(() => {
        if (formData.startDate && formData.startTime) {
            const minEnd = new Date(`${formData.startDate}T${formData.startTime}`);
            setMinEndDateTime(minEnd.toISOString().slice(0, 16));
        }
    }, [formData.startDate, formData.startTime]);

    // const InputWrapper = ({ label, icon, children }) => (
    //     <div>
    //         <label className=" font-semibold text-xl text-gray-700  flex items-center gap-2 mb-1">
    //             {icon}
    //             {label}
    //         </label>
    //         {children}
    //     </div>
    // );

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex flex-row gap-2 text-xl font-semibold text-gray-600">
                            <FiEdit3 size={20} />
                            <h1>Training Name</h1>
                        </div>
                        <input
                            label="Training Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            placeholder="Enter training name"
                            required
                        />
                    </div>
                    <div >
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiType size={20} />
                            <h1>Training Type</h1>
                        </div>
                        <select
                            label="Training Type"
                            value={formData.trainingType}
                            onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Virtual">Virtual</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <FiFileText size={20} />
                            <h1>Description</h1>
                        </div>
                        <textarea
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            rows={4}
                            placeholder="Describe the training"
                            required
                        />
                    </div>


                    <div >
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <h1>Syllabus</h1>
                            <FiList size={20} />
                        </div>
                        <textarea
                            label="Syllabus"
                            value={formData.syllabus}
                            onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            rows={4}
                            placeholder="List syllabus details"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <h1>Start Date</h1>
                            <FiCalendar size={20} />
                        </div>
                        <input
                            label="Start Date"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <h1>Start Time</h1>
                            <FiClock size={20} />
                        </div>
                        <input
                            label="Start Time"
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <h1>End Date</h1>
                            <FiCalendar size={20} />
                        </div>
                        <input
                            label="End Date"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            min={minEndDateTime.slice(0, 10)}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex flex-row text-xl font-semibold text-gray-600 gap-2">
                            <h1>End Time</h1>
                            <FiClock size={20} />
                        </div>
                        <input
                            label="End Time"
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            min={minEndDateTime.slice(11)}
                            className="w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
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
                        {mode === "edit" ? "Update Training" : mode === "clone" ? "Clone Training" : "Add Training"}
                    </button>
                </div>
            </form>

        </>
    );
};