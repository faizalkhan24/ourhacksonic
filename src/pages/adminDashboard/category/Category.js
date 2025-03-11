import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "sections/adminDashboard/dashboard/AddCategory";
import DataTable from "components/table/DataTable";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://172.210.67.200:3000/api/industry/industries")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          id: item.ID, 
        }));
        setCategories(formattedData);
      })
      .catch((error) => console.error("Error fetching industries:", error));
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
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton onClick={() => editCategory(params.row)} sx={{ color: "#FFD700" }}>
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton onClick={() => deleteCategory(params.row.id)} sx={{ color: "red" }}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];

  return (
    <Box sx={{ margin: "auto", textAlign: "left", paddingTop: "20px" }}>
      <h2 style={{ color: "#FFD700" }}>Manage Industry</h2>
      {/* <AddCategory onAddCategory={addCategory} editingCategory={editingCategory} /> */}
      <DataTable 
        columns={columns} 
        rows={categories} 
        getRowId={(row) => row.id} // Ensures ID is used as the row identifier
      />
    </Box>
  );
};

export default CategoryPage;
