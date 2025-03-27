import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import List from "components/Opportunities/list"; // Adjust the import path as needed

const ArticleList = ({ articlesByAPI, onArticleClick }) => {
  return (
    <Grid container spacing={2}>
      {articlesByAPI
        .filter((group) => group.articles && group.articles.length > 0)
        .map((group, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#000",
                border: "1px solid #fff",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", gap: 2, mb: 2, color: "#fff" }}
              >
                <Box
                  sx={{
                    backgroundColor: "yellow",
                    width: "10px",
                    height: "24px",
                  }}
                />
                {`Articles for ${group.label} - ${group.classification}`}{" "}
                {group.arrow && (
                  <span style={{ color: group.color, fontSize: "18px" }}>
                    {group.arrow}
                  </span>
                )}
              </Typography>
              <List
                opportunities={group.articles}
                noDataMessage="No articles available."
                onItemClick={onArticleClick}
              />
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default ArticleList;
