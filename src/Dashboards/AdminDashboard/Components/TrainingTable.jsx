import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export const TrainingTable = ({ data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        trainingType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        startDateTime: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        endDateTime: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFilteredData(data);
        setLoading(false);
    }, [data]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={filteredData}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={['id', 'trainingType', 'startDateTime', 'endDateTime']}
                header={header}
                emptyMessage="No trainings found."
                responsiveLayout="scroll"
            >
                <Column field="id" header="ID" filter filterPlaceholder="Search by ID" style={{ minWidth: '10rem' }} />
                <Column field="trainingType" header="Training Type" filter filterPlaceholder="Search by Type" style={{ minWidth: '12rem' }} />
                <Column field="description" header="Description" style={{ minWidth: '14rem' }} />
                <Column field="syllabus" header="Syllabus" style={{ minWidth: '14rem' }} />
                <Column field="startDateTime" header="Start DateTime" filter filterPlaceholder="Search by Start Date" style={{ minWidth: '12rem' }} />
                <Column field="endDateTime" header="End DateTime" filter filterPlaceholder="Search by End Date" style={{ minWidth: '12rem' }} />
            </DataTable>
        </div>
    );
};
