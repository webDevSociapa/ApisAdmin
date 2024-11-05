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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
  const HomeContent = [
    { name: "Headline" },
    { name: "Banner" },
    { name: "Change Banner Text" },
    { name: "Our Availability" },
    { name: "Life @Apis" },
  ];

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [newContent, setNewContent] = useState('');
  const [headingContent, setHeadingContent] = useState('');

  

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/HomePage/heading");
        // Assuming the API returns an object with a "headlineTop" field
        setHeadingContent(response.data.headingContent || "Default Headline"); // Use the default value if not provided
        console.log("Fetched Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddHeadline = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`/api/HomePage/heading`, { headingContent }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item.name);
    setOpen(true);
    setNewContent('');  // Clear newContent if you want a blank slate when opening the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setNewContent('');
  };

  const handleUpdate = () => {
    handleAddHeadline();
    console.log(`Updated ${currentItem}: ${newContent}`);
    // handleClose();
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
            mx:10,
            mt:4,
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
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
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
 {currentItem === "Our Availability" && (
            <Box>
              <Typography variant="subtitle1">Existing Logos:</Typography>
              {/* Render a list of existing logos (placeholder) */}
              <Box display="flex" gap={2} mt={2}>
                <img src="/logo1.png" alt="Logo 1" width={50} />
                <img src="/logo2.png" alt="Logo 2" width={50} />
                {/* Add more logos as needed */}
              </Box>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload New Logo
                <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
              </Button>
            </Box>
          )}

          {currentItem === "Life @Apis" && (
            <Box>
              <Typography variant="subtitle1">Current Video:</Typography>
              {/* Placeholder video component */}
              <Box mt={2}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/sample-video-id"
                  title="Current Life @Apis Video"
                  allowFullScreen
                ></iframe>
              </Box>
              <TextField
                fullWidth
                label="Paste new video link"
                variant="outlined"
                sx={{ mt: 2 }}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Box>
          )}
          {currentItem === "Change Banner Text" && (
           <Box>
             <TextField
            fullWidth
            label="Write your text here :"
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            defaultValue="Default Value"
            // value={newContent}
            // onChange={(e) => setNewContent(e.target.value)}
        />
           </Box>
          )}

          {currentItem === "Banner" && (
            <Box>
              <Typography variant="subtitle1">Current Banner:</Typography>
              {/* Placeholder banner image */}
              <Box mt={2}>
                <img src="/banner.png" alt="Current Banner" width="100%" />
              </Box>
              <Button variant="contained"  sx={{ background: "#9F7B49", color: "#fff" }} component="label">
                Change Banner
                <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
              </Button>
              <Box mt={2}>
                <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="show" control={<Radio />} label="show" />
        <FormControlLabel value="Hide" control={<Radio />} label="Hide" />
        
      </RadioGroup>
    </FormControl>
              </Box>
            </Box>
          )}
                  </DialogContent>
        <DialogActions>
          <Button  sx={{color:"#9F7B49"}} onClick={handleClose}>Cancel</Button>
          <Button sx={{ background: "#9F7B49", color: "#fff" }} onClick={handleUpdate} type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
