'use client'

import { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography, CircularProgress, Paper } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function Careers() {
  const [open, setOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState('')
  const [apisLifeData, setApisLifeData] = useState([])
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [titleImage, setTitleImage] = useState(null)
  const [type, setType] = useState('')
  const [jobDetails, setJobDetails] = useState({
    position: "",
    location: "",
    Terriexperience: "",
    experience: "",
    RelevantExperience: "",
    ctc: "",
    education: "",
    skills: "",
  })

  const fetchApisLifeData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/careers/apisLife")
      setApisLifeData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (item) => {
    setCurrentItem(item)
    setOpen(true)
    setNewImages([])
  }

  const handleClose = () => {
    setOpen(false)
    setTitle("")
    setTitleImage(null)
    setType("")
    setNewImages([])
  }

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files)
    setNewImages(prevImages => [...prevImages, ...files])
  }

  const handleUpdate = async (item) => {
    try {
      const formData = new FormData()
      formData.append('id', item._id)
      formData.append('title', title || item.title)
      if (titleImage) {
        formData.append('titleImage', titleImage)
      }
      formData.append('type', type || item.type)

      // Append new images to formData
      newImages.forEach((image, index) => {
        formData.append(`newImages`, image)
      })

      await axios.put("/api/careers/apisLife", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("Update successful!")
      fetchApisLifeData()
      handleClose()
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Update failed!")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/careers/apisLife?id=${id}`)
      setApisLifeData(prev => prev.filter(item => item._id !== id))
      toast.success("Item deleted successfully")
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete item")
    }
  }

  const handleAddJob = async () => {
    try {
      await axios.post("/api/careers/jobOpening", jobDetails)
      toast.success("Job added successfully!")
      handleClose()
    } catch (error) {
      console.error("Add job error:", error)
      toast.error("Failed to add job!")
    }
  }

  const careerItems = [
    "Employee Awards",
    "Training & Sessions",
    "Engagements",
    "Celebrations",
    "Join Us",
  ]

  useEffect(() => {
    fetchApisLifeData()
  }, [])

  return (
    <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
      {careerItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            borderRadius: "10px",
            fontFamily: "jost",
            fontWeight: "400",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{item}</span>
          <span
            className="underline cursor-pointer"
            onClick={() => handleEditClick(item)}
          >
            Edit
          </span>
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Edit {currentItem}
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
        </DialogTitle>
        <DialogContent dividers>
          {["Employee Awards", "Engagements", "Training & Sessions", "Celebrations"].includes(currentItem) && (
            <Box>
              {loading ? (
                <CircularProgress />
              ) : Array.isArray(apisLifeData) && apisLifeData.length > 0 ? (
                apisLifeData.map((item) => (
                  <Box key={item._id} sx={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <img src={item.titleImage} alt="Current Banner" width="100px" style={{ display: "block" }} />
                      <input type="file" onChange={(e) => setTitleImage(e.target.files?.[0] || null)} />
                      <TextField
                        label="Title"
                        size="small"
                        defaultValue={item.title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        label="Type"
                        size="small"
                        defaultValue={item.type}
                        onChange={(e) => setType(e.target.value)}
                        sx={{ mt: 2, ml: 2 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {item.imageGroup?.map((image, index) => (
                        <Box key={index}>
                          <img src={image} alt={`Gallery Image ${index + 1}`} width="100px" style={{ display: "block" }} />
                        </Box>
                      ))}
                    </Box>
                    <Typography>Add new images</Typography>
                    <input 
                      type="file" 
                      multiple
                      onChange={handleNewImageChange}
                    />
                    {newImages.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography>New images to be added:</Typography>
                        {newImages.map((image, index) => (
                          <Typography key={index}>{image.name}</Typography>
                        ))}
                      </Box>
                    )}
                    <Button 
                      variant="contained" 
                      onClick={() => handleUpdate(item)}
                      sx={{ mt: 2, mr: 2, bgcolor: "#9F7B49" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                      sx={{ mt: 2 }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No data available</Typography>
              )}
            </Box>
          )}
          {currentItem === "Join Us" && (
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
                label="Territory Experience Required"
                value={jobDetails.Terriexperience}
                onChange={(e) => setJobDetails({ ...jobDetails, Terriexperience: e.target.value })}
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
                label="Relevant Experience Required"
                value={jobDetails.RelevantExperience}
                onChange={(e) => setJobDetails({ ...jobDetails, RelevantExperience: e.target.value })}
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
                label="Education Required"
                value={jobDetails.education}
                onChange={(e) => setJobDetails({ ...jobDetails, education: e.target.value })}
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
              <Button variant="contained" onClick={handleAddJob}>
                ADD JOB
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Paper>
  )
}
