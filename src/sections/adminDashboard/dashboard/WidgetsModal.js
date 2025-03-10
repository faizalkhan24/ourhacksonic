// WidgetsModal.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Switch, Button, Stack } from "@mui/material";

const WidgetsModal = ({ clientId, onClose, onAssignSuccess }) => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const assignedResponse = await fetch(`http://localhost:3001/api/allwidgets/${clientId}`);
        if (!assignedResponse.ok) {
          throw new Error("Failed to fetch assigned widgets");
        }
        const assignedData = await assignedResponse.json();
        const assignedWidgetIds = assignedData.map(w => w.ID || w.id);
  
        const allResponse = await fetch(`http://localhost:3001/api/allwidgets/widgets`);
        if (!allResponse.ok) {
          throw new Error("Failed to fetch all widgets");
        }
        const allWidgetsData = await allResponse.json();
  
        const allWidgets = allWidgetsData.map(widget => ({
          id: widget.ID || widget.id,
          name: widget.NAME || widget.name,
          enabled: assignedWidgetIds.includes(widget.ID || widget.id), 
        }));
  
        setWidgets(allWidgets);
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };
  
    fetchWidgets();
  }, [clientId]);
  
  const handleToggleWidget = (widgetId) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  const handleSave = async () => {
    // Get IDs of enabled widgets
    const selectedWidgetIds = widgets.filter(widget => widget.enabled).map(widget => widget.id);
    try {
      const response = await fetch(`http://localhost:3001/api/allwidgets/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clientId, widgetIds: selectedWidgetIds })
      });
      if (!response.ok) {
        throw new Error("Failed to assign widgets");
      }
      const result = await response.json();
      console.log("Assignment result:", result);
      if (onAssignSuccess) {
        onAssignSuccess(selectedWidgetIds);
      }
      onClose();
    } catch (error) {
      console.error("Error saving widget assignments:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Select Widgets
      </Typography>
      {widgets.map((widget) => (
        <Box
          key={widget.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            borderBottom: "1px solid #FFD700",
          }}
        >
          <Typography>{widget.name}</Typography>
          <Switch
            checked={widget.enabled}
            onChange={() => handleToggleWidget(widget.id)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#FFD700",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#FFD700",
              },
            }}
          />
        </Box>
      ))}

      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#FFD700",
            color: "#000",
            "&:hover": { backgroundColor: "#E6C300" },
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#FFD700",
            color: "#000",
            "&:hover": { backgroundColor: "#E6C300" },
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default WidgetsModal;
