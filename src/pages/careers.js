import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { useState } from "react";

const Careers = () =>{
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

    const careersDta = [
        {name:"Employee Awards"},
        {name:"Training & Sessions"},
        {name:"Engagements"},
        {name:"Celebrations"},
        {name:"Join Us"},
    ]
    return(
        <>
        {careersDta.map((itm, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #AE844A",
            p: 3,
            mb: 2,
            px:2,
            borderRadius: "10px",
            fontFamily: "jost",
            fontWeight: "400",
            display: "flex",
            justifyContent: "space-between",
          }} style={{Padding:"20px 60px"}}
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

          {/* {["Headline", "Change Banner Text"].includes(currentItem) && (
            <TextareaAutosize
            minRows={3}
            placeholder={`Edit ${currentItem}`}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ width: '100%' }} // Set width to your desired value
            sx={{ mt: 2, width: '100%' }} // Or adjust as needed
          />
          
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      
        </>
    )
}

export default Careers

