import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "sections/adminDashboard/dashboard/AddCategory";
import DataTable from "components/table/DataTable";
import { Box, CircularProgress, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const apiUrl = process.env.REACT_APP_APIBASEURL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/industry/industries`)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          id: item.ID, 
        }));
        setCategories(formattedData);
      })
      .catch((error) => console.error("Error fetching industries:", error))
      .finally(() => setLoading(false)); // ✅ Stop loading when API call is complete
  }, []);

  const addCategory = (name) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, NAME: name } : cat
        )
      );
      setEditingCategory(null);
    } else {
      const newCategory = { id: categories.length + 1, NAME: name };
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const editCategory = (category) => {
    setEditingCategory(category);
  };

  const columns = [
    { field: "NAME", headerName: "Industry Name", flex: 1 },
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
    <Box sx={{ margin: "auto", textAlign: "left", paddingTop: "20px" }}>
      <Typography variant="h4" sx={{ color: "#FFD700", marginBottom: 2 }}>
        Manage Industry
      </Typography>
      <AddCategory onAddCategory={addCategory} editingCategory={editingCategory} />

      {/* ✅ Table Wrapper with Loader */}
      <Box sx={{ position: "relative", minHeight: "300px" }}>
        {loading && (
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              position: "absolute", 
              width: "100%", 
              height: "100%", 
              // backgroundColor: "rgba(255, 255, 255, 0.8)", 
              zIndex: 1 
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}
        <DataTable 
          columns={columns} 
          rows={categories} 
          getRowId={(row) => row.id} // Ensures ID is used as the row identifier
        />
      </Box>
    </Box>
  );
};

export default CategoryPage;
