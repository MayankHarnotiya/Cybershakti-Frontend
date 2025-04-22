import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export const Calendar = ({ label, onChange }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    triggerChange(e.target.value, time);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    triggerChange(date, e.target.value);
  };

  const triggerChange = (d, t) => {
    if (d && t) {
      const dateTime = new Date(`${d}T${t}`);
      onChange(dateTime);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-1 border px-2 py-1 rounded-md bg-white shadow-sm">
          <FaCalendarAlt className="text-purple-500" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="outline-none"
          />
        </div>

        <div className="flex items-center gap-1 border px-2 py-1 rounded-md bg-white shadow-sm">
          <FaClock className="text-purple-500" />
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
