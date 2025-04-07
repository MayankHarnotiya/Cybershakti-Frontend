import { useRef, useState } from "react";
import { TrainingCard } from "../Components/TrainingCard";
import { GrVirtualMachine } from "react-icons/gr";
import { FaHouseLaptop } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

export const Calendar = () => {
    const [selectedType, setSelectedType] = useState("offline");
    const [highlightedTitle, setHighlightedTitle] = useState(null);

    // const [expandedType, setExpandedType] = useState({ offline: false, virtual: false });

    const trainings = [
        {
            type: "offline",
            title: "Time Management",
            StartDate: "Jul-16-2025",
            EndDate: "Aug-1-2025",
            trainer: "John Doe",
            img:"https://img.lovepik.com/free-png/20210919/lovepik-time-management-png-image_400360202_wh1200.png",
            description: "Learn how to effectively prioritize tasks, set achievable goals, and manage distractions."
        },
        {
            type: "offline",
            title: "Software Proficiency",
            StartDate: "Aug-23-2025",
            EndDate: "Sep-23-2025",
            trainer: "Jane Smith",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXuBesmG8uG1K39QiXMaOgDNJoLM94_R-Jlg&s",
            description: "Enhance your technical skills by mastering essential software tools used in modern workplaces. "
        },
        {
            type: "offline",
            title: "Data Analytics",
            StartDate: "Sep-20-2025",
            EndDate: "Nov-20-2025",
            trainer: "Robert Johnson",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCSEm1qSmIMEr-0IJzmt_12VI2U_Os9OD3g&s",
            description: "Discover the power of data-driven decision-making."
        },
        {
            type: "offline",
            title: "Project Management",
            StartDate: "Oct-12-2025",
            EndDate: "Dec-12-2025",
            trainer: "Emily Davis",
            img:""
        },
        {
            type: "virtual",
            title: "Problem Solving",
            StartDate: "Jan-11-2025",
            EndDate: "Feb-11-2025",
            trainer: "Michael Brown",
            img:""
        },
        {
            type: "virtual",
            title: "Web Development",
            StartDate: "Feb-5-2025",
            EndDate: "Mar-5-2025",
            trainer: "Sarah Wilson",
            img:"",
            description: "Dive into the world of web development with a focus on front-end and back-end technologies."
        },
        {
            type: "virtual",
            title: "Leadership",
            StartDate: "Mar-21-2025",
            EndDate: "Apr-21-2025",
            trainer: "David Martinez",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sfllsg-x97OlYneSS2KGd06NAgbXN8W_qw&s",
            description: "Develop leadership qualities and effective communication strategies."
        },
        {
            type: "virtual",
            title: "Financial Management",
            StartDate: "Apr-17-2025",
            EndDate: "Jun-17-2025",
            trainer: "Laura Garcia",
            img:"",
            description: "Gain essential financial literacy skills, including budgeting, investment strategies, and risk management."
        }
    ]
    
    

    const displayedTrainings = trainings.filter((t)=>t.type===selectedType)

    const toggleCategory = (type) => {
        // setExpandedType((prev) => {
        //     const isCurrentlyExpanded = prev[type];
        //     return { offline: false, virtual: false, [type]: !isCurrentlyExpanded };
        // });

        setSelectedType(type);
        setIsActive(true)
        // setHighlightedTitle(null)
    };

    const cardRefs = useRef({})

    // const handleTraningClicked = (trainingTitle) => {
    //     setHighlightedTitle(trainingTitle)

    //     const cardRef = cardRefs.current[trainingTitle]

    //     if (cardRef) {
    //         setTimeout(() => {
    //             requestAnimationFrame(() => {
    //                 cardRef.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: "center",
    //                     inline: "center"
    //                 })
    //             })
    //         }, 100)
    //     }
    // }


    return (
        <div className="p-5 min-h-screen flex flex-col">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-lexend text-blue-900">Training Calendar</h2>
                <hr className="w-60 mx-auto border-t-2 border-gray-300 my-4" />
            </div>

            <div className="flex mt-5 flex-grow">
                {/* Left Section */}
                <div className={`w-1/3 p-5 rounded-md bg-gradient-to-r from-purple-600 to-purple-900 overflow-y-auto custom-scrollbar`}>
                    <h2 className="text-3xl text-white font-lexend  font-bold mb-4">Training Categories</h2>

                    {["offline", "virtual"].map((type) => (
                        <div key={type} className="relative">
                            <button
                                className={`w-full h-15 p-2 border cursor-pointer rounded-lg mb-2 font-lexend font-semibold ${selectedType===type ? "bg-gradient-to-r from-purple-400 to-purple-900" : "bg-purple-700"} text-2xl text-white flex items-center justify-between`}
                                onClick={() => toggleCategory(type)}
                            >
                                <div className="flex items-center gap-2">
                                    {type === "offline" ? <GrVirtualMachine className="size-8" /> : <FaHouseLaptop className="size-8" />}
                                    <span>{type === "offline" ? "Offline Training" : "Virtual Training"}</span>
                                </div>
                                {/* {expandedType[type] ? (
                                    <IoIosArrowDropupCircle className="size-8" />
                                ) : (
                                    <IoIosArrowDropdownCircle className="size-8" />
                                )} */}
                            </button>
                            {/* <ul
                                className={`pl-4 mt-2 overflow-hidden transition-all duration-500 ease-in-out 
                                         ${expandedType[type] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {trainings.filter((t) => t.type === type).map((training, index) => {

                                    const [month, day, year] = training.StartDate.split("-");
                                    const formattedStartDate = `${month}-${day},${year}`;

                                    return (
                                        <li
                                            key={index}
                                            className={`cursor-pointer text-white p-2 rounded-md mb-2 text-lg font-[poppins] ${highlightedTitle === training.title ? "bg-slate-400" : "hover:bg-gray-400"
                                                }`}
                                            onClick={() => handleTraningClicked(training.title)}
                                        >
                                            <div className="">
                                                <span className="font-bold">{training.title}</span>
                                                <br />
                                                <span className="text-sm text-gray-300">{formattedStartDate}</span>
                                                <br />
                                                <span className="text-sm font-semibold">Trainer: {training.trainer}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul> */}

                        </div>
                    ))}
                </div>

                {/* Right Section - Training Cards */}
                <div className="w-2/3 grid grid-cols-2 gap-4 p-5 bg-gray-100 rounded-md">
                    {displayedTrainings.map((training, index) => (
                        <div
                            ref={(el) => {
                                cardRefs.current[training.title] = el
                            }}
                            key={index}
                        >
                            <TrainingCard
                                key={index}
                                title={training.title}
                                startDate={training.StartDate}
                                endDate={training.EndDate}
                                type={training.type}
                                isHighlighted={training.title === highlightedTitle}
                                description={training.description}
                                img={training.img}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
