import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";

const categoriesList = [
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Health",
  "Education",
]; // Example categories, you can replace this with dynamic data

const AddWidget = ({ onClose, onSaveWidget, existingWidget }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetDescription, setWidgetDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (existingWidget) {
      setWidgetName(existingWidget.name);
      setSelectedCategories(existingWidget.categories || []);
    } else {
      setWidgetName("");
      setSelectedCategories([]);
    }
  }, [existingWidget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!widgetName.trim() ||  selectedCategories.length === 0) return;

    onSaveWidget({
      id: existingWidget?.id || Date.now(),
      name: widgetName,
      categories: selectedCategories,
    });

    onClose(); // Close modal after saving
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Widget Name"
        variant="outlined"
        fullWidth
        required
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
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
        {existingWidget ? "Update Widget" : "Add Widget"}
      </Button>
    </Box>
  );
};

export default AddWidget;
