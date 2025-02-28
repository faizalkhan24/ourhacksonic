import React, { useState } from "react";
import { Box, Typography, Switch, Button, Stack } from "@mui/material";

const WidgetsModal = ({ onClose, onAdd }) => {
  const [widgets, setWidgets] = useState([
    { id: 101, name: "OPPORTUNITIES", enabled: false },
    { id: 102, name: "STRATEGIES", enabled: true },
    { id: 103, name: "GEOPOLITICS", enabled: false },
    { id: 104, name: "CHALLENGES", enabled: false },
    { id: 105, name: "COMPETITION", enabled: false },
  ]);

  const handleToggleWidget = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
      )
    );
  };

  const handleAdd = () => {
    // You can process the selected widgets here
    const selectedWidgets = widgets.filter((widget) => widget.enabled);
    console.log("Selected Widgets:", selectedWidgets);

    if (onAdd) {
      onAdd(selectedWidgets); // Pass selected widgets to parent
    }
    onClose(); // Close the modal
  };

  return (
    <Box
      sx={{
        // width: "400px",
        padding: 3,
        // backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Select Widgets
      </Typography> */}

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

      {/* Buttons Section */}
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
          onClick={handleAdd}
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
