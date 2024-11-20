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
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";

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
    const [aboutBanner, setAboutBanner] = useState('')
    const [editBanner, setEditBanner] = useState([])
    const [bannerImage, setBannerImage] = useState(null)
    const [showHide, setShowHide] = useState(true)
    const [apisNumbers, setApisNumbers] = useState([])
    const [updatedValues, setUpdatedValues] = useState({});
    const [visionContent, setVisionContent] = useState('');
    const [missionContent, setMissionContent] = useState('');
    const [valuesContent, setValuesContent] = useState('');
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

    // const handleUpdate = () => {
    //     console.log(`Updated ${currentItem}: ${newContent}`);
    //     handleClose();
    // };

    // const handleChangeFile = (e) => {
    //     setBannerImage(e.target.files[0]);
    // };

    const handleUpdate = async () => {
        if (currentItem === "Apis Data In Numbers") {
            const dataToSend = apisNumbers?.map((item) => ({
                key: item.key,
                title: item.title,
                count:
                    updatedValues[item.key] !== undefined
                        ? updatedValues[item.key]
                        : item.count,
            }));

            try {
                const response = await axios.put("/api/AboutUs/ApisDataNumbers", dataToSend);
                toast.success("Successfully Updated Data");
                console.log("API Data Updated:", response.data);
                setApisNumbers(response.data);
            } catch (error) {
                console.error("Error updating API data:", error);
                toast.error("Error updating API data");
            }
        } else if (currentItem === "Banner") {
            try {
                const formData = new FormData();
                formData.append('bannerImage', bannerImage);
                formData.append('visibility', showHide ? "show" : "hide"); // Include visibility in the request

                const response = await axios.put("/api/AboutUs/banner", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data) {
                    toast.success("Banner updated successfully");
                    console.log("Banner updated:", response.data);
                    // Optionally update the banner image or other states here
                }
            } catch (error) {
                console.error("Error updating banner:", error);
                toast.error("Error updating banner");
            }
        }
    };


    const handleUpdateOurValues = async () => {
        if (visionContent && missionContent && valuesContent) {
            const dataToSend = { visionContent, missionContent, valuesContent };

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
    }, []);

    return (
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
                            <input type="file" onChange={(e) => setBannerImage(e.target.files[0])} />

                            <FormControl sx={{ mt: 2 }}>
                                <FormLabel>Visibility</FormLabel>
                                <RadioGroup
                                    value={showHide ? "show" : "hide"}
                                    onChange={(e) => setShowHide(e.target.value === "show")}
                                >
                                    <FormControlLabel value="show" control={<Radio />} label="Show" />
                                    <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                                </RadioGroup>
                            </FormControl>
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
                            <Button onClick={()=>handleUpdateOurValues()} variant="contained" color="primary">
                                Update
                            </Button>
                        </Box>
                    )}

                    {currentItem === "Our Directors Info" && (
                        <Box>
                            <Typography variant="subtitle1">Our Directors Info:</Typography>
                            {/* Placeholder banner image */}
                            <TextField
                                variant="outlined"
                                label="Person1"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <br />
                            <TextField
                                variant="outlined"
                                label="Person2"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}

                            />
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
    );
};

export default AboutData;
