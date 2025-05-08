import { useState } from "react";
import { AttendanceModal } from "../Components/AttendanceModal";

export const Attendance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={`transition duration-300 ease-in-out ${isModalOpen ? "blur-sm" : ""}`}>
                <div className="flex items-center justify-center">
                    <button
                        onClick={openModal}
                        className="mt-10 mb-6 px-6 py-3 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xl font-semibold rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        +Upload Attendance
                    </button>
                </div>
            </div>


            {isModalOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AttendanceModal onClose={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
};
