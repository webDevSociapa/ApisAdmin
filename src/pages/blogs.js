import { Box, Button, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Blogs = () => {

    return (
        <>
            <Paper sx={{ p: 20 }}>
                <TextField
                    variant="outlined"
                    label="Blog title:"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button variant="contained" sx={{ background: "#9F7B49" }}>Add</Button>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mt: 2, mb: 2, width: '600px' }} // Set your desired width here
                />
                <Box sx={{ mb: 8 }}>
                    <Typography variant="subtitle1">Blogs Image:</Typography>
                    {/* Placeholder banner image */}
                    <Box mt={2}>
                        <img src="/banner.png" alt="Current Banner" width="100%" />
                    </Box>
                    <Button variant="contained" component="label" sx={{ mt: 2, background: "#9F7B49" }}>
                        Change Banner
                        <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                    </Button>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{mt:2}}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Button sx={{ background: "#9F7B49", px: 3, textAlign: "center", color: "#fff" }}>
                    Update
                </Button>
            </Paper>
        </>
    )
}

export default Blogs