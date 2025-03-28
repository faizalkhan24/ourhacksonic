// pages/DynamicArticles.js
import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Loader from "components/Loader/Loader";
import ArticleTimelineModal from "components/timeline/ArticleTimelineModal";
import useArticleFetcher from "hooks/useFetchArticles";
import SportsTShirts from "sections/clientDashboard/dashboard/SportsTShirts";
import ArticleList from "components/timeline/ArticleList";
import SearchBar from "components/searchbar/SearchBar";

const DynamicArticles = () => {
  const { articlesByAPI, loading, error } = useArticleFetcher();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openTimeline, setOpenTimeline] = useState(false);
  // Holds search results from SearchBar
  const [searchResults, setSearchResults] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setOpenTimeline(true);
  };

  // Merge search results into the SPORT - OPPORTUNITY group if available
  const mergedArticles = searchResults
    ? articlesByAPI.map((group) => {
        if (
          group.label === "SPORT" &&
          group.classification.toUpperCase() === "OPPORTUNITY"
        ) {
          return { ...group, articles: searchResults };
        }
        return group;
      })
    : articlesByAPI;

  if (loading) return <Loader />;
  if (error)
    return (
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );

  // Check client parameters for "SPORT" label and "OPPORTUNITY" classification
  let showTShirts = false;
  let showSearchBar = false;
  const clientParamsStr = localStorage.getItem("clientParams");
  if (clientParamsStr) {
    try {
      const clientParams = JSON.parse(clientParamsStr);
      if (clientParams.label && Array.isArray(clientParams.label)) {
        if (clientParams.label.includes("SPORT")) {
          showTShirts = true;
        }
      }
      if (clientParams.classifications && Array.isArray(clientParams.classifications)) {
        if (clientParams.classifications.includes("OPPORTUNITY")) {
          showSearchBar = true;
        }
      }
    } catch (e) {
      console.error("Error parsing clientParams:", e);
    }
  }

  // Use the mergedArticles instead of articlesByAPI
  const validGroups = mergedArticles.filter(
    (group) => group.articles && group.articles.length > 0
  );

  let topRowLeft = null;
  let topRowRight = null;
  let remainingGroups = [];

  if (showTShirts) {
    topRowLeft = <SportsTShirts />;
    topRowRight = validGroups.length > 0 ? validGroups[0] : null;
    remainingGroups = validGroups.slice(1);
  } else {
    topRowLeft = validGroups.length > 0 ? validGroups[0] : null;
    topRowRight = validGroups.length > 1 ? validGroups[1] : null;
    remainingGroups = validGroups.slice(2);
  }

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", padding: 4, overflowY: "auto" }}>
      {/* Conditionally render the SearchBar */}
      {showSearchBar && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <SearchBar onResults={(data) => setSearchResults(data)} />
        </Box>
      )}

      {/* Top Row */}
      <Grid container spacing={2}>
        {topRowLeft && (
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#000",
                border: "1px solid #fff",
                overflowY: "auto",
                height: 700,
              }}
            >
              {showTShirts ? (
                <>{topRowLeft}</>
              ) : (
                <>
                  <Typography variant="h6" sx={{ display: "flex", gap: 2, mb: 2, color: "#fff" }}>
                    {topRowLeft.arrow && (
                      <span style={{ color: topRowLeft.color, fontSize: "18px" }}>
                        {topRowLeft.arrow}
                      </span>
                    )}
                  </Typography>
                  <ArticleList articlesByAPI={[topRowLeft]} onArticleClick={handleArticleClick} />
                </>
              )}
            </Paper>
          </Grid>
        )}
        {topRowRight && (
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#000",
                border: "1px solid #fff",
                overflowY: "auto",
                height: 700,
              }}
            >
              <Typography variant="h6" sx={{ display: "flex", gap: 2, mb: 2, color: "#fff" }}>
                {topRowRight.arrow && (
                  <span style={{ color: topRowRight.color, fontSize: "18px" }}>
                    {topRowRight.arrow}
                  </span>
                )}
              </Typography>
              <ArticleList articlesByAPI={[topRowRight]} onArticleClick={handleArticleClick} />
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Remaining Article Groups in a Two-Column Layout */}
      {remainingGroups.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {remainingGroups.map((group, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                sx={{
                  padding: 2,
                  height: 700,
                  backgroundColor: "#000",
                  border: "1px solid #fff",
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6" sx={{ display: "flex", gap: 2, mb: 2, color: "#fff" }}>
                  {group.arrow && (
                    <span style={{ color: group.color, fontSize: "18px" }}>
                      {group.arrow}
                    </span>
                  )}
                </Typography>
                <ArticleList articlesByAPI={[group]} onArticleClick={handleArticleClick} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Timeline Modal for Articles */}
      <ArticleTimelineModal
        open={openTimeline}
        onClose={() => setOpenTimeline(false)}
        selectedArticle={selectedArticle}
      />
    </Box>
  );
};

export default DynamicArticles;
