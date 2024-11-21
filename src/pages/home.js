import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from "@mui/icons-material/Close";


const Home = () => {
  const HomeContent = [
    { name: "Headline" },
    { name: "Banner" },
    { name: "Taste Product" },
    { name: "Change Banner Text" },
    { name: "Our Availability" },
    { name: "Life @Apis" },
  ];

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [headingContent, setHeadingContent] = useState("");
  const [bannerVideos, setBannerVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [hideShow, setHideShow] = useState(true);
  const [bannerText, setBannerText] = useState("");
  const [availability, setAvailability] = useState([]);
  const [lifeAtApis, setLifeAtApis] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [socialLogo, setSocialLogo] = useState([])
  const [logoPath, setLogoPath] = useState("")
  const [productImage, setProductImage] = useState("")
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState("");
  const [path, setPath] = useState("");
  const [productsData,setProductsData] = useState([])
  
  const fileInput = useRef(null); // Use useRef to reference the file input

  // const []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headingResponse = await axios.get("/api/HomePage/heading");
        setHeadingContent(headingResponse.data[0].headingContent || "Default Headline");

        const availabilityResponse = await axios.get("/api/HomePage/ourAvailability");
        setAvailability(availabilityResponse.data || []);

        const bannerResponse = await axios.get("/api/HomePage/banner");
        setBannerVideos(bannerResponse.data);
        if (bannerResponse.data.length > 0) {
          setSelectedVideo(bannerResponse.data[0].videoFile);
        }

        const tasteProduct = await axios.get("/api/HomePage/tasteProduct");
        setProductsData(tasteProduct.data)

        const bannerTextResponse = await axios.get("/api/HomePage/bannerText");
        setBannerText(bannerTextResponse.data[0].bannerText || "");

        const lifeAtApisResponse = await axios.get("/api/HomePage/LifeAtApis");
        setLifeAtApis(lifeAtApisResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleVideoChange = (e) => setSelectedVideo(e.target.value);
  const handleNewVideoChange = (e) => setNewVideoFile(e.target.files[0]);
  const handleNewLogoChange = (e) => setSocialLogo(e.target.files[0]);
  // const handleThumbnailChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setThumbnail(reader.result); // Set base64 image for preview
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

 

  const handleDelete = async (id) => {
    if (currentItem === "Banner") {
      try {
        await axios.delete(`/api/HomePage/banner?id=${id}`); // Pass id as query parameter
        setBannerVideos((prev) => prev.filter((video) => video._id !== id));
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    } else if (currentItem === "Our Availability") {
      try {
        const response = await axios.delete(`/api/HomePage/ourAvailability?id=${id}`); // Pass id as query parameter
        console.log("response", response);

        // Remove the deleted item from the state after successful deletion
        setAvailability((prev) => prev.filter((item) => item._id !== id));

      } catch (error) {
        console.error("Error deleting availability item:", error);
      }
    } else if( currentItem === "Taste Product"){
      try{
        const response = await axios.delete(`/api/HomePage/tasteProduct?id=${id}`); //
        setProductsData((prev)=> prev.filter((item)=>item._id !== id));
        fetchData()
      }
      catch(error){
        console.error("Error deleting product:", error);
      }
    
    } else if( currentItem === "Life @Apis"){
      try{
        const response = await axios.delete(`/api/HomePage/LifeAtApis?id=${id}`); //
        setLifeAtApis((prev)=> prev.filter((item)=>item._id !== id));
        toast.success("Delete Successfully");
        fetchData()
      }
      catch(error){
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleLifeAtApis = async () => {
    try {
      const formData = new FormData();
      formData.append("videoUrl", videoUrl);
      formData.append("thumbnail", thumbnail);

     const response =  await axios.post("/api/HomePage/LifeAtApis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Add Data SuccessFully")
      fetchData()

    } catch (error) {
      console.error("Error posting video:", error);
    }
  };

  // const handleAddData = async () => {
  //   if (currentItem === "Our Availability") {
  //     try {
  //       const formData = new FormData(); // Use FormData to handle file uploads
  //       formData.append('uploadLogo', fileInput.current.files[0]); // Assuming you are uploading a file
  //       formData.append('path', 'some-path'); // Add other data, such as path or description

  //       // Send the form data to the backend using a POST request
  //       const response = await axios.post('/api/HomePage/ourAvailability', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data', // Set the appropriate content type for file upload
  //         },
  //       });
  //       console.log("response",response);


  //       if (response.status === 201) {
  //         // Handle success (e.g., update local state, show success message)
  //         console.log("Data added successfully");
  //         setAvailability((prev) => [...prev, response.data]); // Optionally update the state with new data
  //       }
  //     } catch (error) {
  //       console.error("Error adding data:", error);
  //     }
  //   }
  // };

  const handleUpdateBannerVideo = async () => {
    try {
      let response;

      const updateContent = async (url, data, isMultipart = false) => {
        const headers = isMultipart
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };
        return await axios.put(url, data, { headers });
      };

      switch (currentItem) {
        case "Banner":
          if (newVideoFile) {
            const formData = new FormData();
            formData.append("videoFile", newVideoFile);
            response = await axios.post("/api/HomePage/banner", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            setBannerVideos((prev) => [...prev, response.data]);
          } else if (selectedVideo) {
            await updateContent("/api/HomePage/banner", { videoFile: selectedVideo, hideShow });
          }
          break;

        case "Headline":
          await updateContent("/api/HomePage/heading", { headingContent });
          break;

        case "Change Banner Text":
          await updateContent("/api/HomePage/bannerText", { bannerText });
          break;

        case "Life @Apis":
          const lifeFormData = new FormData();
          lifeFormData.append("videoUrl", videoUrl);
          lifeFormData.append("id", id);
          if (thumbnail) {
            lifeFormData.append("thumbnail", thumbnail);
          }
          await updateContent("/api/HomePage/LifeAtApis", lifeFormData, true);
          break;

        default:
          console.warn("Unhandled currentItem:", currentItem);
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewVideoFile(null);
    setSelectedVideo(bannerVideos.length > 0 ? bannerVideos[0].videoFile : "");
    setHideShow(true);
  };


  const AddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("imageFile", imageFile);
      formData.append("content", content);
      formData.append("path", path);

      const response = await axios.post("/api/HomePage/tasteProduct", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Add Successfully Product")
      fetchData()
      console.log("response", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`/api/HomePage/tasteProduct?id=${id}`);
  //     toast.success("Product deleted successfully!");
  //     fetchProducts(); // Refresh the product list
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     toast.error("Failed to delete product.");
  //   }
  // };


  const handleAddData = async (logoPath) => {
    console.log("logoPath", logoPath);

    if (currentItem !== "Our Availability") return;

    const file = fileInput.current?.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('uploadLogo', file);
    formData.append('path', logoPath);

    try {
      const response = await axios.post('/api/HomePage/ourAvailability', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log("Data added successfully", response.data);
        toast.success("Update successful!"); // Notify on success
        setAvailability((prev) => [...prev, response.data]);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error("Error adding data:", error.response?.data || error.message);
    }
  };


  return (
    <Box>
      {HomeContent.map((itm, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            mx: 10,
            mt: 4,
            borderRadius: "10px",
            fontFamily: "jost",
            fontWeight: "400",
            display: "flex",
            justifyContent: "space-between",
          }}
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
        <DialogTitle>Edit {currentItem}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
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
              <Typography variant="subtitle1">Current Banner Video:</Typography>
              <Box mt={2}>
                <video width="100%" controls>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>

              <Typography variant="subtitle1" mt={2}>
                Select Banner Video:
              </Typography>

              <RadioGroup value={selectedVideo} onChange={handleVideoChange}>
                {bannerVideos.map((video) => (
                  <Box key={video._id} sx={{ mt: 1 }}>
                    <FormControlLabel
                      value={video.videoFile}
                      control={<Radio />}
                      label={video.videoFile.split("/").pop()}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(video._id)}
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>

                    <RadioGroup
                      value={video.hideShow ? "show" : "hide"}
                      onChange={(e) =>
                        setBannerVideos((prev) =>
                          prev.map((v) =>
                            v._id === video._id
                              ? { ...v, hideShow: e.target.value === "show" }
                              : v
                          )
                        )
                      }
                      sx={{ display: "flex", flexDirection: "row", ml: 4 }}
                    >
                      <FormControlLabel value="show" control={<Radio />} label="Show" />
                      <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                    </RadioGroup>
                  </Box>
                ))}

              </RadioGroup>

              <input
                type="file"
                accept="video/*"
                onChange={handleNewVideoChange}
                style={{ marginTop: "16px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateBannerVideo}
                sx={{ mt: 2 }}
              >
                Upload New Video
              </Button>
            </Box>
          )}
          {currentItem === "Our Availability" && (
            <Box>
              <Typography>
                {availability.map((item) => (
                  <Box key={item._id} sx={{ display: "flex", flexDirection: "row", width: "200px" }}>
                    <img src={item.uploadLogo} alt="Logo" />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                      sx={{ ml: 2, height: "40px", width: "40px" }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Typography>
              <Typography style={{ marginTop: "20px" }}>Upload New Logo</Typography>
              <input type="file" ref={fileInput} style={{ marginTop: "10px" }} />
              <br />

              <TextField
                label="Ecommerce Logo Path"
                onChange={(e) => setLogoPath(e.target.value)}
                style={{ marginTop: "10px" }}

              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddData(logoPath)}
                sx={{ mt: 2 }}
              >
                Upload New Logo
              </Button>
            </Box>
          )}
          {currentItem === "Taste Product" && (
            <Box>
              <Typography variant="h6">Add Taste Product</Typography>
              <TextField
                label="Enter Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                style={{ marginBottom: "15px" }}
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                fullWidth
                maxRows={10}
                style={{ marginTop: "15px", marginBottom: "15px" }}
              />
              <TextField
                label="Path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                fullWidth
                style={{ marginBottom: "15px" }}
              />
              <Button variant="contained" color="primary" onClick={AddProduct}>
                Add Product
              </Button>
              {productsData.map((item)=>(
                <>
                <Box key={item.id} sx={{ mt: 2 }}>
                  <Typography variant="h3">{item.title}</Typography>
                  <img src={item.imageFile} width={100} height={100}/>
                  <Typography variant="h6">{item.content}</Typography>
                  <Typography variant="h6">{item.path}</Typography>
                  </Box>
                  <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(item._id)} 
                  style={{ marginTop: "8px" }}
                >
                  Delete
                </Button>
                </>
              ))}
            </Box>
          )}
          {currentItem === "Headline" && (
            <TextField
              id="outlined-multiline-static"
              label="Change Headline"
              multiline
              rows={4}
              fullWidth
              onChange={(e) => setHeadingContent(e.target.value)}
              value={headingContent}
            />
          )}

          {currentItem === "Life @Apis" && (
            <Box>
              <Typography variant="subtitle1">Current Video:</Typography>
              {lifeAtApis.map((itm, index) => (
                <>
                <Box mt={2} key={index}>
                  <iframe
                    width="100%"
                    height="315"
                    src={itm.videoUrl}
                    title={`Current Life @Apis Video ${index + 1}`}
                    allowFullScreen
                  ></iframe>
<Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(itm._id)} 
                  style={{ marginTop: "8px" }}
                >
                  Delete
                </Button>
                

                  {/* Thumbnail Upload Section */}
                 
                </Box>
                

                </>
              ))}
               <Box mt={2}>
                    <Typography variant="subtitle1">Upload Thumbnail:</Typography>
                    <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                style={{ marginBottom: "15px" }}
              />
                    {thumbnail && (
                      <Box sx={{ mt: 2 }}>
                        <img
                          src={thumbnail}
                          alt="Thumbnail Preview"
                          width="150"
                          height="150"
                          style={{ borderRadius: "8px" }}
                        />
                        
                      </Box>
                    )}
                      <TextField
                    fullWidth
                    label="Paste new video link"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  </Box>
              <Button variant="contained" style={{marginTop:"10px"}} onClick={handleLifeAtApis}>Add Data</Button>
            </Box>
          )}

          {currentItem === "Change Banner Text" && (
            <TextField
              label="Change Banner Text"
              multiline
              rows={4}
              fullWidth
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button  sx={{background:"#9F7B49",color:"#fff"}} onClick={handleClose}>Cancel</Button>
            <Button sx={{background:"#9F7B49",color:"#fff"}} onClick={handleUpdateBannerVideo}>Save</Button>
          </DialogActions>

        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </Box>
  );
};

export default Home;
