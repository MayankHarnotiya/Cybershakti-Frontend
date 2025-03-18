import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const TeamPerformanceGraph = () => {
  const data = {
    labels: ["Winter", "Spring", "Summer", "Autumn"],
    datasets: [
      {
        label: "Dev Team",
        data: [15, 70, 30, 85, 40], // More fluctuation for wavy effect
        borderColor: "#6D28D9",
        backgroundColor: "rgba(109, 40, 217, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#6D28D9",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.5, // More smooth waves
        fill: true,
      },
      {
        label: "Design Team",
        data: [10, 50, 90, 20, 75], // More fluctuation
        borderColor: "#374151",
        backgroundColor: "rgba(55, 65, 81, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#374151",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.5, // Smooth waves
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Soft horizontal lines
        },
      },
    },
  };

  return (
    <div className="p-10 shadow-md rounded-xl w-full h-90 ">
      <h2 className="text-xl text-gray-600 font-bold font-[lexend] mb-2">Team Performance</h2>
      <div className="h-[250px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
