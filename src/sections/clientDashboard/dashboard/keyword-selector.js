import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";

const keywords = ["Sports", "Fashion", "Apparel", "Celebrities", "Athletes"];

const KeywordSelector = ({ selectedKeywords, setSelectedKeywords }) => {
  const handleKeywordClick = (word) => {
    setSelectedKeywords((prev) =>
      prev.includes(word) ? prev.filter((k) => k !== word) : [...prev, word]
    );
  };

  return (
    <Box sx={{ marginTop: 1, display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Typography variant="body1" sx={{ marginRight: 1, color: "#fff" }}>
        Keywords:
      </Typography>
      {keywords.map((word, index) => (
        <Chip
          key={index}
          label={word}
          onClick={() => handleKeywordClick(word)}
          sx={{
            marginRight: 1,
            marginBottom: 1,
            backgroundColor: selectedKeywords.includes(word) ? "#FFA500" : "#FFD700",
            color: "#fff",
          }}
        />
      ))}
    </Box>
  );
};

export default KeywordSelector;
