import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Textarea from '@mui/joy/Textarea';

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

  const handleEditClick = (item) => {
    setCurrentItem(item.name);
    setOpen(true);
    setNewContent('');
  };

  const handleClose = () => {
    setOpen(false);
    setNewContent('');
  };

  const handleUpdate = () => {
    console.log(`Updated ${currentItem}: ${newContent}`);
    handleClose();
  };

  return (
    <div>
      {HomeContent.map((itm, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            px:2,
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
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit {currentItem}
        </DialogTitle>
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

          {currentItem === "Banner" && (
            <Box>
              <Typography variant="subtitle1">Current Banner:</Typography>
              {/* Placeholder banner image */}
              <Box mt={2}>
                <img src="/banner.png" alt="Current Banner" width="100%" />
              </Box>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Change Banner
                <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
              </Button>
              <Box mt={2}>
                <Typography variant="subtitle2">Status:</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("Show/Hide Banner")}
                >
                  Toggle Visibility
                </Button>
              </Box>
            </Box>
          )}

          {["Headline", "Change Banner Text"].includes(currentItem) && (
            <Textarea
              minRows={3}
              fullWidth
              placeholder={`Edit ${currentItem}`}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
