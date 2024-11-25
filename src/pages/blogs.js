"use client"
import { Box, Button, InputAdornment, Paper, TextField, Typography } from "@mui/material";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react";
import axios from "axios";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [blogData, setBlogData] = useState({
        blogTitle: "",
        contentData: "",
        desc: "",
        blogDate: null,
    });

    // Fetch all blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const uploadFile = (file) => {
        setBannerImage(file);
    };

    const handleChange = (field, value) => {
        setBlogData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddOrUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("blogImage", bannerImage);
            formData.append("blogTitle", blogData.blogTitle);
            formData.append("contentData", blogData.contentData);
            formData.append("desc", blogData.desc);
            formData.append("blogDate", blogData.blogDate);

            if (selectedBlogId) {
                // Include the ID in the request body for updating
                formData.append("id", selectedBlogId);

                // Update blog
                await axios.put("/api/blogs", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === selectedBlogId ? { ...blog, ...blogData } : blog
                    )
                );
            } else {
                // Add new blog
                const response = await axios.post("/api/blogs", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setBlogs([...blogs, response.data]);
            }

            // Reset form
            setBlogData({
                blogTitle: "",
                contentData: "",
                desc: "",
                blogDate: null,
            });
            setBannerImage(null);
            setSelectedBlogId(null);
        } catch (error) {
            console.error("Error while adding/updating blog:", error);
        }
    };


    const handleEdit = (blog) => {
        setSelectedBlogId(blog._id);
        setBlogData({
            blogTitle: blog?.blogTitle,
            contentData: blog?.contentData,
            desc: blog?.desc,
            blogDate: blog?.blogDate,
        });
        setBannerImage(null); // Assume the banner image isn't editable here; handle accordingly.
    };

    return (
        <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
             <Box>
                <Typography variant="h4" gutterBottom>
                    {selectedBlogId ? "Edit Blog" : "Add New Blog"}
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

                <TextField

                />

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Blog Date"
                            // value={blogData.blogDate}
                            onChange={(newValue) => handleChange("blogDate", newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider> */}

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

                <Button onClick={handleAddOrUpdate} variant="contained" sx={{ background: "#9F7B49", px: 4, color: "#fff" }}>
                    {selectedBlogId ? "Update Blog" : "Add Blog"}
                </Button>

                <Typography variant="h5" gutterBottom>
                    Existing Blogs
                </Typography>
                {blogs.map((blog) => (
                    <Box key={blog._id} sx={{ mb: 3 }}>
                        <Typography variant="h6">{blog.blogTitle}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {blog.desc}
                        </Typography>
                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={() => handleEdit(blog)}
                        >
                            Edit
                        </Button>
                    </Box>
                ))}
        </Box>
</Paper>
    );
};

export default Blogs;
