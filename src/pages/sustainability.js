import { Button, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Sustainability = () => {
  const [sustainabilityData, setSustainabilityData] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [csrContent, setCsrContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch sustainability data
  const fetchSustainabilityData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/sustainBility");
      setSustainabilityData(response.data || []);
    } catch (err) {
      setError("Failed to fetch sustainability data.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    // if (currentItem === "Banner") {
      try {
        await axios.delete(`/api/sustainBility?id=${id}`); // Pass id as query parameter
        setSustainabilityData((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }

  // Handle adding sustainability data
  const handleAddData = async () => {
    if (!title.trim() || !videoUrl.trim() || !csrContent.trim()) {
      setError("Please fill in all fields before adding.");
      return;
    }
    setError("");
    try {
      const body = { title, videoUrl, csrContent };
      await axios.post("/api/sustainBility", body);
      setTitle("");
      setVideoUrl("");
      setCsrContent("");
      fetchSustainabilityData(); // Refresh data
    } catch (err) {
      setError("Failed to add sustainability data.");
    }
  };

  useEffect(() => {
    fetchSustainabilityData();
  }, []);

  return (
    <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
      <Typography variant="h4" gutterBottom>
        CSR - Sustainability
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Input for Title */}
      <TextField
        variant="outlined"
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Input for Video URL */}
      <TextField
        variant="outlined"
        label="Video URL"
        fullWidth
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Input for CSR Content */}
      <TextField
        variant="outlined"
        label="CSR Content"
        multiline
        rows={4}
        fullWidth
        value={csrContent}
        onChange={(e) => setCsrContent(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        sx={{ background: "#9F7B49" }}
        onClick={handleAddData}
      >
        Add Sustainability
      </Button>

      {/* Display fetched data */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Existing Sustainability Data:
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : sustainabilityData.length > 0 ? (
        sustainabilityData.map((item, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, background: "#fff" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.csrContent}
            </Typography>
            {item.videoUrl && (
              <iframe
                width="100%"
                height="315"
                src={item.videoUrl}
                title={`Sustainability Video ${index + 1}`}
                allowFullScreen
              ></iframe>
            )}
            <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                      sx={{ ml: 2,mt: 2, height: "40px", width: "40px" }}
                    >
                      Delete
                    </Button>
          </Paper>
        ))
      ) : (
        <Typography>No data available.</Typography>
      )}
    </Paper>
  );
};

export default Sustainability;
