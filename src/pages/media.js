import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { useState } from "react";

const Media = () => {
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
    const DataSet = [
        { name: "Apis In The News" },
        { name: "Media Gallery" },
        { name: "TVC" },
        { name: "Our Campaigns" },
    ]

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
                            <br />
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
                                label="Update Name of event"
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
                                <Typography variant="subtitle1">Existing Banner:</Typography>
                                {/* Render a list of existing logos (placeholder) */}
                                <Box display="flex" gap={2} mt={2}>
                                    <img src="/logo1.png" alt="Logo 1" width={50} />
                                    {/* Add more logos as needed */}
                                </Box>
                                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Upload New Banner
                                    <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                                </Button>
                            </Box>
                        </>
                    )}
                    {currentItem === "TVC" && (
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Add TVC Link here :"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="contained">Add</Button>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}

                        />

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
                                {/* Placeholder banner image */}
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
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Media

