import { Button, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const SustainBility = () => {
  const [sustainBiltyData, setSustainBiltyData] = useState("");
  const [addNewsLink, setAddNewsLink] = useState("");
  const [addDescription, setAddDescription] = useState("");

  // Handle adding sustainability data
  const handleAddData = async () => {
    try {
      const body = { addDescription, addNewsLink }; // Prepare data to send
      const response = await axios.post("/api/sustainBility", body);
      console.log("Response:", response.data);

      // Clear input fields on success
      setAddNewsLink("");
      setAddDescription("");

      // Optionally refetch data to update the UI
      fetchSustainBilty();
    } catch (error) {
      console.error("Error while adding data:", error);
    }
  };

  // Fetch sustainability data
  const fetchSustainBilty = async () => {
    try {
      const response = await axios.get("/api/sustainBility");
      console.log("Fetched Data:", response.data);
      setSustainBiltyData(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSustainBilty();
  }, []);

  return (
    <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
      <Typography variant="h4" gutterBottom>
        CSR - Sustainability
      </Typography>

      {/* Input for News Link */}
      <TextField
        variant="outlined"
        label="Add News Link"
        value={addNewsLink}
        onChange={(e) => setAddNewsLink(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                sx={{ background: "#9F7B49" }}
                onClick={handleAddData}
              >
                Add
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2, mb: 2, width: "100%" }}
      />

      {/* Input for Description */}
      <TextField
        id="outlined-multiline-static"
        label="Add Description"
        multiline
        rows={4}
        fullWidth
        value={addDescription}
        onChange={(e) => setAddDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" sx={{ background: "#9F7B49" }} onClick={handleAddData}>
        Add Sustainability
      </Button>

      {/* Display fetched data */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Existing Sustainability Data:
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
        {sustainBiltyData || "No data available."}
      </Typography>
    </Paper>
  );
};

export default SustainBility;
