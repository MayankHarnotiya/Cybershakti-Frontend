import { useEffect, useState } from "react"
import { TrainTable } from "../Components/TrainTable"
import axios from "axios"
import { AddTrainingModal } from "../Components/AddTrainingModal";

export const Training = () => {

    const [modalMode, setModalMode] = useState("add");
    const [trainingToEdit, setTrainingToEdit] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [upcomingPage, setUpcomingPage] = useState(0)
    const [upcomingSortField, setUpcomingSortField] = useState('id')
    const [upcomingSortOrder, setUpcomingSortOrder] = useState('asc')
    const [upcomingTotalPages, setUpcomingTotalPages] = useState(0)


    const [pastPage, setPastPage] = useState(0);
    const [pastSortField, setPastSortField] = useState("id");
    const [pastSortOrder, setPastSortOrder] = useState("asc");
    const [pastTotalPages, setPastTotalPages] = useState(0);

    const [activeTab, setActiveTab] = useState("live");

    const [liveTraining, setLiveTraining] = useState([])
    const [upcomingTraining, setUpcomingTraining] = useState([])
    const [pastTraining, setPastTraining] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("authToken");

    const sortFieldMap = {
        id: 0,
        name: 1,
        trainingType: 2,
        description: 3,
        syllabus: 4,
        startDateTime: 5,
        endDateTime: 6,
    };

    const fetchLiveTraining = async (
        sortBy = sortField,
        direction = sortOrder,
        pageNo = page,
        pageSize = size,
        search = searchTerm,
        start = startDateTime,
        end = endDateTime
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/training/live`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    page: pageNo,
                    size: pageSize,
                    sortBy: sortFieldMap[sortBy] || 0,
                    direction: direction.toUpperCase(),
                    searchTerm: search,
                    startDateTime: start,
                    endDateTime: end
                },
            });

            setLiveTraining(response.data);
            setPage(response.data.pageable.pageNumber);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error Fetching Live Training Data:", error?.response?.data || error.message);
        }
    };

    const handleOpenAddModal = () => {
        setModalMode("add");
        setTrainingToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenCloneModal = (training) => {
        setModalMode("clone");
        setTrainingToEdit(training);
        setIsModalOpen(true);
    };
    
    const handleOpenEditModal = (training) => {
        setModalMode("edit");
        setTrainingToEdit(training);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTrainingToEdit(null);
    };


    const handleTrainingAdded = () => {
        handleCloseModal();
        fetchLiveTraining(); // Refresh live training data
    };

    const fetchUpcomingTraining = async (
        sortBy = upcomingSortField,
        direction = upcomingSortOrder,
        pageNo = upcomingPage,
        pageSize = size,
        search = searchTerm,
        start = startDateTime,
        end = endDateTime) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/training/upcoming`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    page: pageNo,
                    size: pageSize,
                    sortBy: sortFieldMap[sortBy] || 0,
                    direction: direction.toUpperCase(),
                    searchTerm: search,
                    startDateTime: start,
                    endDateTime: end
                }
            });
            setUpcomingTraining(response.data);
            setUpcomingPage(response.data.pageable.pageNumber);
            setUpcomingTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error Fetching Upcoming Training Data:", error?.response?.data || error.message);
        }
    };

    
    const fetchPastTraining = async (
        sortBy = pastSortField,
        direction = pastSortOrder,
        pageNo = pastPage,
        pageSize = size,
        search = searchTerm,
        start = startDateTime,
        end = endDateTime
    ) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/training/past`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    page: pageNo,
                    size: pageSize,
                    sortBy: sortFieldMap[sortBy] || 0,
                    direction: direction.toUpperCase(),
                    searchTerm: search,
                    startDateTime: start,
                    endDateTime: end
                }
            });

            setPastTraining(response.data);
            setPastPage(response.data.pageable.pageNumber);
            setPastTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error Fetching Past Training Data:", error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (activeTab === "live") fetchLiveTraining();
        if (activeTab === "upcoming") fetchUpcomingTraining();
        if (activeTab === "past") fetchPastTraining();
    }, [activeTab]);


    const handleSortChange = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        fetchLiveTraining(field, order);
    };

    const handleUpcomingSortChange = (field, order) => {
        setUpcomingSortField(field);
        setUpcomingSortOrder(order);
        fetchUpcomingTraining(field, order);
    };

    const handlePastSortChange = (field, order) => {
        setPastSortField(field);
        setPastSortOrder(order);
        fetchPastTraining(field, order);
    };

    const handleFilterChange = ({ searchTerm, startDate, endDate }) => {
        const updatedSearch = searchTerm?.trim() || "";
        const updatedStart = startDate ? new Date(startDate).toISOString() : "";
        const updatedEnd = endDate ? new Date(endDate).toISOString() : "";

        setSearchTerm(updatedSearch);
        setStartDateTime(updatedStart);
        setEndDateTime(updatedEnd);

        fetchLiveTraining(sortField, sortOrder, 0, size, updatedSearch, updatedStart, updatedEnd);
        setPage(0);
    };

    const handleUpcomingFilterChange = ({ searchTerm, startDate, endDate }) => {
        const updatedSearch = searchTerm?.trim() || "";
        const updatedStart = startDate ? new Date(startDate).toISOString() : "";
        const updatedEnd = endDate ? new Date(endDate).toISOString() : "";

        setSearchTerm(updatedSearch);
        setStartDateTime(updatedStart);
        setEndDateTime(updatedEnd);

        fetchUpcomingTraining(upcomingSortField, upcomingSortOrder, 0, size, updatedSearch, updatedStart, updatedEnd);
        setUpcomingPage(0);
    };

    const handlePastFilterChange = ({ searchTerm, startDate, endDate }) => {
        const updatedSearch = searchTerm?.trim() || "";
        const updatedStart = startDate ? new Date(startDate).toISOString() : "";
        const updatedEnd = endDate ? new Date(endDate).toISOString() : "";

        setSearchTerm(updatedSearch);
        setStartDateTime(updatedStart);
        setEndDateTime(updatedEnd);

        fetchPastTraining(pastSortField, pastSortOrder, 0, size, updatedSearch, updatedStart, updatedEnd);
        setPastPage(0);
    };

    const tabStyle = (tabName) =>
        `px-6 py-2 font-semibold cursor-pointer transition-all ${activeTab === tabName
            ? "bg-purple-800 text-white border-b-4 border-yellow-400"
            : "bg-purple-600 text-purple-100 hover:bg-purple-700"
        }`;

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen">
            <div className="flex items-center justify-center ">
                <button
                    onClick={handleOpenAddModal}
                    className="mt-10 mb-6 px-6 py-3 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xl font-semibold rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                    + Add Training
                </button>

            </div>
            {/* Tabs */}
            {/* Bubble Tabs - Top Left of Table */}
            <div className="flex justify-start mt-6 ml-5">
                <div className="flex -mb-4 bg-purple-200 rounded-full p-1 shadow-inner max-w-3xl w-full text-lg">
                    <button
                        onClick={() => setActiveTab("live")}
                        className={`flex-1 py-2 px-4 text-center font-bold cursor-pointer rounded-full transition-all duration-300 ${activeTab === "live"
                            ? "bg-purple-700 text-white shadow-md"
                            : "text-purple-700 hover:bg-purple-300"
                            }`}
                    >
                        LIVE TRAININGS
                    </button>

                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`flex-1 py-2 px-4 text-center font-bold rounded-full cursor-pointer transition-all duration-300 ${activeTab === "upcoming"
                            ? "bg-purple-700 text-white shadow-md"
                            : "text-purple-700 hover:bg-purple-300"
                            }`}
                    >

                        UPCOMING TRAININGS
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`flex-1 py-2 px-4 text-center font-bold cursor-pointer rounded-full transition-all duration-300 ${activeTab === "past"
                            ? "bg-purple-700 text-white shadow-md"
                            : "text-purple-700 hover:bg-purple-300"
                            }`}
                    >
                        PAST TRAININGS
                    </button>
                </div>
            </div>


            {/* Render Table based on tab */}
            <div className="flex-grow p-6">
                {activeTab === "live" && (
                    <TrainTable
                        data={liveTraining}
                        onSortChange={handleSortChange}
                        onCloneTraining={handleOpenCloneModal}

                        currentSortField={sortField}
                        currentSortOrder={sortOrder}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={size}
                        onEditTraining={handleOpenEditModal}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                            fetchLiveTraining(sortField, sortOrder, newPage, size);
                        }}
                        onItemsPerPageChange={(newSize) => {
                            setSize(newSize);
                            setPage(0);
                            fetchLiveTraining(sortField, sortOrder, 0, newSize);
                        }}
                        setCurrentPage={setCurrentPage}
                        onFilterChange={handleFilterChange}
                    />
                )}

                {activeTab === "upcoming" && (
                    <TrainTable data={upcomingTraining}
                        onSortChange={handleUpcomingSortChange}
                        onCloneTraining={handleOpenCloneModal}

                        currentSortField={upcomingSortField}
                        currentSortOrder={upcomingSortOrder}
                        currentPage={upcomingPage}
                        totalPages={upcomingTotalPages}
                        onEditTraining={handleOpenEditModal}
                        itemsPerPage={size}
                        onPageChange={(newPage) => {
                            setUpcomingPage(newPage);
                            fetchUpcomingTraining(upcomingSortField, upcomingSortOrder, newPage, size);
                        }}
                        onItemsPerPageChange={(newSize) => {
                            setSize(newSize);
                            setUpcomingPage(0);
                            fetchUpcomingTraining(upcomingSortField, upcomingSortOrder, 0, newSize);
                        }}
                        setCurrentPage={setUpcomingPage}
                        onFilterChange={handleUpcomingFilterChange}
                    />

                )}

                {activeTab === "past" && (
                    <TrainTable data={pastTraining}
                        onSortChange={handlePastSortChange}
                        onCloneTraining={handleOpenCloneModal}

                        currentSortField={pastSortField}
                        currentSortOrder={pastSortOrder}
                        currentPage={pastPage}
                        totalPages={pastTotalPages}
                        onEditTraining={handleOpenEditModal}
                        itemsPerPage={size}
                        onPageChange={(newPage) => {
                            setPastPage(newPage);
                            fetchPastTraining(pastSortField, pastSortOrder, newPage, size);
                        }}
                        onItemsPerPageChange={(newSize) => {
                            setSize(newSize);
                            setPastPage(0);
                            fetchPastTraining(pastSortField, pastSortOrder, 0, newSize);
                        }}
                        setCurrentPage={setPastPage}
                        onFilterChange={handlePastFilterChange}
                    />
                )}
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl px-12 py-10 w-full max-w-5xl mx-4 overflow-hidden max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
                            {modalMode === 'edit' && 'Update Training'}
                            {modalMode === 'add' && 'Add New Training'}
                            {modalMode === 'clone' && 'Clone Training'}
                        </h2>

                        <AddTrainingModal
                            mode={modalMode}
                            initialData={trainingToEdit}
                            onClose={handleCloseModal}
                            onSuccess={() => {
                                handleCloseModal();
                                if (activeTab === "live") fetchLiveTraining();
                                if (activeTab === "upcoming") fetchUpcomingTraining();
                                if (activeTab === "past") fetchPastTraining();
                            }}

                        />
                    </div>
                </div>
            )}

        </div>
    );
};
