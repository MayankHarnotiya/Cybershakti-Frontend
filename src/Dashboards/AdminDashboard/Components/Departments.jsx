import { FaPaintBrush, FaChartBar, FaSearch } from "react-icons/fa";

export const Departments = () => {
  return (
    <div className="p-6  rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 font-[lexend]">Departments</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* UI Designers */}
        <div className="p-4 bg-purple-100 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Visual</p> {/* Subheading */}
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-purple-200 rounded-lg">
                <FaPaintBrush className="text-purple-600" />
              </span>
              <span className="font-medium text-gray-800 text-lg">UI Designers</span>
            </div>
            <span className="text-gray-600 bg-purple-300 rounded-2xl flex items-center w-8 p-1 h-8 text-sm font-semibold">+23</span>
          </div>
        </div>

        {/* Sales */}
        <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Accounting</p> {/* Subheading */}
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-yellow-200 rounded-lg">
                <FaChartBar className="text-yellow-600" />
              </span>
              <span className="font-medium text-gray-800 text-lg">Sales</span>
            </div>
            <span className="text-gray-600 bg-yellow-300 rounded-2xl flex items-center w-8 p-1 h-8 text-sm font-semibold">+12</span>
          </div>
        </div>

        {/* SEO */}
        <div className="p-4 bg-gray-300 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Content</p> {/* Subheading */}
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-gray-200 rounded-lg">
                <FaSearch className="text-gray-600" />
              </span>
              <span className="font-medium text-gray-800 text-lg">SEO</span>
            </div>
            <span className="text-gray-600 bg-gray-400 rounded-2xl flex items-center w-8 p-1 h-8 text-sm font-semibold">+7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
