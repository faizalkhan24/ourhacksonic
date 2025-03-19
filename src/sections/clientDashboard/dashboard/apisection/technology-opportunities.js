import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import List from "components/Opportunities/list";

const OpportunitiesList = ({ label }) => {
  const [opportunities, setOpportunities] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(` ${apiUrl}/opportunities?label=technology`);
        const data = response.data.classifications?.map((item) => ({
          title: item.prediction || "Unknown",
          details: `Confidence: ${(item.confidence * 100).toFixed(2)}%`,
          location: item.input || "Unknown Location",
          image: "/logo192.png", // Replace with dynamic image if needed
        })) || [];

        setOpportunities(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching opportunities.");
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [label]);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Loading opportunities...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <List
    title="Technology Opportunities"
    opportunities={opportunities}
    noDataMessage="No cybersecurity opportunities available at the moment."
  />
  );
};

export default OpportunitiesList;
