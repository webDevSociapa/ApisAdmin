import { useState } from "react";
import axios from "axios";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Media = () => {
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const [mediaImage, setMediaImage] = useState(null);
    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const handleEditClick = (item) => {
        setCurrentItem(item.name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setMediaImage(null);
        setVideoUrl("");
    };

    const DataSet = [
        { name: "Apis In The News" },
        { name: "Media Gallery" },
        { name: "TVC" },
        { name: "Our Campaigns" },
    ];

    const handleAddData = async () => {
        try {
            let response;

            if (currentItem === "Media Gallery") {
                if (!mediaImage || !title) {
                    console.error("Please provide both media image and title.");
                    return;
                }

                const formData = new FormData();
                formData.append("mediaImage", mediaImage);
                formData.append("title", title);

                response = await axios.post("/api/mediaGallery", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else if (currentItem === "TVC") {
                if (!videoUrl) {
                    console.error("Please provide a valid TVC video link.");
                    return;
                }

                response = await axios.post("/api/mediaGallery/mediaTvc", { videoUrl }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            if (response && response.status === 200) {
                console.log("Operation successful:", response.data);
                handleClose();
            } else {
                console.error("Unexpected response status:", response?.status);
            }
        } catch (error) {
            console.error("Error during operation:", error);
        }
    };

    return (
        <>
            {DataSet.map((itm, index) => (
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
                    }}
                    style={{ padding: "20px 60px" }}
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
                    {currentItem === "Apis In The News" && (
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="add News link :"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Add</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="add Newspaper Title :"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Add</Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                    )}

                    {currentItem === "Media Gallery" && (
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Media Gallery Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <input
                                type="file"
                                onChange={(e) => setMediaImage(e.target.files[0])}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAddData}
                                sx={{ mt: 2 }}
                            >
                                Upload
                            </Button>
                        </>
                    )}

                    {currentItem === "TVC" && (
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Add TVC Link here :"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAddData}
                                sx={{ mt: 2 }}
                            >
                                Add
                            </Button>
                        </>
                    )}

                    {currentItem === "Our Campaigns" && (
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Add title name :"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Add</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <Box>
                                <Typography variant="subtitle1">Current Banner:</Typography>
                                <Box mt={2}>
                                    <img src="/banner.png" alt="Current Banner" width="100%" />
                                </Box>
                                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Change Banner
                                    <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddData}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Media;

