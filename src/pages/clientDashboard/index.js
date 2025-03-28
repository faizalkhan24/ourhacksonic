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
  const [searchResults, setSearchResults] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleCollapse = (sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setOpenTimeline(true);
  };

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

  const renderCollapsibleSection = (content, title, isTShirt = false, group = null) => {
    const sectionKey = isTShirt ? 'sports-tshirts' : `${group.label}-${group.classification}`;
    const isCollapsed = collapsedSections[sectionKey];

    return (
      <Paper
        sx={{
          padding: 2,
          backgroundColor: "#000",
          border: "1px solid #fff",
          overflowY: "auto",
          height: isCollapsed ? 50 : 700,
          transition: "height 0.3s ease",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            color: "#fff",
            cursor: "pointer",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => toggleCollapse(sectionKey)}
        >
          <div>
            {!isTShirt && group?.arrow && (
              <span style={{ color: group.color, fontSize: "18px" }}>
                {group.arrow}
              </span>
            )}
            {title}
          </div>
          <span>{isCollapsed ? "+" : "-"}</span>
        </Typography>
        
        {!isCollapsed && content}
      </Paper>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", padding: 4, overflowY: "auto" }}>
      {showSearchBar && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <SearchBar onResults={(data) => setSearchResults(data)} />
        </Box>
      )}

      <Grid container spacing={2}>
        {topRowLeft && (
          <Grid item xs={12} md={6}>
            {showTShirts ? (
              renderCollapsibleSection(
                <SportsTShirts />,
                "Sports T-Shirts",
                true
              )
            ) : (
              renderCollapsibleSection(
                <ArticleList articlesByAPI={[topRowLeft]} onArticleClick={handleArticleClick} />,
                topRowLeft.label || topRowLeft.classification,
                false,
                topRowLeft
              )
            )}
          </Grid>
        )}

        {topRowRight && (
          <Grid item xs={12} md={6}>
            {renderCollapsibleSection(
              <ArticleList articlesByAPI={[topRowRight]} onArticleClick={handleArticleClick} />,
              topRowRight.label || topRowRight.classification,
              false,
              topRowRight
            )}
          </Grid>
        )}
      </Grid>

      {remainingGroups.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {remainingGroups.map((group, index) => (
            <Grid item xs={12} md={6} key={index}>
              {renderCollapsibleSection(
                <ArticleList articlesByAPI={[group]} onArticleClick={handleArticleClick} />,
                group.label || group.classification,
                false,
                group
              )}
            </Grid>
          ))}
        </Grid>
      )}

      <ArticleTimelineModal
        open={openTimeline}
        onClose={() => setOpenTimeline(false)}
        selectedArticle={selectedArticle}
      />
    </Box>
  );
};

export default DynamicArticles;