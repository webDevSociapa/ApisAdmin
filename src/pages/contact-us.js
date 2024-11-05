import { Button, InputAdornment, TextField, Typography } from "@mui/material"

const ContactUS = () =>{
    return(
        <>
        <Typography>Change Contact Details</Typography>
        <TextField
    variant="outlined"
    label="Write new address here"
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <Button variant="contained" sx={{background:"#9F7B49"}}>Update</Button>
            </InputAdornment>
        ),
    }}
    sx={{ mt: 2, mb: 2, width: '600px' }} // Set your desired width here
/>      <br/>

        <TextField
    variant="outlined"
    label=" Write new Contact number"
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <Button variant="contained" sx={{background:"#9F7B49"}}>Update</Button>
            </InputAdornment>
        ),
    }}
    sx={{ width: '600px',mb:2 }} // Set your desired width here
/> <br/>
        <TextField
    variant="outlined"
    label=" Write new gmail"
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <Button variant="contained" sx={{background:"#9F7B49"}}>Update</Button>
            </InputAdornment>
        ),
    }}
    sx={{ width: '600px' }} // Set your desired width here
/>
        </>
    )
}

export default ContactUS

