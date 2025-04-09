import { PerformanceMetrics } from "../Components/PerformanceMetrics";
import { TeamPerformanceGraph } from "../Components/TeamPerformanceGraph";
import { NeedReview } from "../Components/NeedReview";
import { Departments } from "../Components/Departments";

export const AdminHome = () => {
  return (
    <div className="">
      {/* <div className="p-6">
        <PerformanceMetrics/>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 p-3">
          <TeamPerformanceGraph />
        </div>
        <div className="p-4">
          <NeedReview/>
        </div>
      </div>

      <div className="rounded-xl">
        <Departments />
      </div> */}
      <div className="bg-gradient-to-br from-[#1E0B39] via-[#7B1FA2] to-[#D4145A] w-full h-50 flex items-center justify-center">
        <h1 className="text-center text-white text-5xl font-semibold font-lexend">ADMIN DASHBOARD</h1>
      </div>
    </div>
  );
};
