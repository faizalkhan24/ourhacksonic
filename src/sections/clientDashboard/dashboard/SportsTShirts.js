import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Loader from "components/Loader/Loader"; // adjust the import path as needed

const defaultImage = "/logo/notfound.png"; // Replace with your default image URL if needed

const SportsTShirts = () => {
  const [products, setProducts] = useState([]);
  const [opportunityText, setOpportunityText] = useState("");
  const [loadingTshirts, setLoadingTshirts] = useState(true);
  const [errorTshirts, setErrorTshirts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const tshirtApiUrl = "http://20.121.61.135:3001/sports/tshirts";

  useEffect(() => {
    const clientParams = localStorage.getItem("clientParams");
    if (clientParams) {
      try {
        const params = JSON.parse(clientParams);
        if (
          params.label &&
          Array.isArray(params.label) &&
          params.label.includes("SPORT")
        ) {
          axios
            .get(tshirtApiUrl)
            .then((response) => {
              // Assuming API returns an object with "products" and "oppurtinuty"
              setProducts(response.data.products);
              setOpportunityText(response.data.oppurtinuty || "");
              setLoadingTshirts(false);
            })
            .catch((err) => {
              console.error("Error fetching t-shirts data:", err);
              setErrorTshirts("Error fetching t-shirts data.");
              setLoadingTshirts(false);
            });
        } else {
          setLoadingTshirts(false);
          setProducts([]);
        }
      } catch (e) {
        console.error("Error parsing clientParams:", e);
        setLoadingTshirts(false);
        setProducts([]);
      }
    } else {
      setLoadingTshirts(false);
      setProducts([]);
    }
  }, []);

  if (loadingTshirts) return <Loader />;
  if (errorTshirts)
    return (
      <Box
        sx={{
          p: 4,
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">{errorTshirts}</Typography>
      </Box>
    );
  if (products.length === 0) return null;

  // Transform products into opportunities format
  const opportunities = products.map((product) => ({
    title: product.title,
    details: `${product.brand} - ${product.price}`,
    location:
      product.rating !== "No Rating"
        ? `Rating: ${product.rating} (${product.reviews} reviews)`
        : product.rating,
    image: product.image || defaultImage,
  }));

  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor: "#000",
        border: "1px solid #fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#fff", mb: 3, display: "flex", alignItems: "center" }}
      >
        <Box sx={{ backgroundColor: "yellow", width: 10, height: 24, mr: 1 }} />
        Available Sports T‑Shirts
      </Typography>

      {/* Opportunity Text */}
      {opportunityText && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{ color: "#fff", whiteSpace: "pre-line" }}
          >
            {opportunityText}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} key={product.id}>
            <Card
              variant="outlined"
              // onClick={() => {
              //   setSelectedProduct(product);
              //   setOpenDialog(true);
              // }}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: 2,
                transition: "box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                backgroundColor: "#121212",
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  {product.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#ccc", mb: 1 }}>
                  {product.brand}
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff", mb: 1 }}>
                  {product.price}
                </Typography>
                <Typography variant="body2" sx={{ color: "#FFD700" }}>
                  {product.rating !== "No Rating"
                    ? `Rating: ${product.rating} (${product.reviews} reviews)`
                    : product.rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ backgroundColor: "#121212", color: "#fff" }}>
          {selectedProduct?.title}
        </DialogTitle>
        <DialogContent
          sx={{ backgroundColor: "#121212", color: "#fff" }}
          dividers
        >
          <Typography variant="subtitle1">
            <strong>Brand:</strong> {selectedProduct?.brand}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> {selectedProduct?.price}
          </Typography>
          <Typography variant="body2">
            <strong>Rating:</strong> {selectedProduct?.rating}
          </Typography>
          <Typography variant="body2">
            <strong>Reviews:</strong> {selectedProduct?.reviews}
          </Typography>
          <Typography variant="body2">
            <strong>Seller:</strong> {selectedProduct?.seller}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#121212" }}>
          <Button onClick={() => setSelectedProduct(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SportsTShirts;
