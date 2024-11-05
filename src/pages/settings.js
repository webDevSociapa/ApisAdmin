'use client'
import React, { useEffect, useRef } from 'react';
import { Box, Button, Divider, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import dynamic from 'next/dynamic';

import 'quill/dist/quill.snow.css'; // Import Quill styles

const Quill = dynamic(() => import('quill'), { ssr: false });

const Settings = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            const quill = new Quill(editorRef.current, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block', 'link'], // Add link option here
                    ],
                },
                placeholder: 'Compose an epic...',
                theme: 'snow', // or 'bubble'
            });

            // Optional: Handle content change
            quill.on('text-change', () => {
                const content = quill.root.innerHTML;
                console.log(content); // This will log the editor content

                // Check for nested links and prevent them
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                const links = doc.querySelectorAll('a');

                links.forEach(link => {
                    if (link.parentElement.tagName === 'A') {
                        link.parentElement.removeChild(link);
                    }
                });

                // Update the editor content without nested links
                quill.root.innerHTML = doc.body.innerHTML;
            });
        }
    }, []);

    return (
        <Paper sx={{ padding: 4 }}>
            <Paper>
                <Box>
                    <Typography variant="h5">Social Media</Typography>
                    <Divider />
                    <Typography sx={{ margin: 4 }}>Existing:</Typography>
                    <Box sx={{ margin: 4, display: "flex", gap: "20px" }}>
                        <Typography><FacebookIcon sx={{ color: "#9F7B49" }} /></Typography>
                        <Typography><XIcon sx={{ color: "#9F7B49" }} /></Typography>
                        <Typography><YouTubeIcon sx={{ color: "#9F7B49" }} /></Typography>
                        <Typography><InstagramIcon sx={{ color: "#9F7B49" }} /></Typography>
                        <Typography><LinkedInIcon sx={{ color: "#9F7B49" }} /></Typography>
                        <Typography><PinterestIcon sx={{ color: "#9F7B49" }} /></Typography>
                    </Box>
                    <TextField
                        variant="outlined"
                        label="Add News link:"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button variant="contained" sx={{ background: "#9F7B49" }}>Add</Button>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ margin: 4, width: '600px' }}
                    />
                    <Box sx={{ margin: 4, display: 'flex', justifyContent: 'flex-start', py: 2 }}>
                        <Button sx={{ background: "#9F7B49", color: "#fff" }}>Add Icon</Button>
                    </Box>
                </Box>
            </Paper>
            <Box>
                <Typography variant="h5" sx={{ mb: 6 }}>Privacy Policy</Typography>
                <Divider />
                <div ref={editorRef} style={{ height: '300px', }} />
            </Box>
        </Paper>
    );
};

export default Settings;