import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";

const categoriesList = [
  "Web Development",
  "Graphic Design",
  "SEO",
  "Marketing",
  "Consulting",
  "Content Writing",
]; // Example categories, replace with dynamic data if needed

const AddClient = ({ onClose, onSaveClient, existingClient }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (existingClient) {
      setClientName(existingClient.name);
      setClientEmail(existingClient.email);
      setSelectedCategories(existingClient.categories || []);
    } else {
      setClientName("");
      setClientEmail("");
      setSelectedCategories([]);
    }
  }, [existingClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || selectedCategories.length === 0) return;

    onSaveClient({
      id: existingClient?.id || Date.now(),
      name: clientName,
      email: clientEmail,
      categories: selectedCategories,
    });

    onClose(); // Close modal after saving
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Client Name"
        variant="outlined"
        fullWidth
        required
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        InputLabelProps={{ style: { color: "#FFD700" } }}
        sx={{ input: { color: "#FFD700" } }}
      />
      <TextField
        label="Client Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
        InputLabelProps={{ style: { color: "#FFD700" } }}
        sx={{ input: { color: "#FFD700" } }}
      />

      {/* Multi-Select Dropdown for Categories */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: "#FFD700" }}>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          sx={{
            color: "#FFD700",
            backgroundColor: "#000",
            "& .MuiSelect-icon": { color: "#FFD700" },
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ backgroundColor: "#FFD700", color: "#000" }} />
              ))}
            </Box>
          )}
        >
          {categoriesList.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" sx={{ backgroundColor: "#FFD700", color: "#000" }}>
        {existingClient ? "Update Client" : "Add Client"}
      </Button>
    </Box>
  );
};

export default AddClient;
