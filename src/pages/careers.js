import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Careers = () => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [newContent, setNewContent] = useState('');
  const [apisLife, setApisLife] = useState([]);
  const [getApisLifeData, setGetApisLifeData] = useState([]);
  const [titleImage, setTitleImage] = useState(null);
  const [imageGroup, setImageGroup] = useState([]);
  const [type, setType] = useState('');
  const [jobDetails, setJobDetails] = useState({
    position: "",
    location: "",
    Terriexperience: "",
    experience: "",
    RelevantExperience: "",
    ctc: "",
    education: "",
    skills: "",
  });
  const handleEditClick = (item) => {
    setCurrentItem(item.name);
    setOpen(true);
    setNewContent('');
  };

  const handleClose = () => {
    setOpen(false);
    setNewContent('');
  };


  const handleAddJobClose = () => {
    setAddJobOpen(false);
    setJobDetails({
      position: "",
      location: "",
      Terriexperience: "",
      experience: "",
      RelevantExperience: "",
      ctc: "",
      education: "",
      skills: "",
    });
  };
  const fileUpload = (e) => {
    setTitleImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', currentItem); // Assuming title is the currentItem
      if (titleImage) {
        formData.append('titleImage', titleImage);
      }
      imageGroup.forEach((image) => {
        formData.append('imageGroup', image);
      });
      formData.append('type', type); // Set this if you have a value for type

      const response = await axios.put("/api/careers/apisLife", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Update successful!"); // Notify on success
      handleClose(); // Close the dialog after successful update
    } catch (error) {
      toast.error("Update failed!"); // Notify on error
      console.error(error);
    }
  };

  const handleAddJob = async () => {
    try {
      const response = await axios.post("/api/careers/jobOpening", jobDetails); // Example API endpoint
      toast.success("Job added successfully!");
      handleAddJobClose();
    } catch (error) {
      toast.error("Failed to add job!");
      console.error(error);
    }
  };

  const handleAddApisLife = async () => {
    try {
      const response = await axios.post("/api/careers/apisLife", jobDetails); // Example API endpoint
      toast.success("Job added successfully!");
      handleAddJobClose();
    } catch (error) {
      toast.error("Failed to add job!");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/careers/apisLife");
        setGetApisLifeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const careersDta = [
    { name: "Employee Awards" },
    { name: "Training & Sessions" },
    { name: "Engagements" },
    { name: "Celebrations" },
    { name: "Join Us" },
  ];

  return (
    <>
      {careersDta.map((itm, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            px: 2,
            borderRadius: "10px",
            fontFamily: "jost",
            fontWeight: "400",
            display: "flex",
            justifyContent: "space-between",
          }} style={{ Padding: "20px 60px" }}
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
          {["Employee Awards", "Engagements", "Training & Sessions", "Celebrations"].includes(currentItem) && (
            <>
              <Box sx={{ marginBottom: "10px" }}>
                <Typography variant="subtitle1">Current Data:</Typography>

                {getApisLifeData.map((item) => (
                  <Box key={item._id} sx={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <img src={item.titleImage} alt="Current Banner" width="100px" style={{ display: "block" }} />
                      <p>Change new Image Below</p>
                      <input type="file" onChange={(e) => fileUpload(e)} />
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {item.imageGroup.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery Image ${index + 1}`} width="100px" style={{ display: "block" }} />
                      ))}
                    </Box>
                    <input type="file" onChange={(e) => console.log(e.target.files)} />
                    <p>Add new Image Below</p>
                  </Box>
                ))}

                <Box mt={2}>
                  <input type="file" onChange={(e) => console.log(e.target.files)} />
                  <img src="/banner.png" alt="Current Banner" width="100%" />
                </Box>

                <Box sx={{ display: "flex", gap: "2" }}>
                  <input type="file" onChange={(e) => console.log(e.target.files)} />
                </Box>
              </Box>
             
            </>
          )}
          {currentItem === "Join Us" && (
            <DialogContent dividers>
              <>
                <TextField
                  fullWidth
                  label="Position"
                  value={jobDetails.position}
                  onChange={(e) => setJobDetails({ ...jobDetails, position: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={jobDetails.location}
                  onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label=" Territory Experience Required"
                  value={jobDetails.Terriexperience}
                  onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Experience Required"
                  value={jobDetails.experience}
                  onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Relevant  Experience Required"
                  value={jobDetails.RelevantExperience}
                  onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Offered CTC (LPA)"
                  value={jobDetails.ctc}
                  onChange={(e) => setJobDetails({ ...jobDetails, ctc: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Education Required	 "
                  value={jobDetails.education}
                  onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Skills Required"
                  value={jobDetails.skills}
                  onChange={(e) => setJobDetails({ ...jobDetails, skills: e.target.value })}
                  sx={{ mb: 2 }}
                />
                {/* <TextField
              fullWidth
              multiline
              rows={3}
              label="Skills Required"
              value={jobDetails.skills}
              onChange={(e) => setJobDetails({ ...jobDetails, skills: e.target.value })}
              sx={{ mb: 2 }}
            /> */}
              </>
              <Button variant="contained" onClick={handleAddJob}>
                ADD JOB
              </Button>
            </DialogContent>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </>
  );
};

export default Careers;