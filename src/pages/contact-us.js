import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const ContactUS = () => {
    const [headOffice, setHeadOffice] = useState("");
    const [regOffice, setRegOffice] = useState("");
    const [email, setEmail] = useState("");
    const [contactDetails, setContactDetails] = useState(null);
    const [error, setError] = useState(""); // For error messages

    // Fetch the contact details when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/contactDetails');
                console.log("Fetched contact details", response.data);
                if (response.data && response.data.length > 0) {
                    setContactDetails(response.data[0]);
                    setHeadOffice(response.data[0]?.headOffice || "");
                    setRegOffice(response.data[0]?.regOffice || "");
                    setEmail(response.data[0]?.email || "");
                }
            } catch (error) {
                console.error("Error fetching contact details:", error);
            }
        };
        fetchData();
    }, []);

    // Handle updating the contact details (head office, reg office, and email)
    const handleUpdate = async (field, value) => {
        try {
            const updatedDetails = { ...contactDetails, [field]: value }; // Update only the changed field
            const response = await axios.put('/api/contactDetails', updatedDetails);
            console.log("updatedDetails", updatedDetails);

            if (response.status === 200) {
                // Update the state after successful update
                setContactDetails(updatedDetails); // Reflect updated data in UI
                console.log(`${field} updated successfully!`);
            }
        } catch (error) {
            console.error("Error updating contact details:", error);
            setError("Failed to update contact details");
        }
    };

    return (
        <>
            <Typography variant="h6">Change Contact Details</Typography>

            {error && <Typography color="error">{error}</Typography>} {/* Display error message */}

            {/* Head Office Address */}
            <TextField
                variant="outlined"
                label="Write Head Office address here"
                multiline
                rows={6}
                value={headOffice}
                onChange={(e) => setHeadOffice(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                sx={{ background: "#9F7B49" }}
                                onClick={() => handleUpdate('headOffice', headOffice)}
                            >
                                Update
                            </Button>
                        </InputAdornment>
                    ),
                }}
                sx={{ mt: 2, mb: 2, width: '600px' }}
            />
            <br />

            {/* Registration Office Address */}
            <TextField
                label="Write Reg Office"
                multiline
                rows={6}
                value={regOffice}
                onChange={(e) => setRegOffice(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                sx={{ background: "#9F7B49" }}
                                onClick={() => handleUpdate('regOffice', regOffice)}
                            >
                                Update
                            </Button>
                        </InputAdornment>
                    ),
                }}
                sx={{ width: '600px', mb: 2 }}
            />
            <br />

            {/* Optional Email Update */}
           
        </>
    );
};

export default ContactUS;
