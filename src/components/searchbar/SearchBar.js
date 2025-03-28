// components/SearchBar.js
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const SearchBar = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://20.121.61.135:3001/classify?search=${encodeURIComponent(searchTerm)}`
      );
      // Map raw data to the article format expected by your ArticleList component
      const formattedResults = response.data.map((item) => ({
        title: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {item.TITLE || "No Title"}
          </a>
        ),
        location: item.LABEL || "No LABEL",
        classification: item.CLASSIFICATION || "Unclassified",
        industry: item.INDUSTRY || "Unknown Industry",
        date: item.DATE || "Unknown Date",
        image:
          item.IMAGE_LINK && item.IMAGE_LINK !== "#"
            ? item.IMAGE_LINK
            : "/logo/notfound.png",
        timeline: item.TIMELINE || [],
      }));
      onResults(formattedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    onResults(null); // Reset to default data in parent component
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        variant="outlined"
        placeholder="Search opportunities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ backgroundColor: "#000", mr: 10 }}
      />
      <Button variant="contained" onClick={handleSearch} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
      </Button>
      <Button variant="outlined" onClick={handleReset} disabled={loading} sx={{ ml: 2 }}>
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;
