import React, { useEffect, useState } from "react";
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
    TextareaAutosize,
    Card,
    Grid,
    InputAdornment,
    Radio,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Paper,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


const AboutData = () => {
    const AboutData = [
        { name: "Banner" },
        { name: "Apis Data In Numbers" },
        { name: "ourValues" },
        { name: "Our Directors Info" },
        { name: "Our Milestones" },
    ]

    const CardsData = [
        { title: "product Ranges", numbers: "232+" },
        { title: "Years of legacy", numbers: "232+" },
        { title: "new Customer", numbers: "133+" },
        { title: "number of outlets", numbers: "100+" },
    ]

    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const [newContent, setNewContent] = useState('');
    const [aboutBanner, setAboutBanner] = useState(null)
    const [editBanner, setEditBanner] = useState([])
    const [bannerImage, setBannerImage] = useState(null)
    const [showHide, setShowHide] = useState(true)
    const [apisNumbers, setApisNumbers] = useState([])
    const [updatedValues, setUpdatedValues] = useState({});
    const [visionContent, setVisionContent] = useState('');
    const [missionContent, setMissionContent] = useState('');
    const [valuesContent, setValuesContent] = useState('');
    const [ourValues,setOurValues] = useState([])
    const [ourDirectors, setOurDirectors] = useState([])
    const [currentItemId, setCurrentItemId] = useState(null); // Store the ID of the item being edited
    const [personDetails, setPersonDetails] = useState([]);
  const [loading, setLoading] = useState(false);

    // const [apisNumbersEdit, setApisNumbersEdit] = useState([
    //     { count: 2580, title: "Product Ranges", key: "productRanges" },
    //     { count: 580, title: "Years Of Legacy", key: "yearsOfLegacy" },
    //     { count: 285, title: "New Customer", key: "newCustomers" },
    //     { count: 6580, title: "Number Of Outlets", key: "numberOfOutlets" }
    // ]);

    const handleEditClick = (item) => {
        setCurrentItem(item.name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewContent('');
    };

    console.log("aboutBanner", aboutBanner);

    const handleUpdate = () => {
        console.log(`Updated ${currentItem}: ${newContent}`);
        handleClose();
    };

    const handleEdit = async (personId) => {
        const person = personDetails.find((p) => p.id === personId);
    
        if (!person.name || !person.designation || !person.description) {
          alert("Please fill out all fields before updating.");
          return;
        }
    
        const formData = new FormData();
        formData.append("id", personId);
        formData.append("person[Name]", person.name);
        formData.append("person[Designation]", person.designation);
        formData.append("person[Description]", person.description);
        if (person.image) {
          formData.append("bannerImage", person.image);
        }
    
        try {
          const response = await axios.put("/api/ourDirectors", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.status === 200) {
            alert("Details updated successfully!");
            fetchDirectors(); // Refresh data after update
          }
        } catch (error) {
          console.error(error);
          alert("Failed to update details. Please try again.");
        }
      };
    
      // Handle Change in Input Fields
      const handleChange = (e, personId, field) => {
        const updatedDetails = personDetails?.map((person) => {
          if (person.id === personId) {
            if (field === "image") {
              return { ...person, [field]: e.target.files[0] };
            }
            return { ...person, [field]: e.target.value };
          }
          return person;
        });
        setPersonDetails(updatedDetails);
      };

    // const handleChangeFile = (e) => {
    //     setBannerImage(e.target.files[0]);
    // };

    const handleUpdateOurValues = async () => {
        if (visionContent && missionContent && valuesContent && currentItemId) {
            const dataToSend = { visionContent, missionContent, valuesContent, id: currentItemId };
    
            try {
                const response = await axios.put("/api/AboutUs/ourValues", dataToSend);
                toast.success("Successfully Updated Data");
                console.log("Data Updated:", response.data);
            } catch (error) {
                console.error("Error updating data:", error);
                toast.error("Error updating data");
            }
        } else {
            toast.error("Please fill out all fields.");
        }
    };
    
    // const handleEdit = (item) => {
    //     setMissionContent(item.missionContent);
    //     setVisionContent(item.visionContent);
    //     setValuesContent(item.valuesContent);
    //     setCurrentItemId(item._id); // Assuming item has an _id field
    // };


    const handleAddData = async() =>{
        try {
            const formData = new FormData();
            formData.append('bannerImage',bannerImage)
            const response = await axios.post("/api/AboutUs/banner", formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })
        } catch (error) {
            
        }
    }





    const handleInputChange = (key, value) => {
        setUpdatedValues(prev => ({ ...prev, [key]: String(value) })); // Convert value to string
    };
    useEffect(() => {
        const fetchAboutBanner = async () => {
            try {
                const response = await axios.get('/api/AboutUs/banner');
                console.log("Fetched Banner Data:", response.data);
                setAboutBanner(response.data.bannerImage);
            } catch (error) {
                console.error("Error fetching banner:", error);
            }
        };
        fetchAboutBanner();

        const getApisDataNumber = async () => {
            try {
                const response = await axios.get('/api/AboutUs/ApisDataNumbers');
                setApisNumbers(response.data)
                console.log("Fetched Apis Data Numbers:", response.data);
            } catch (error) {
                console.error("Error fetching Apis Data Numbers:", error);
            }
        };

        getApisDataNumber();
        const fetchOurValues = async () => {
            try {
                const response = await axios.get('/api/AboutUs/ourValues');
                setOurValues(response.data)
                console.log("Fetched Apis Data Numbers:", response.data);
            } catch (error) {
                console.error("Error fetching Apis Data Numbers:", error);
            }
        };

        fetchOurValues();
        const fetchDirectors = async () => {
            try {
                const response = await axios.get('/api/AboutUs/ourDirectors');
                console.log("response",response);
                
                setPersonDetails(response.data.data)
                console.log("Fetched Apis Data Numbers:", response.data);
            } catch (error) {
                console.error("Error fetching Apis Data Numbers:", error);
            }
        };

        fetchDirectors();
    }, []);

    return (
        <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
            <div>
            {AboutData.map((itm, index) => (
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
                    {currentItem === "Banner" && (
                        <Box>
                            <Typography variant="subtitle1">Existing Banner:</Typography>
                            <img src={aboutBanner} alt="Banner" width={250} height={250} />
                            <input type="file" onChange={(e) => setBannerImage(e.target.files[0])} /> <br/>
                            <Button style={{marginTop:"10px"}} variant="contained" onClick={handleAddData}>Add Image</Button>

                            {/* <FormControl sx={{ mt: 2 }}>
                                <FormLabel>Visibility</FormLabel>
                                <RadioGroup
                                    value={showHide ? "show" : "hide"}
                                    onChange={(e) => setShowHide(e.target.value === "show")}
                                >
                                    <FormControlLabel value="show" control={<Radio />} label="Show" />
                                    <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                                </RadioGroup>
                            </FormControl> */}
                        </Box>
                    )}

                    {currentItem === "Apis Data In Numbers" && (
                        <Box padding={2}>
                            <Grid container spacing={2}>
                                {apisNumbers?.length > 0 && apisNumbers?.map((itm, index) => (
                                    <Grid item md={3} xs={12} key={index}>
                                        <Card sx={{ padding: 2, height: '100%' }}>
                                            <Typography variant="h6">{itm.count}</Typography>
                                            <Typography variant="h6">{itm.title}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Edit Data:</Typography>
                            <Box>

                                {apisNumbers?.map((itm) => (
                                    <TextField
                                        key={itm.key}
                                        variant="outlined"
                                        label={itm.title}
                                        defaultValue={itm.count}
                                        onChange={(e) => handleInputChange(itm.key, e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button variant="contained" onClick={handleUpdate}>Update</Button>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

{currentItem === "ourValues" && (
            <>
                <Box padding={2}>
                    <TextField
                        value={missionContent}
                        onChange={(e) => setMissionContent(e.target.value)}
                        multiline
                        label="Enter Our Mission"
                        fullWidth
                        maxRows={10}
                        style={{ marginBottom: "8px" }}
                    />
                    <TextField
                        value={visionContent}
                        onChange={(e) => setVisionContent(e.target.value)}
                        multiline
                        label="Enter Our Vision"
                        fullWidth
                        maxRows={10}
                        style={{ marginBottom: "8px" }}
                    />
                    <TextField
                        value={valuesContent}
                        onChange={(e) => setValuesContent(e.target.value)}
                        multiline
                        label="Enter Our Values"
                        fullWidth
                        maxRows={10}
                        style={{ marginBottom: "8px" }}
                    />
                    <Button onClick={handleUpdateOurValues} variant="contained" color="primary">
                        Update
                    </Button>
                </Box>
                <Box>
                    {ourValues.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                                border: "1px solid #ccc",
                                padding: "8px",
                                borderRadius: "4px",
                            }}
                        >
                            <Box>
                                <p><strong>Vision:</strong> {item.visionContent}</p>
                                <p><strong>Mission:</strong> {item.missionContent}</p>
                                <p><strong>Values:</strong> {item.valuesContent}</p>
                            </Box>
                            <Button
                                onClick={() => handleEdit(item)}
                                variant="outlined"
                                color="secondary"
                            >
                                Edit
                            </Button>
                        </Box>
                    ))}
                </Box>
            </>
        )}

                 

{currentItem === "Our Directors Info" && (
        <Box>
      <Typography variant="subtitle1" gutterBottom>
        Our Directors Info:
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {!loading &&
        personDetails?.map((person) => (
          <Box key={person.id} sx={{ mb: 4 }}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              value={person.name}
              onChange={(e) => handleChange(e, person.id, "name")}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="Designation"
              fullWidth
              value={person.designation}
              onChange={(e) => handleChange(e, person.id, "designation")}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="Description"
              fullWidth
              value={person.description}
              onChange={(e) => handleChange(e, person.id, "description")}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => handleChange(e, person.id, "image")}
              />
            </Button>
            {person.image && (
              <Typography variant="body2" gutterBottom>
                Selected Image: {person.image.name || "Existing Image"}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={() => handleEdit(person._id)}
            >
              Update
            </Button>
          </Box>
        ))}
    </Box>
      )}
                    {currentItem === "Our Milestones" && (
                        <Box>
                            <Typography variant="subtitle2">Our Milestones:</Typography>
                            <Typography variant="subtitle1" marginBottom={2}>Add New Milestones:</Typography>
                            <TextField
                                fullWidth
                                label="add year here"
                                sx={{ mb: 2 }}

                            />
                            <TextField
                                fullWidth
                                label="add Image Url here"
                            />
                        </Box>

                    )}
                    {["Headline", "Change Banner Text"].includes(currentItem) && (
                        <TextareaAutosize
                            minRows={3}
                            placeholder={`Edit ${currentItem}`}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            style={{ width: '100%' }} // Set width to your desired value
                            sx={{ mt: 2, width: '100%' }} // Or adjust as needed
                        />

                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
</Paper>
    );
};

export default AboutData;
