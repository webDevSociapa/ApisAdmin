import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogTitle, TextareaAutosize, Typography, IconButton, DialogContent, TextField, Divider, InputAdornment, Card, Grid, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState('');
    const [newContent, setNewContent] = React.useState('');
    const [isCollapsedMenu, setIsCollapsedMenu] = React.useState(false);
    const [productBanner, setProductBanner] = React.useState(null);
    const [productImage, setProductImage] = React.useState(null);



    const handleClose = () => {
        setOpen(false);
        setNewContent('');
    };

    const handleUpdate = () => {
        console.log(`Updated ${currentItem}: ${newContent}`);
        handleClose();
    };

    const handleExpendClose = () => {
        setIsCollapsedMenu(!isCollapsedMenu)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabsData = ({ handleEditClick }) => {
        const OurBrandsData = [
            { name: "Banner" },
            { name: "Details" },
            { name: "Available on" },
            { name: "Customer Reviews" },
            { name: "Health Benefits" },
            { name: "Our Social Reviews" },
            { name: "Related Recipes" },
            { name: "Similar Product" },
            { name: "Remove Product" },
        ];

        return (
            <>
                {OurBrandsData.map((itm, index) => (
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
                        style={{ Padding: "20px 60px" }}
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
            </>
        );
    };

    const handleEditClick = (item) => {
        setCurrentItem(item.name);
        setOpen(true);
        setNewContent('');
    };


    const DataSetOfItem = [
        { item: "Organic honey", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Himalayan Honey", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Jam", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Flakes", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Green Tea", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Vermicelli", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Saffron", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Macaroni", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Spread", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Dates", content: <TabsData handleEditClick={handleEditClick} /> },
        { item: "Soya chunks", content: <TabsData handleEditClick={handleEditClick} /> },

    ]

    const logoImage1 = [
        { image: "tata.com", imagePath: "https://www.shutterstock.com/image-illustration/robot-crash-test-dummy-sitting-600nw-2051238215.jpg" },
        { image: "tata.com", imagePath: "https://www.shutterstock.com/image-illustration/robot-crash-test-dummy-sitting-600nw-2051238215.jpg" },
        { image: "tata.com", imagePath: "https://www.shutterstock.com/image-illustration/robot-crash-test-dummy-sitting-600nw-2051238215.jpg" },
        { image: "tata.com", imagePath: "https://www.shutterstock.com/image-illustration/robot-crash-test-dummy-sitting-600nw-2051238215.jpg" },
    ]
    const HealthBenefits = [
        { id: 1, name: 'Benefit 1' },
        { id: 2, name: 'Benefit 2' },
        { id: 3, name: 'Benefit 3' },
        { id: 4, name: 'Benefit 4' },
    ];

    // Create a state to track the collapsed state of each item
    const [collapsedItems, setCollapsedItems] = React.useState({});

    const handleToggleCollapse = (index) => {
        // Toggle the collapsed state for the specific item
        setCollapsedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const SimiliarProducts = [
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
        { name: "honey" },
    ]

    const [uploadedImage, setUploadedImage] = React.useState(null);
    const [productBannerImages, setProductBannerImages] = React.useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log("file", file);

        if (file) {
            const reader = new FileReader();
            console.log("reader", reader);

            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductBannerImages(file);

        if (file) {
            console.log("file", URL.createObjectURL(file));

            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrl(previewUrl);
        }
    };


    const handleProductBanner = async () => {
        try {
            const response = await axios.put("/api/our-brands/")
        } catch (error) {

        }
    }

    const EditProductDetails = async () => {
        try {
            const response = await axios.post("/api/our-Brands/products/banner",)
            console.log("response", response);

        } catch (error) {
            console.log("ststats");


        }

    }


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/our-Brands/products/banner");
                console.log(response);
            } catch (error) {
                console.log("erorr", error);

            }
        }
    }, [])
    // const handk

    return (
        <Paper sx={{ p: 5, background: "rgba(255, 251, 246, 1)" }}>
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {DataSetOfItem.map((itm, index) => (
                        <Tab key={index} label={itm.item} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {DataSetOfItem.map((itm, index) => (
                    <CustomTabPanel value={value} index={index} key={index}>
                        {itm.content}
                    </CustomTabPanel>
                ))}
            </Box>
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
                        <>
                            <input type="file" onChange={handleFileChange} />
                            <TextField
                                label="Product Name"
                                multiline
                                maxRows={10}
                                onChange={(e)=>setProductName(e.target.value)}
                                style={{ marginTop: "10px" }}
                                fullWidth
                            ></TextField>

                            {imagePreviewUrl && (
                                <img src={imagePreviewUrl} alt="Preview" style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }} />
                            )}

                            <TextField
                                label="Product Info"
                                multiline
                                maxRows={10}
                                onChange={(e)=>setProductInfo(e.target.value)}
                                style={{ marginTop: "10px" }}
                                fullWidth
                            ></TextField>
                        </>
                    )}
                    {currentItem === "Our Availability" && (
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

                    {currentItem === "Details" && (
                        <Box>
                            <Typography variant="subtitle1">Current Video:</Typography>
                            {/* Placeholder video component */}
                            <Box mt={2}>

                            </Box>
                            <TextField
                                fullWidth
                                label="Default Headline"
                                variant="outlined"
                                sx={{ mt: 2, mb: 2 }}
                                // value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Multiline"
                                multiline
                                rows={4}
                                fullWidth
                                defaultValue="Default Value"
                            />
                            <Box>
                                <Typography variant="subtitle1">Existing Image:</Typography>
                                {/* Render a list of existing logos (placeholder) */}
                                <Box display="flex" gap={2} mt={2}>
                                    <img src="/logo1.png" alt="Logo 1" width={50} />
                                    {/* Add more logos as needed */}
                                </Box>
                                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Upload Product Image
                                    <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                                </Button>
                            </Box>
                        </Box>
                    )}
                    {currentItem === "Health Benefits" && (
                        <Box>
                            {HealthBenefits.map((benefit, index) => {
                                const isCollapsed = collapsedItems[index]; // Check the collapsed state for the current item
                                return (
                                    <Box key={index} sx={{ mb: 2, border: '1px solid #ccc', padding: 4 }}>
                                        <Typography variant="h6">{benefit.name}</Typography>
                                        <span style={{ float: "right" }} onClick={() => handleToggleCollapse(index)}>
                                            {isCollapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </span>
                                        {isCollapsed && (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    label="Default Headline"
                                                    variant="outlined"
                                                    sx={{ mt: 2, mb: 2 }}
                                                    onChange={(e) => console.log(`Headline for ${benefit.name}: ${e.target.value}`)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Icon URL"
                                                    variant="outlined"
                                                    sx={{ mt: 2, mb: 2 }}
                                                    onChange={(e) => console.log(`Icon URL for ${benefit.name}: ${e.target.value}`)}
                                                />
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Description"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    defaultValue="Default Value"
                                                    onChange={(e) => console.log(`Description for ${benefit.name}: ${e.target.value}`)}
                                                />
                                            </>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                    {currentItem === "Available on" && (
                        <Box>
                            <Typography>Availibility Client list :</Typography>
                            {logoImage1.map((item, index) => {
                                return (
                                    <Box sx={{ display: 'inline-block', width: "100%" }}>
                                        <img key={index} src="/" >

                                        </img>
                                        <CloseIcon style={{ position: "absolute", top: "50%" }} />

                                    </Box>
                                )
                            })}
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
                        </Box>
                    )}
                    {currentItem === "Related Recipes" && (
                        <Box>
                            <TextField
                                variant="contained"
                                fullWidth
                                label="add new recipies link :"
                                style={{ background: "#9F7B49" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button variant="contained">Add</Button>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}

                            />
                        </Box>
                    )}
                    {currentItem === "Similar Product" && (
                        <Box>
                            <Grid container spacing={2}>
                                {SimiliarProducts.map((item) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card className='similiarProdCards' sx={{ padding: "10px 16px", border: "1px solid #9F7B49", boxShadow: "none" }}>{item.name}</Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    )}

                    {currentItem === "Our Social Reviews" && (
                        <Box border="1px" borderColor="gray.300" borderRadius="md" p={2} position="relative">
                            {uploadedImage && (
                                <>
                                    <Image
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        width="100%" // Set width to 100% or a specific value
                                        height="auto" // Set height to auto to maintain aspect ratio
                                    // objectFit="cover" // Optional: to cover the box without distortion
                                    />
                                    {/* <IconButton
                                        icon={<CloseIcon />}
                                        onClick={handleCloseImage}
                                        position="absolute"
                                        top={1}
                                        right={1}
                                        size="sm"
                                        aria-label="Close image"
                                    /> */}
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*" // Restrict file input to images only
                                onChange={handleImageUpload}
                            />                </Box>
                    )}
                    {currentItem === "Remove Product" && (
                        <>
                            <Typography style={{ lineHeight: '1.5', maxHeight: '6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '5', WebkitBoxOrient: 'vertical' }}>
                                Please be aware that selecting this option will permanently delete this product from our brand list and website. This action cannot be undone, and all associated data will be lost. Ensure that you want to proceed before confirming this deletion.
                            </Typography>
                            <Box style={{ display: "flex", justifyContent: "center", padding: "20px", margin: "0px 20px" }}>
                                <Button onClick={handleClose} style={{ color: "#9F7B49" }} >Cancel</Button>
                                <Button onClick={handleUpdate} style={{ background: "#9F7B49", color: "#fff" }} >Remove</Button>
                            </Box>
                        </>
                    )}

                    {currentItem === "Customer Reviews" && (
                        <TextField
                            id="outlined-multiline-static"
                            label=" Add Customer Reviews"
                            multiline
                            rows={4}
                            fullWidth
                            defaultValue="Default Value"
                        />
                    )}



                    {/* {["Headline", "Change Banner Text"].includes(currentItem) && (
                        <TextareaAutosize
                            minRows={3}
                            placeholder={`Edit ${currentItem}`}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            style={{ width: '100%' }} // Set width to your desired value
                            sx={{ mt: 2, width: '100%' }} // Or adjust as needed
                        /> */}

                    {/* )} */}
                </DialogContent>
                {currentItem !== "Remove Product" ? <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions> : ""}
            </Dialog>
        </Box>
        </Paper>
    );
}
