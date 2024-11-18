import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

axios.defaults.baseURL = "http://localhost:3000";

const Home = () => {
  const HomeContent = [
    { name: "Headline" },
    { name: "Banner" },
    { name: "Change Banner Text" },
    { name: "Our Availability" },
    { name: "Life @Apis" },
  ];

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [headingContent, setHeadingContent] = useState("");
  const [bannerVideos, setBannerVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [hideShow, setHideShow] = useState(true);
  const [bannerText, setBannerText] = useState("");
  const [availability, setAvailability] = useState([]);
  const [lifeAtApis, setLifeAtApis] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headingResponse = await axios.get("/api/HomePage/heading");
        setHeadingContent(headingResponse.data[0].headingContent || "Default Headline");

        const availabilityResponse = await axios.get("/api/HomePage/ourAvailability");
        setAvailability(availabilityResponse.data || []);

        const bannerResponse = await axios.get("/api/HomePage/banner");
        setBannerVideos(bannerResponse.data);
        if (bannerResponse.data.length > 0) {
          setSelectedVideo(bannerResponse.data[0].videoFile);
        }

        const bannerTextResponse = await axios.get("/api/HomePage/bannerText");
        setBannerText(bannerTextResponse.data[0].bannerText || "");

        const lifeAtApisResponse = await axios.get("/api/HomePage/LifeAtApis");
        setLifeAtApis(lifeAtApisResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleVideoChange = (e) => setSelectedVideo(e.target.value);
  const handleNewVideoChange = (e) => setNewVideoFile(e.target.files[0]);
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // Set base64 image for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBannerVideo = async () => {
    try {
      if (currentItem === "Banner") {
        if (newVideoFile) {
          const formData = new FormData();
          formData.append("videoFile", newVideoFile);
          const response = await axios.post("/api/HomePage/banner", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setBannerVideos((prev) => [...prev, response.data]);
        } else if (selectedVideo) {
          await axios.put("/api/HomePage/banner", { videoFile: selectedVideo, hideShow });
        }
      } else if (currentItem === "Headline") {
        await axios.put("/api/HomePage/heading", { headingContent });
      } else if (currentItem === "Change Banner Text") {
        await axios.put("/api/HomePage/bannerText", { bannerText });
      } else if (currentItem === "Life @Apis") {
        const formData = new FormData();
        formData.append("videoUrl",videoUrl);
        formData.append("id", id);
        if(thumbnail){
          formData.append("thumbnail",event.target.files[0]);

        }
        await axios.put("/api/HomePage/LifeAtApis", formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewVideoFile(null);
    setSelectedVideo(bannerVideos.length > 0 ? bannerVideos[0].videoFile : "");
    setHideShow(true);
  };

  return (
    <Box>
      {HomeContent.map((itm, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            mx: 10,
            mt: 4,
            borderRadius: "10px",
            fontFamily: "jost",
            fontWeight: "400",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{itm.name}</span>
          <span
            className="underline cursor-pointer"
            onClick={() => handleEditClick(itm)}
          >
            Edit
          </span>
        </Box>
      ))}

      {/* Modal for Editing Content */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Edit {currentItem}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {currentItem === "Banner" && (
            <Box>
              <Typography variant="subtitle1">Current Banner Video:</Typography>
              <Box mt={2}>
                <video width="100%" controls>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>

              <Typography variant="subtitle1" mt={2}>
                Select Banner Video:
              </Typography>
              <RadioGroup value={selectedVideo} onChange={handleVideoChange}>
                {bannerVideos.map((video) => (
                  <Box key={video._id} sx={{ mt: 1 }}>
                    <FormControlLabel
                      value={video.videoFile}
                      control={<Radio />}
                      label={video.videoFile.split("/").pop()}
                    />
                    <RadioGroup
                      value={video.hideShow ? "show" : "hide"}
                      onChange={(e) =>
                        setBannerVideos((prev) =>
                          prev.map((v) =>
                            v._id === video._id
                              ? { ...v, hideShow: e.target.value === "show" }
                              : v
                          )
                        )
                      }
                      sx={{ display: "flex", flexDirection: "row", ml: 4 }}
                    >
                      <FormControlLabel value="show" control={<Radio />} label="Show" />
                      <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                    </RadioGroup>
                  </Box>
                ))}
              </RadioGroup>

              <input
                type="file"
                accept="video/*"
                onChange={handleNewVideoChange}
                style={{ marginTop: "16px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateBannerVideo}
                sx={{ mt: 2 }}
              >
                Upload New Video
              </Button>
            </Box>
          )}
          {currentItem === "Headline" && (
            <TextField
              id="outlined-multiline-static"
              label="Change Headline"
              multiline
              rows={4}
              fullWidth
              onChange={(e) => setHeadingContent(e.target.value)}
              value={headingContent}
            />
          )}

          {currentItem === "Life @Apis" && (
            <Box>
              <Typography variant="subtitle1">Current Video:</Typography>
              {lifeAtApis.map((itm, index) => (
                <Box mt={2} key={index}>
                  <iframe
                    width="100%"
                    height="315"
                    src={itm.videoUrl}
                    title="Current Life @Apis Video"
                    allowFullScreen
                  ></iframe>

                  <TextField
                    fullWidth
                    label="Paste new video link"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />

                  {/* Thumbnail Upload Section */}
                  <Box mt={2}>
                    <Typography variant="subtitle1">Upload Thumbnail:</Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                    {thumbnail && (
                      <Box sx={{ mt: 2 }}>
                        <img
                          src={thumbnail}
                          alt="Thumbnail Preview"
                          width="150"
                          height="150"
                          style={{ borderRadius: "8px" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {currentItem === "Change Banner Text" && (
            <TextField
              label="Change Banner Text"
              multiline
              rows={4}
              fullWidth
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateBannerVideo}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
