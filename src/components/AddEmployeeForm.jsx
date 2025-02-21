import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddEmployeeForm = ({ onSubmit, employee, isEditing, onCancel }) => {
  const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    birthdate: '',
    salary: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditing && employee) {
      setFormData(employee);
    } else {
      setFormData(initialFormData);
    }
  }, [employee, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) { // Check isEditing HERE!
      onSubmit(formData); // Call onSubmit (which will be handleUpdateEmployee)
    } else {
        onSubmit(formData); // Call onSubmit (which will be handleAddEmployee)
    }

    if (!isEditing) { // Clear the form only when ADDING
      setFormData(initialFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          type="text"
          name="firstName"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          type="text"
          name="lastName"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          type="date"
          name="birthdate"
          label="Birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="number"
          name="salary"
          label="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          {isEditing ? "Update Employee" : "Add Employee"}
        </Button>
        {isEditing && (
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ mt: 2, color: "error.main" }}
          >
            Cancel
          </Button>
        )}
      </Box>
    </form>
  );
};

export default AddEmployeeForm;