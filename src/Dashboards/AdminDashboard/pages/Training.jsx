import { useState } from "react"
import { TrainingTable } from "../Components/TrainingTable"

export const Training=()=>{
    const [liveTraining,setLiveTraining]=useState([])
    const [upcomingTraining,setUpcomingTraining]=useState([])
    const [pastTraining,setPastTraining]=useState([])
    const[loading,setLoading]=useState(false)

    const BASE_URL=import.meta.env.VITE_BASE_URL 
    return(
        <>
        <h1>ADD Training</h1>
         <TrainingTable/>
        </>
    )
}