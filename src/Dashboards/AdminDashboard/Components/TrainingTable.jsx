import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Calendar } from 'primereact/calendar';
import dayjs from 'dayjs';

export const TrainingTable = ({ data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }
    });

    useEffect(() => {
        const formatted = data.map(item => ({
            ...item,
            startDateTime: dayjs(item.startDateTime).format('YYYY-MM-DD HH:mm'),
            endDateTime: dayjs(item.endDateTime).format('YYYY-MM-DD HH:mm')
        }));
        setFilteredData(formatted);
        setLoading(false);
    }, [data]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters(prev => ({
            ...prev,
            global: { value, matchMode: 'contains' }
        }));
        setGlobalFilterValue(value);
    };

    const applyDateFilter = () => {
        if (!startDate || !endDate) return;

        const filtered = data.filter(item => {
            const itemStart = dayjs(item.startDateTime);
            return itemStart.isAfter(dayjs(startDate).startOf('day').subtract(1, 'second')) &&
                   itemStart.isBefore(dayjs(endDate).endOf('day').add(1, 'second'));
        }).map(item => ({
            ...item,
            startDateTime: dayjs(item.startDateTime).format('YYYY-MM-DD HH:mm'),
            endDateTime: dayjs(item.endDateTime).format('YYYY-MM-DD HH:mm')
        }));

        setFilteredData(filtered);
    };

    const clearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);

        const formatted = data.map(item => ({
            ...item,
            startDateTime: dayjs(item.startDateTime).format('YYYY-MM-DD HH:mm'),
            endDateTime: dayjs(item.endDateTime).format('YYYY-MM-DD HH:mm')
        }));
        setFilteredData(formatted);
    };

    const renderHeader = () => (
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
                <Button label="Filter" icon="pi pi-filter" onClick={applyDateFilter} className="p-button-sm p-button-success" />
                <Button label="Clear" icon="pi pi-times" onClick={clearDateFilter} className="p-button-sm p-button-secondary" />
            </div>
            <IconField iconPosition="left" className="w-full md:w-72">
                <InputIcon className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search training..."
                    className="w-full"
                />
            </IconField>
        </div>
    );

    const handleUpdate = (rowData) => alert(`Update training with ID: ${rowData.id}`);
    const handleClone = (rowData) => alert(`Clone training with ID: ${rowData.id}`);
    const handleDelete = (rowData) => {
        if (window.confirm(`Are you sure you want to delete training ID: ${rowData.id}?`)) {
            alert(`Deleted training with ID: ${rowData.id}`);
        }
    };

    const actionsBodyTemplate = (rowData) => (
        <div className="flex flex-nowrap gap-x-2">
            <Button label="Update" icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => handleUpdate(rowData)} />
            <Button label="Clone" icon="pi pi-copy" className="p-button-sm p-button-info" onClick={() => handleClone(rowData)} />
            <Button label="Delete" icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(rowData)} />
        </div>
    );

    const header = renderHeader();

    return (
        <div className="card shadow-lg rounded-lg overflow-hidden border border-gray-200 mt-6">
            {header}
            <DataTable
                value={filteredData}
                paginator rows={10} rowsPerPageOptions={[5, 10, 20, 50]}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={['id', 'trainingType', 'startDateTime', 'endDateTime']}
                emptyMessage="No trainings found."
                responsiveLayout="scroll"
                stripedRows
                rowClassName={() => ' !bg-purple-200 '}
            >
                <Column field="id" header="ID" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column field="trainingType" header="Type" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column field="description" header="Description" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column field="syllabus" header="Syllabus" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column field="startDateTime" header="Start DateTime" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column field="endDateTime" header="End DateTime" style={{ minWidth: '8rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
                <Column header="Actions" body={actionsBodyTemplate} style={{ minWidth: '18rem' }} headerClassName="!bg-purple-300 !text-gray-800" />
            </DataTable>
        </div>
    );
};
