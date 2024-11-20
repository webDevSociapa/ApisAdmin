"use client"
import { Box, Button, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import axios from "axios";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [bannerImage, setBannerImage] = useState(null); // Set as null initially
    const [blogData, setBlogData] = useState({
        blogTitle: "",
        contentData: "",
        desc: "",
        blogDate: null,
    });

    const uploadFile = (file) => {
        setBannerImage(file);
    };

    const handleChange = (field, value) => {
        console.log("fiels",field); 
        setBlogData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            formData.append("blogImage", bannerImage);
            formData.append("blogTitle", blogData.blogTitle);
            formData.append("contentData", blogData.contentData);
            formData.append("desc", blogData.desc);
            formData.append("blogDate", blogData.blogDate);

            const response = await axios.post("/api/blogs", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });            
            
            setBlogs([...blogs, response.data]);
        } catch (error) {
            console.error("Error while adding blog:", error);
        }
    };

    return (
        <>
        <Paper sx={{ p: 5 }}>
            <Typography variant="h4" gutterBottom>
                Add New Blog
            </Typography>
            
            <TextField
                variant="outlined"
                label="Blog Title"
                value={blogData.blogTitle}
                onChange={(e) => handleChange("blogTitle", e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
            />
            
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1">Blog Image:</Typography>
                <Box mt={2}>
                    {bannerImage ? (
                        <img src={URL.createObjectURL(bannerImage)} alt="Blog Banner" width="100%" />
                    ) : (
                        <img src="/banner.png" alt="Default Banner" width="100%" />
                    )}
                </Box>
                <Button variant="contained" component="label" sx={{ mt: 2, background: "#9F7B49" }}>
                    Change Banner
                    <input type="file" hidden onChange={(e) => uploadFile(e.target.files[0])} />
                </Button>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Blog Date"
                        value={blogData.blogDate}
                        onChange={(newValue) => handleChange("blogDate", newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <TextField
                variant="outlined"
                label="Content"
                value={blogData.contentData}
                onChange={(e) => handleChange("contentData", e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
            />

            <TextField
                variant="outlined"
                label="Description"
                value={blogData.desc}
                onChange={(e) => handleChange("desc", e.target.value)}
                multiline
                rows={2}
                fullWidth
                sx={{ mb: 4 }}
            />

            <Button onClick={handleAdd} variant="contained" sx={{ background: "#9F7B49", px: 4, color: "#fff" }}>
                Add Blog
            </Button>
        </Paper>
        </>
    );
};

export default Blogs;
