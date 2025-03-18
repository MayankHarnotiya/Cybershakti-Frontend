import { PerformanceMetrics } from "../Components/PerformanceMetrics";
import { TeamPerformanceGraph } from "../Components/TeamPerformanceGraph";
import { NeedReview } from "../Components/NeedReview";
import { Departments } from "../Components/Departments";

export const AdminHome = () => {
  return (
    <div>
      <div className="p-6">
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
      </div>
    </div>
  );
};
