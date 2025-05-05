import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export const TrainTable = ({ data, onSortChange, currentSortField, currentSortOrder, currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  setCurrentPage,
  onItemsPerPageChange,
  onFilterChange,
  onEditTraining,
  onCloneTraining
}) => {


  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)


  const token = localStorage.getItem("authToken");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const [filteredData, setFilteredData] = useState([]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  // const [sortField, setSortField] = useState(0);
  // const [sortOrder, setSortOrder] = useState("asc");

  // useEffect(() => {
  //   applyDateFilter();
  // }, [data, startDate, endDate]);


  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // Handle the search term change and trigger the filter
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onFilterChange(event.target.value); // Update the parent component's filter state
  };


  const handleUpdateOpenModal = () => setIsUpdateModalOpen(true);
  const handleUpdateCloseModal = () => setIsUpdateModalOpen(false);

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setCurrentPage(1);
    onFilterChange({
      searchTerm: "",
      startDate: null,
      endDate: null,
    });
  };


  // const applyDateFilter = () => {
  //   const filtered = data?.content?.filter((item) => {
  //     const itemStart = new Date(item.startDateTime);
  //     const itemEnd = new Date(item.endDateTime);

  //     const isAfterStart = !startDate || itemStart >= startDate;
  //     const isBeforeEnd = !endDate || itemEnd <= endDate;

  //     return isAfterStart && isBeforeEnd;
  //   });

  //   setFilteredData(filtered);
  // };

  const handleSortClick = (field) => {
    let newOrder = "asc";
    if (currentSortField === field) {
      newOrder = currentSortOrder === "asc" ? "desc" : "asc";
    }
    onSortChange(field, newOrder);
  };


  const renderSortIcon = (field) => {
    if (currentSortField !== field) {
      return <i className="pi pi-sort-alt ml-2"></i>;
    }
    return currentSortOrder === "asc" ? (
      <i className="pi pi-sort-down ml-2"></i>
    ) : (
      <i className="pi pi-sort-up ml-2"></i>
    );
  };

  const getTrainingStatus = (item) => {
    const now = new Date();
    const start = new Date(item.startDateTime);
    const end = new Date(item.endDateTime);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "live";
    return "past";
  };

  const handleDelete = async (id) => {
    // console.log(token)
    try {
      const response=await axios.delete(`${BASE_URL}/admin/training/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      toast.success("Training deleted successfully!");
  
      onFilterChange({ searchTerm, startDate, endDate });
    } catch (error) {
      console.error("Delete failed:", error.response?.status, error.response?.data);
      toast.error(error.response?.data || "Failed to delete training. Please try again.");
    }
  };
  


  return (

    <>
       <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full h-full flex flex-col bg-gray-100">

        {/* Header */}
        <div className="w-full bg-purple-400 p-4 rounded-t-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Training List</h2>
          <div className="flex flex-col md:flex-row gap-5 items-center">


            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Start Date & Time"
              dateFormat="yy-mm-dd"
              showTime
              hourFormat="24"
              showIcon
            />

            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="End Date & Time"
              dateFormat="yy-mm-dd"
              showTime
              hourFormat="24"
              showIcon
            />

            <Button
              label="Filter"
              icon="pi pi-filter"
              onClick={() => {
                onFilterChange({
                  searchTerm,
                  startDate,
                  endDate,

                });
                console.log('startDate:', startDate, 'EndDate:', endDate, searchTerm)
              }}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onFilterChange({
                  searchTerm: e.target.value,
                  startDate,
                  endDate,
                });
              }}

              placeholder="Search"
              className="w-full"
            />
          </IconField>
        </div>

        {/* Table Section */}
        <div className="flex-grow h-full">
          <table className="w-full text-left table-auto bg-white">
            <thead className="bg-purple-300 sticky top-0 z-10">
              <tr className="text-center text-xl">
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("id")}
                >
                  ID {renderSortIcon("id")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("name")}
                >
                  Name {renderSortIcon("name")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("trainingType")}
                >
                  Type {renderSortIcon("trainingType")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("description")}
                >
                  Description {renderSortIcon("description")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("syllabus")}
                >
                  Syllabus {renderSortIcon("syllabus")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("startDateTime")}
                >
                  StartDate {renderSortIcon("startDateTime")}
                </th>
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() => handleSortClick("endDateTime")}
                >
                  EndDate {renderSortIcon("endDateTime")}
                </th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.content?.map((item) => (
                <tr key={item.id} className="border-t text-lg text-center">
                  <td className="p-6">{item.id}</td>
                  <td className="p-6">{item.name}</td>
                  <td className="p-6">{item.trainingType}</td>
                  <td className="p-6">
                    <button
                      onClick={() => {
                        setDialogTitle("Description");
                        setDialogContent(item.description);
                        setDialogVisible(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <i className="pi pi-eye cursor-pointer" style={{ fontSize: "1.4rem" }}></i>
                    </button>
                  </td>
                  <td className="p-6">
                    <button
                      onClick={() => {
                        setDialogTitle("Syllabus");
                        setDialogContent(item.syllabus);
                        setDialogVisible(true);
                      }}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      <i className="pi pi-eye" style={{ fontSize: "1.4rem" }}></i>
                    </button>
                  </td>
                  <td className="p-6">{dayjs(item.startDateTime).format("DD-MM-YYYY HH:mm")}</td>

                  <td className="p-6">{dayjs(item.endDateTime).format("DD-MM-YYYY HH:mm")}</td>

                  <td className="mt-7 flex items-center justify-center gap-3 flex-wrap">
                    {getTrainingStatus(item) === "upcoming" && (
                      <div className="relative group flex flex-col items-center">
                        <button onClick={() => onEditTraining(item)} className="bg-orange-500 cursor-pointer text-white px-2 py-1 rounded transition duration-200 hover:bg-orange-600">
                          <i className="pi pi-pencil"></i>
                        </button>
                        <span className="absolute bottom-[-1.8rem] w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
                          Update
                        </span>
                      </div>
                    )}

                    <div className="relative group flex flex-col items-center">
                      <button onClick={() => onCloneTraining(item)} className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded transition duration-200 hover:bg-blue-600">
                        <i className="pi pi-copy"></i>
                      </button>
                      <span className="absolute bottom-[-1.8rem] w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
                        Clone
                      </span>
                    </div>
                    <div className="relative group flex flex-col items-center">
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded transition duration-200 hover:bg-red-600">
                        <i className="pi pi-trash"></i>
                      </button>
                      <span className="absolute bottom-[-1.8rem] w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {pagination} */}


        <div className="bg-purple-50 p-4 flex flex-col md:flex-row md:justify-between items-center rounded-b-md shadow gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center gap-3">
            <label className="text-lg font-semibold text-gray-700">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="p-1 border border-gray-600 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              {[10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-lg font-semibold text-gray-700">entries</span>
          </div>

          {/* Pagination Info (Middle Text) */}
          <div className="text-lg font-semibold  text-gray-700">
            {data?.totalElements > 0 && (
              <>
                Showing{" "}
                {data?.content?.length > 0 ? currentPage * itemsPerPage + 1 : 0}
                –
                {Math.min((currentPage + 1) * itemsPerPage, data.totalElements)} of{" "}
                {data.totalElements} entries
              </>
            )}
          </div>


          {/* Pagination Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 0}
              className={`px-3 py-1 rounded-full text-sm font-medium ${currentPage <= 0 || totalPages === 0
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                } transition`}
            >
              &lt;
            </button>

            <span className="bg-purple-500 text-white font-semibold px-3 py-1 rounded-full text-md shadow">
              {currentPage + 1}
            </span>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className={`px-3 py-1 rounded-full text-md font-medium ${currentPage >= totalPages - 1 || totalPages === 0
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                } transition`}
            >
              &gt;
            </button>
          </div>

        </div>



        {/* //  Dialog Box */}
        <Dialog
          header={dialogTitle}
          visible={dialogVisible}
          style={{ width: "50vw" }}
          onHide={() => setDialogVisible(false)}
          modal
          dismissableMask
        >
          <div className="text-gray-800 whitespace-pre-wrap">{dialogContent}</div>
        </Dialog>
      </div></>
  );
};