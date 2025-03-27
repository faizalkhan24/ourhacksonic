import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const TimelineDialog = ({ open, onClose, selectedArticle }) => {
  const defaultImageUrl = "/logo/notfound.png"; // Update this URL as needed

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Timeline</DialogTitle>
      <DialogContent>
        {selectedArticle &&
        selectedArticle.timeline &&
        Array.isArray(selectedArticle.timeline) &&
        selectedArticle.timeline.length > 0 ? (
          selectedArticle.timeline.map((event, idx) => (
            <Box key={idx} sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src={
                  event.IMAGE_LINK && event.IMAGE_LINK !== "#"
                    ? event.IMAGE_LINK
                    : defaultImageUrl
                }
                alt={event.TITLE}
                sx={{ width: 80, height: 80, objectFit: "cover", mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {event.TITLE}
                </Typography>
                <Typography variant="body2" color="gray">
                  {event.LABEL || "No LABEL"}
                </Typography>
                <Typography variant="body2" color="gray">
                  {event.CLASSIFICATION || ""}
                </Typography>
                <a
                  href={event.LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFD700" }}
                >
                  Read more
                </a>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No timeline data available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimelineDialog;
