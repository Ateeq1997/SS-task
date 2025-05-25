"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const initialData = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 22, city: "Chicago" },
  { id: 4, name: "David", age: 35, city: "Houston" },
];

const TableComponent = () => {
  const [data, setData] = useState(initialData);          //The list of rows (initially set to initialData)
  const [editRowId, setEditRowId] = useState(null);      // Tracks the row that is currently being edited.
  const [filters, setFilters] = useState({ id: "", name: "", age: "" });     // Keeps track of filter values for each column (ID, Name, Age).
  const [newRow, setNewRow] = useState({ id: "", name: "", age: "", city: "" });    //  Stores data for a new row that will be added to the table.

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle input changes for new row
  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  // Add new row
  const handleAddRow = () => {
    if (!newRow.id || !newRow.name || !newRow.age || !newRow.city) return;
    setData([...data, { ...newRow, id: Number(newRow.id), age: Number(newRow.age) }]);
    setNewRow({ id: "", name: "", age: "", city: "" });
  };

  // Delete a row
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  // Start editing
  const handleEdit = (id) => {
    setEditRowId(id);
  };

  // Save edited row
  const handleSave = (id, updatedRow) => {
    setData(data.map((row) => (row.id === id ? updatedRow : row)));
    setEditRowId(null);
  };

  // Filtered data
  const filteredData = data.filter((row) =>
    Object.keys(filters).every((key) =>
      filters[key] ? String(row[key]).toLowerCase().includes(filters[key].toLowerCase()) : true
    )
  );

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      {/* Filters */}
      <div style={{ padding: 16 }}>
        <TextField label="Filter ID" name="id" size="small" sx={{ m: 1 }} onChange={handleFilterChange} />
        <TextField label="Filter Name" name="name" size="small" sx={{ m: 1 }} onChange={handleFilterChange} />
        <TextField label="Filter Age" name="age" size="small" sx={{ m: 1 }} onChange={handleFilterChange} />
        {/* <TextField label="Filter City" name="city" size="small" sx={{ m: 1 }} onChange={handleFilterChange} /> */}
      </div>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
  {editRowId === row.id ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Button variant="contained" color="primary" size="small" onClick={() => handleSave(row.id, row)}>
        Save
      </Button>
      <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(row.id)}>
        Delete
      </Button>
    </div>
  ) : (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(row.id)}>
        Edit
      </Button>
      <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(row.id)}>
        Delete
      </Button>
    </div>
  )}
</TableCell>
              <TableCell>
                {editRowId === row.id ? (
                  <TextField size="small" defaultValue={row.id} onChange={(e) => (row.id = Number(e.target.value))} />
                ) : (
                  row.id
                )}
              </TableCell>
              <TableCell>
                {editRowId === row.id ? (
                  <TextField size="small" defaultValue={row.name} onChange={(e) => (row.name = e.target.value)} />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editRowId === row.id ? (
                  <TextField size="small" defaultValue={row.age} onChange={(e) => (row.age = Number(e.target.value))} />
                ) : (
                  row.age
                )}
              </TableCell>
              <TableCell>
                {editRowId === row.id ? (
                  <TextField size="small" defaultValue={row.city} onChange={(e) => (row.city = e.target.value)} />
                ) : (
                  row.city
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add New Row */}
      <div style={{ padding: 16 }}>
        <TextField label="ID" name="id" size="small" sx={{ m: 1 }} onChange={handleNewRowChange} value={newRow.id} />
        <TextField label="Name" name="name" size="small" sx={{ m: 1 }} onChange={handleNewRowChange} value={newRow.name} />
        <TextField label="Age" name="age" size="small" sx={{ m: 1 }} onChange={handleNewRowChange} value={newRow.age} />
        <TextField label="City" name="city" size="small" sx={{ m: 1 }} onChange={handleNewRowChange} value={newRow.city} />
        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={handleAddRow}>
          Add Row
        </Button>
      </div>
    </TableContainer>
  );
};

export default TableComponent;
