import React, { useState, useEffect } from "react";
import AddWidget from "sections/adminDashboard/dashboard/AddWidget";
import DataTable from "components/table/DataTable";
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const WidgetPage = () => {
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch widgets from the API when the component mounts
  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await fetch("http://4.227.190.93:3001/api/allwidgets/widgets");
        if (!response.ok) {
          throw new Error("Failed to fetch widgets");
        }
        const data = await response.json();
        // Transform uppercase keys to lowercase keys
        const transformedData = data.map(widget => ({
          id: widget.ID,
          name: widget.NAME,
        }));
        setWidgets(transformedData);
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };

    fetchWidgets();
  }, []);

  // Function to handle adding/updating a widget
  const saveWidget = (widget) => {
    if (editingWidget) {
      // Update widget
      setWidgets(widgets.map((w) => (w.id === editingWidget.id ? widget : w)));
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

  // Define table columns
  const columns = [
    { field: "name", headerName: "Widget Name", flex: 1 },
    // Uncomment and modify the code below to add actions or other columns as needed.
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton onClick={() => editWidget(params.row)} sx={{ color: "#FFD700" }}>
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton onClick={() => deleteWidget(params.row.id)} sx={{ color: "red" }}>
    //         <DeleteIcon />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        textAlign: "left",
        paddingTop: "20px",
      }}
    >
      <h2 style={{ color: "#FFD700" }}>Assign Widgets</h2>

      <DataTable columns={columns} rows={widgets} />

      {/* Modal for Adding/Editing Widget */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#000", color: "#FFD700" }}>
          {editingWidget ? "Edit Widget" : "Add Widget"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#000" }}>
          <AddWidget
            onClose={() => setOpenModal(false)}
            onSaveWidget={saveWidget}
            existingWidget={editingWidget}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WidgetPage;
