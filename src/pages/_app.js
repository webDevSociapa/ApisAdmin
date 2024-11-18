// App.js
import React, { useState } from "react";
import Sidebar from "../components/common/sidebar";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const handleMenuItemClick = async () => {
    setLoading(true); // Start loading
    // Simulate a delay to represent loading time, or replace this with your actual async action
    setTimeout(() => {
      setLoading(false); // Stop loading once content is ready
    }, 1000); // Replace with actual loading duration
  };

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <Sidebar onMenuItemClick={handleMenuItemClick} />
        <main style={{ flexGrow: 1, padding: "20px" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </div>
    </>
  );
}
