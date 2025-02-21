import { useState } from "react";
import AddCategory from "sections/adminDashboard/dashboard/AddCategory";
import DataTable from "components/table/DataTable";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Function to add or update a category
  const addCategory = (name) => {
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name } : cat
        )
      );
      setEditingCategory(null);
    } else {
      // Add new category
      const newCategory = { id: categories.length + 1, name };
      setCategories([...categories, newCategory]);
    }
  };

  // Function to delete a category
  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Function to set a category for editing
  const editCategory = (category) => {
    setEditingCategory(category);
  };

  // Define table columns with actions
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Category Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => editCategory(params.row)} sx={{ color: "#FFD700" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteCategory(params.row.id)} sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{  margin: "auto", textAlign: "center", paddingTop: "20px" }}>
      <h2 style={{ color: "#FFD700" }}>Manage Categories</h2>
      <AddCategory onAddCategory={addCategory} editingCategory={editingCategory} />
      <DataTable columns={columns} rows={categories} />
    </Box>
  );
};

export default CategoryPage;
