import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddTrainingModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState(
        {
            name: "",
            trainingType: "",
            description: "",
            syllabus: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: ""
        }
    )

    const [minEndDateTime, setMinEndDateTime] = useState("")


    // const [errors, setErrors] = useState([])
    const token = localStorage.getItem("authToken")
    const BASE_URL = import.meta.env.VITE_BASE_URL



    const validateForm = () => {
        const { name, trainingType, description, syllabus, startDate, startTime, endDate, endTime } = formData;
        const errorList = [];
    
        if (!name.trim()) errorList.push("Training name is required.");
        const normalizedTrainingType = trainingType?.trim().toUpperCase(); // Normalize to uppercase and trim spaces
        if (!["VIRTUAL", "OFFLINE"].includes(normalizedTrainingType)) {
            errorList.push("Invalid training type.");
        }
        if (!description.trim()) errorList.push("Description is required.");
        if (!syllabus.trim()) errorList.push("Syllabus is required.");
        if (!startDate || !startTime) errorList.push("Start date and time are required.");
        if (!endDate || !endTime) errorList.push("End date and time are required.");
    
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const currentDate = new Date();
        currentDate.setSeconds(0, 0);
    
        if (endDateTime <= startDateTime) errorList.push("End date/time must be after the start date/time.");
        if (startDateTime < currentDate) errorList.push("Start date/time cannot be in the past.");
    
        // Show toasts
        if (errorList.length > 0) {
            errorList.forEach(error => toast.error(error));
            return false;
        }
    
        return true;
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Form Data Submitted:", formData)
        if (!validateForm()) return

        const payload = {
            name: formData.name,
            trainingType: formData.trainingType,
            description: formData.description,
            syllabus: formData.syllabus,
            startDateTime: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
  endDateTime: new Date(`${formData.endDate}T${formData.endTime}`).toISOString(),
        }
        console.log(payload)

        try {
            const response = await axios.post(`${BASE_URL}/admin/add/training`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            toast.success("Training added successfully!");
            onSuccess(response.data);
            onClose();

        } catch (error) {
            toast.error(error.response?.data || "Error adding training.");

        }
    }

    useEffect(() => {
        if (formData.startDate && formData.startTime) {
            const minEnd = new Date(`${formData.startDate}T${formData.startTime}`);
            setMinEndDateTime(minEnd.toISOString().slice(0, 16));
        }
    }, [formData.startDate, formData.startTime]);

    return (
        <>
            <div>
                <ToastContainer position="top-right" autoClose={3000} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium text-sm text-gray-700">Training Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter training name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-sm text-gray-700">Training Type</label>
                            <select
                                value={formData.trainingType}
                                onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-medium text-sm text-gray-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                rows={3}
                                placeholder="Describe the training"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-medium text-sm text-gray-700">Syllabus</label>
                            <textarea
                                value={formData.syllabus}
                                onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                rows={3}
                                placeholder="List syllabus details"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-sm text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-sm text-gray-700">Start Time</label>
                            <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-sm text-gray-700">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                min={minEndDateTime.slice(0, 10)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-sm text-gray-700">End Time</label>
                            <input
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                min={minEndDateTime.slice(11)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-semibold text-white bg-purple-700 rounded-md shadow-md hover:bg-purple-800 focus:outline-none"
                        >
                            Add Training
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}