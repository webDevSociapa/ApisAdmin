import { Button, InputAdornment, Paper, TextField, Typography } from "@mui/material"

const SustainBility = () => {

    return (
        <>
            <Paper sx={{ p: 10, background: 'rgba(255, 251, 246, 1)' }}>
                <Typography>CSR</Typography>
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
                    sx={{ mt: 2, mb: 2, width: '600px' }} // Set your desired width here
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Add Description link"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue="Default Value"
                />
            </Paper>
        </>

    )
}

export default SustainBility