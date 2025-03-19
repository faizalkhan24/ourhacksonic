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
  Typography,
  CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const WidgetPage = () => {
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const apiUrl = process.env.REACT_APP_APIBASEURL;

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/allwidgets/widgets`);
        if (!response.ok) {
          throw new Error("Failed to fetch widgets");
        }
        const data = await response.json();
        const transformedData = data.map((widget) => ({
          id: widget.ID,
          name: widget.NAME,
        }));
        setWidgets(transformedData);
      } catch (error) {
        console.error("Error fetching widgets:", error);
      } finally {
        setLoading(false); // ✅ Stop loading when API call is complete
      }
    };

    fetchWidgets();
  }, []);

  const saveWidget = (widget) => {
    if (editingWidget) {
      setWidgets(widgets.map((w) => (w.id === editingWidget.id ? widget : w)));
      setEditingWidget(null);
    } else {
      setWidgets([...widgets, widget]);
    }
    setOpenModal(false);
  };

  const deleteWidget = (id) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const editWidget = (widget) => {
    setEditingWidget(widget);
    setOpenModal(true);
  };

  const columns = [{ field: "name", headerName: "Widget Name", flex: 1 }];

  return (
    <Box sx={{ width: "100%", margin: "auto", textAlign: "left", paddingTop: "20px" }}>
      <Typography variant="h4" sx={{ color: "#FFD700", marginBottom: 2 }}>
        Assign Widgets
      </Typography>

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
        {!loading && <DataTable columns={columns} rows={widgets} />}
      </Box>

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
