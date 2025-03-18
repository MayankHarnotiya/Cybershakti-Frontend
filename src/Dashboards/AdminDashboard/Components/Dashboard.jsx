import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="p-6 space-y-2 flex-1 overflow-auto custom-scrollbar">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};
