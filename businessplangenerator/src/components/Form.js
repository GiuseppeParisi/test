
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const Form = ({ onSave }) => {
  const [formData, setFormData] = useState({

    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
   
    setFormData({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Titolo"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        name="description"
        label="Descrizione"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Salva
      </Button>
    </form>
  );
};

export default Form;
