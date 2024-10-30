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
    TextareaAutosize,
    Card,
    Grid,
    InputAdornment,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const AboutData = () => {
    const AboutData = [
        { name: "Banner" },
        { name: "Apis Data In Numbers" },
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

    const handleEditClick = (item) => {
        setCurrentItem(item.name);
        setOpen(true);
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

                    {currentItem === "Apis Data In Numbers" && (
                        <Box padding={2}>
                            <Grid container spacing={2}>
                                {CardsData.map((itm, index) => (
                                    <Grid item md={3} xs={12} key={index}>
                                        <Card sx={{ padding: 2, height: '100%' }}>
                                            <Typography variant="h6">{itm.numbers}</Typography>
                                            <Typography variant="h6">{itm.title}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="h6" sx={{ mt: 2,mb:2 }}>Edit Data:</Typography>
                           <Box>
                           <TextField
                                variant="outlined"
                                label="Product Ranges"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb:2}}
                            />
                            <br/>
                            <TextField
                                variant="outlined"
                                label="Years of legacy"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb:2}}

                            />
                            <br/>

                            <TextField
                                variant="outlined"
                                label="new Customer"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb:2}}

                            />
                            <br/>

                            <TextField
                                variant="outlined"
                                label="number of outlets"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Update</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{mb:2}}

                            />
                           </Box>
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
                                sx={{mb:2}}

                            />
                            <br/>
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
                                sx={{mb:2}}

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
                            sx={{mb:2}}

                            />
                            <TextField
                            fullWidth
                            label="add year here"
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
