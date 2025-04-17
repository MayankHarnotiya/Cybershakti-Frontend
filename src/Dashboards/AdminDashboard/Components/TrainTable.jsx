import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

export const TrainTable = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data
    ?.filter((item) => {
      const itemDate = new Date(item.startDateTime);
      return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    })
    .filter((item) => item.description?.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className=" w-full flex flex-col bg-gray-500">
      {/* Header */}
      <div className="w-full bg-purple-400 p-4 rounded-t-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-700">Training List</h2>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Calendar
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            placeholder="Start Date"
            dateFormat="yy-mm-dd"
            showIcon
          />
          <Calendar
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            placeholder="End Date"
            dateFormat="yy-mm-dd"
            showIcon
          />
          <Button
            label="Filter"
            icon="pi pi-filter"
            onClick={() => setCurrentPage(1)}
            className="p-button-sm p-button-success"
          />
          <Button
            label="Clear"
            icon="pi pi-times"
            onClick={handleClear}
            className="p-button-sm p-button-secondary"
          />
        </div>
        <IconField iconPosition="left" className="w-full md:w-72">
          <InputIcon className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search training..."
            className="w-full"
          />
        </IconField>
      </div>

      {/* Table Section */}
      <div className="flex-grow h-full overflow-auto">
        <table className="w-full  text-left table-auto bg-purple-200">
          <thead className="bg-purple-300 sticky top-0 z-10">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Description</th>
              <th className="p-2">Syllabus</th>
              <th className="p-2">Start DateTime</th>
              <th className="p-2">End DateTime</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.trainingType}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.syllabus}</td>
                <td className="p-2">{item.startDateTime}</td>
                <td className="p-2">{item.endDateTime}</td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button className="bg-orange-500 text-white px-2 py-1 rounded">Update</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Clone</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white p-4 flex justify-center items-center rounded-b-md shadow">
        <div className="flex items-center  gap-2">
          <label>Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-1 rounded"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2"
          >
            &lt;
          </button>
          <span className="bg-purple-200 rounded-full w-7 text-center h-6">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
