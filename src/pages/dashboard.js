import { Box, Card, Paper } from "@mui/material";
import Grid from '@mui/material/Grid';




const DashBoared = () => {

    const Dashboard = [
        { name: "Traffic Data" },
        { name: "Traffic Data" },
        { name: "Traffic Data" },
        { name: "Traffic Data" },
        { name: "Traffic Data" },
        { name: "Traffic Data" },
       
    ]
    return (
        <Paper>
            <Box sx={{p:4}}>
                <Grid container spacing={2}>
                    {Dashboard.map((item) => {
                        return (
                            <>
                                <Grid item xs={12} md={4} sm={6}>
                                    <Card sx={{height:"300px", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                                     <h2>{item.name}</h2>
                                     <p>Traffic</p>
                                     <img src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg"/>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
                </Grid>
            </Box>
        </Paper>
    )
}

export default DashBoared