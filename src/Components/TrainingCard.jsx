export const TrainingCard = ({ title, startDate, endDate, description, isHighlighted,type,img }) => {
    return (
        <div
            className={`p-6 border rounded-lg text-center shadow-md  flex flex-col justify-between h-full
                ${type=== "offline" ? "bg-gradient-to-br from-blue-100 to-blue-400" : "bg-gradient-to-br from-blue-50 to-blue-500"}`}
        >
            <h3 className="text-2xl font-bold font-lexend text-center bg-gradient-to-br from-blue-400 to-blue-800 rounded-lg p-2">
                {title}
            </h3>
  
      
            <div className="flex items-center justify-between mt-5">
                <p className="text-xl">
                    <span className="text-2xl font-semibold underline underline-offset-3">Start:</span> {startDate}
                </p>
                <p className="text-xl">
                    <span className="text-2xl font-semibold underline underline-offset-3">End:</span> {endDate}
                </p>
            </div>

            {img && 
            <div  className="flex justify-center mt-5">
                
                <img src={img} alt={`${title} Training`} className="w-100 h-60 object-cover rounded-lg shadow-lg"/> 
                </div>}
  
            <div className="flex-grow flex items-center justify-center mt-5">
                <p className="text-xl text-blue-900 font-semibold">{description}</p>
            </div>
  
        
            <div className="flex justify-center mt-5">
                <button className="px-6 py-3 bg-blue-700 text-white rounded-lg cursor-pointer hover:bg-blue-800">
                    Register
                </button>
            </div>
        </div>
    );
  };
  