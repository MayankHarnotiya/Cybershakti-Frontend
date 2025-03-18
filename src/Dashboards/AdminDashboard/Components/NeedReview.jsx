import { FaUserCircle } from "react-icons/fa";

export const NeedReview = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Need Review</h2>
        <span className="text-blue-600 cursor-pointer">See all</span>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <div>
            <p className="font-medium">Wade Warren</p>
            <span className="text-sm text-gray-500">Marketing coordinator</span>
          </div>
        </li>
        <li className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <div>
            <p className="font-medium">Jakob Jones</p>
            <span className="text-sm text-gray-500">Web designer</span>
          </div>
        </li>
        <li className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <div>
            <p className="font-medium">Leslie Wonderwid</p>
            <span className="text-sm text-gray-500">PM manager</span>
          </div>
        </li>
      </ul>
    </div>
  );
};