import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import AddEmployeeForm from '../components/AddEmployeeForm.jsx';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching employees:", err);
        showSnackbar('Error fetching employees', 'error');
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await axios.post('/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      showSnackbar('Employee added successfully!', 'success');
    } catch (error) {
      console.error("Error adding employee:", error);
      showSnackbar('Error adding employee', 'error');
    }
  };

  const handleEditEmployee = (employee) => {
    const formattedBirthdate = employee.birthdate ? new Date(employee.birthdate).toISOString().slice(0, 10) : '';
    const employeeWithFormattedBirthdate = { ...employee, birthdate: formattedBirthdate };
    setIsEditing(true);
    setEmployeeToEdit(employeeWithFormattedBirthdate);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.put(`/api/employees/${updatedEmployee.employee_id}`, updatedEmployee);
      const updatedEmployees = employees.map(emp => emp.employee_id === updatedEmployee.employee_id ? response.data : emp);
      setEmployees(updatedEmployees);
      setIsEditing(false);
      setEmployeeToEdit(null); // Clear after update
      showSnackbar('Employee updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating employee:", error);
      showSnackbar('Error updating employee', 'error');
    }
  };

  const handleDeleteEmployee = async (employee_id) => {
    console.log("Deleting employee with ID (passed to function):", employee_id); // Check the ID passed to the function
    try {
      console.log("About to send DELETE request to:", `/api/employees/${employee_id}`); // Check the URL
      const response = await axios.delete(`/api/employees/${employee_id}`);
      console.log("DELETE request response:", response); // Check the full response
  
      if (response.status === 204) {
        setEmployees(employees.filter(emp => emp.employee_id !== employee_id));
        showSnackbar('Employee deleted successfully!', 'success');
      } else {
        console.error("Unexpected response status:", response.status);
        showSnackbar('Error deleting employee', 'error');
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      showSnackbar('Error deleting employee', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" gutterBottom>Employee Management</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#002147', color: '#f9f9f9' }}>
              <TableCell sx={{color: '#f9f9f9'}}>First Name</TableCell>
              <TableCell sx={{color: '#f9f9f9'}}>Last Name</TableCell>
              <TableCell sx={{color: '#f9f9f9'}}>Email</TableCell>
              <TableCell sx={{color: '#f9f9f9'}}>Birthdate</TableCell>
              <TableCell sx={{color: '#f9f9f9'}}>Salary</TableCell>
              <TableCell sx={{color: '#f9f9f9'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{new Date(employee.birthdate).toLocaleDateString()}</TableCell>
                <TableCell>${employee.salary}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEditEmployee(employee)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteEmployee(employee.employee_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>{isEditing ? "Edit Employee" : "Add New Employee"}</Typography>
        <AddEmployeeForm
          onSubmit={isEditing ? handleUpdateEmployee : handleAddEmployee} // Correct onSubmit
          employee={employeeToEdit}
          isEditing={isEditing}
          onCancel={() => { setIsEditing(false); setEmployeeToEdit(null); }}
        />
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeManagement;