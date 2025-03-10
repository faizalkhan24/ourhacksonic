import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import List from "components/Opportunities/list";

const TransportationOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(" http://localhost:3001/opportunities", {
          params: { label: "transportation" },
        });

        const data = response.data.classifications?.map((item) => ({
          title: item.prediction || "Unknown",
          details: `Confidence: ${(item.confidence * 100).toFixed(2)}%`,
          location: item.input || "Unknown Location",
          image: "/logo192.png", // You can replace this with a dynamic image URL if needed
        })) || [];

        setOpportunities(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching transportation opportunities.");
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Loading Transportation Opportunities...
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
    title="Transportation Opportunities"
    opportunities={opportunities}
    noDataMessage="No cybersecurity opportunities available at the moment."
  />
  );
};

export default TransportationOpportunities;
