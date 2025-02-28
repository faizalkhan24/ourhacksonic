import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

const AddCategory = ({ onAddCategory, editingCategory }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) return;

    onAddCategory(category);
    setCategory(""); // Reset input
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        marginBottom: 2,
        backgroundColor: "#000",
        padding: 2,
        borderRadius: "5px",
      }}
    >
      <TextField
        label="Enter Industry"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        InputLabelProps={{ style: { color: "#FFD700" } }}
        sx={{
          backgroundColor: "#000",
          color: "#FFD700",
          "& .MuiOutlinedInput-root": {
            color: "#FFD700",
            borderColor: "#FFD700",
            "& fieldset": { borderColor: "#FFD700" },
            "&:hover fieldset": { borderColor: "#FFD700" },
          },
        }}
      />
      <Button type="submit" variant="contained" sx={{ backgroundColor: "#FFD700", color: "#000" }}>
        {editingCategory ? "Update" : "Add"}
      </Button>
    </Box>
  );
};

export default AddCategory;
