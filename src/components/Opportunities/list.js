import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const List = ({ title, opportunities, noDataMessage, image }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      {/* Title with Yellow Left Bar */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
       
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
          {title}
        </Typography>
      </Box>

      {/* Scrollable container for opportunities */}
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#000",
          color: "#fff",
          height: "80vh", // Fixed height for scroll
          overflowY: "auto", // Enable vertical scrolling
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "#FFD700 #000", // Firefox
          "&::-webkit-scrollbar": {
            width: "8px", // Width of scrollbar
          },
          "&::-webkit-scrollbar-track": {
            background: "#fff", // Track color (black)
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#FFD700", // Thumb color (yellow)
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#FFC107", // Slightly different yellow on hover
          },
        }}
      >
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          {opportunities.length === 0 ? (
            <Typography variant="body1" sx={{ color: "#fff" }}>
              {noDataMessage || "No opportunities available at the moment."}
            </Typography>
          ) : (
            opportunities.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#000",
                    color: "#fff",
                    borderBottom: "2px solid #fff",
                    // padding: 1,
                    minHeight: "100px", // Min height for each card
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image || image}
                    sx={{
                      width: 120,
                      height: 120, // Set fixed height for square aspect
                      border: "2px solid #fff",
                      borderRadius: "8px",
                      // padding: 1,
                      marginRight: "16px",
                      objectFit: "cover", // Ensures the image covers the area
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.details}</Typography>
                    <Typography variant="body2" sx={{ color: "#FFD700" }}>
                      {item.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default List;
