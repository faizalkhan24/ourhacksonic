import React, { useState } from "react";
import AddWidget from "sections/adminDashboard/dashboard/AddWidget";
import DataTable from "components/table/DataTable";
import { Box, IconButton, Button, Dialog, DialogTitle, DialogContent,Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const WidgetPage = () => {
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Function to handle adding/updating a widget
  const saveWidget = (widget) => {
    if (editingWidget) {
      // Update widget
      setWidgets(
        widgets.map((w) => (w.id === editingWidget.id ? widget : w))
      );
      setEditingWidget(null);
    } else {
      // Add new widget
      setWidgets([...widgets, widget]);
    }
    setOpenModal(false);
  };

  // Function to delete a widget
  const deleteWidget = (id) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  // Function to set a widget for editing
  const editWidget = (widget) => {
    setEditingWidget(widget);
    setOpenModal(true);
  };

  // Table columns with actions
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Widget Name", flex: 1 },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {params.row.categories.map((category, index) => (
            <Chip key={index} label={category} sx={{ backgroundColor: "#FFD700", color: "#000" }} />
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => editWidget(params.row)} sx={{ color: "#FFD700" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteWidget(params.row.id)} sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", margin: "auto", textAlign: "left", paddingTop: "20px" }}>
      <h2 style={{ color: "#FFD700" }}>Manage Widgets</h2>

      <Button onClick={() => setOpenModal(true)} variant="contained" sx={{ backgroundColor: "#FFD700", color: "#000", marginBottom: 2 }}>
        Add Widget
      </Button>

      <DataTable columns={columns} rows={widgets} />

      {/* Modal for Adding/Editing Widget */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#000", color: "#FFD700" }}>
          {editingWidget ? "Edit Widget" : "Add Widget"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#000" }}>
          <AddWidget onClose={() => setOpenModal(false)} onSaveWidget={saveWidget} existingWidget={editingWidget} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WidgetPage;
