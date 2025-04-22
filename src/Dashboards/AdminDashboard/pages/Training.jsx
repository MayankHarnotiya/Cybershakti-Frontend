import { useEffect, useState } from "react"
import { TrainingTable } from "../Components/TrainingTable"
import axios from "axios"
import { TrainTable } from "../Components/TrainTable"

export const Training = () => {
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
    // const [currentPage, setCurrentPage] = useState(0);


    const BASE_URL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem("authToken")

    const sortFieldMap = {
        id: 0,
        name: 1,
        trainingType: 2,
        description: 3,
        syllabus: 4,
        startDateTime: 5,
        endDateTime: 6,
    };



    const fetchLiveTraining = async (sortBy = sortField, direction = sortOrder, pageNo = page, pageSize = size,   search = searchTerm,
        start = startDateTime,
        end = endDateTime) => {
        try {
            if (!token) {
                toast.error("Unauthorized. Please log in");
                return;
            }

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
                    searchTerm:search,
                    startDateTime:start,
                    endDateTime:end
                },
            });

            console.log("Live Training Data: ", response.data);
            setLiveTraining(response.data);
            setPage(response.data.pageable.pageNumber);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            const message =
                error?.response?.data || "Failed to fetch live training data";
            console.error("Error Fetching Live Training Data:", message);
        }
    };


    const fetchUpcomingTraining = async () => {
        try {
            if (!token) {
                toast.error("Unauthorized.Please log in")
                return
            }
            const response = await axios.get(`${BASE_URL}/admin/training/upcoming`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log("Upcoming Training Data: ", response.data)
            setUpcomingTraining(response.data)
        } catch (error) {
            const message = error?.response?.data || "Failed to fetch upcoming training data"
            console.error("Error Fetching Upcoming Tarining Data:", message)
        }
    }

    const fetchPastTraining = async () => {
        try {
            if (!token) {
                toast.error("Unauthorized.Please log in")
                return
            }
            const response = await axios.get(`${BASE_URL}/admin/training/past`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log("Past Training Data: ", response.data)
            setPastTraining(response.data)
        } catch (error) {
            const message = error?.response?.data || "Failed to fetch past training data"
            console.error("Error Fetching past Tarining Data:", message)
        }
    }

    useEffect(() => {
        fetchLiveTraining()
        fetchUpcomingTraining()
        fetchPastTraining()
    }, [])

    const handleSortChange = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        fetchLiveTraining(field, order);
    };



 const handleFilterChange = ({ searchTerm, startDate, endDate }) => {
    console.log('StartDate',startDate)
    console.log('endDate',endDate)
    const updatedSearch = searchTerm?.trim() || "";
    const updatedStart = startDate ? new Date(startDate).toISOString() : "";
    const updatedEnd = endDate ? new Date(endDate).toISOString() : "";

    // Update state
    setSearchTerm(updatedSearch);
    setStartDateTime(updatedStart);
    setEndDateTime(updatedEnd);
    setPage(0);

    // Trigger API call immediately after
    fetchLiveTraining(sortField, sortOrder, 0, size, updatedSearch, updatedStart, updatedEnd);
};

    
    
    


    return (
        <>
            <div className=" flex flex-col bg-gray-100">
                <h1 className="text-center font-bold text-4xl mt-10 mb-4 text-purple-800">LIVE TRAINING</h1>
                <div className="flex-grow">
                    <TrainTable data={liveTraining}
                        onSortChange={handleSortChange}
                        currentSortField={sortField}
                        currentSortOrder={sortOrder}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={size}
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
                </div>
            </div>
        </>
    )
}