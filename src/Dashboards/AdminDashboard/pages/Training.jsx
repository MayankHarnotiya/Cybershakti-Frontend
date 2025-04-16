import { useEffect, useState } from "react"
import { TrainingTable } from "../Components/TrainingTable"
import axios from "axios"
import { TrainTable } from "../Components/TrainTable"

export const Training = () => {
    const [liveTraining, setLiveTraining] = useState([])
    const [upcomingTraining, setUpcomingTraining] = useState([])
    const [pastTraining, setPastTraining] = useState([])

    const BASE_URL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem("authToken")

    
    const fetchLiveTraining = async () => {
        try {
            if (!token) {
                toast.error("Unauthorized.Please log in")
                
                return
            }
            const response = await axios.get(`${BASE_URL}/admin/training/live`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log("Live Training Data: ", response.data)
            setLiveTraining(response.data)
        } catch (error) {
            const message = error?.response?.data || "Failed to fetch live training data"
            // toast.error(message)
            console.error("Error Fetching Live Tarining Data:",message)
        }
    }

   const fetchUpcomingTraining=async ()=>{
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
        console.error("Error Fetching Upcoming Tarining Data:",message)
    }
   }

   const fetchPastTraining=async ()=>{
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
        console.error("Error Fetching past Tarining Data:",message)
    }
   }
    
    useEffect(()=>{
   fetchLiveTraining()
   fetchUpcomingTraining()
   fetchPastTraining()
    },[])
    return (
        <>
            <div>
                <h1 className="text-center font-bold text-4xl mt-10">LIVE TRAINING</h1>
                <div className="">
                    <TrainingTable data={liveTraining}/>
                    {/* <TrainTable data={liveTraining}/> */}
                </div>
            </div>
        </>
    )
}