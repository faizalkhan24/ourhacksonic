import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import List from "components/Opportunities/list"; // Assuming this component exists

const TechOpportunityArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/classify`, {
          params: { label: "tech", classification: "OPPORTUNITY" },
        });

        // Remove duplicates using a Set based on the LINK property
        const uniqueArticles = Array.from(
          new Map(response.data.map((item) => [item.LINK, item])).values()
        );

        const data = uniqueArticles.map((item) => ({
          title: (
            <a
              href={item.LINK || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
            >
              {item.TITLE || "No Title"}
            </a>
          ),
          location: item.LABEL || "Opportunity",
          date: item.DATE || "Unknown Date",
          image: item.IMAGE_LINK || "/logo/notfound.png", // Default image if null || "/placeholder-image.png", // Default image if null
        }));

        setArticles(data);
      } catch (error) {
        setError("Error fetching tech opportunity articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6">Loading Tech Opportunity Articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "16px", backgroundColor: "#000", color: "#fff" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <List
      title="Tech Opportunity Articles"
      opportunities={articles}
      noDataMessage="No tech opportunity articles available at the moment."
    />
  );
};

export default TechOpportunityArticles;
