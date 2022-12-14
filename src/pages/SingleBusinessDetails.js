import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SingleBusinessDetails = () => {
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("");
    const [category, setCategory] = useState("")
    const [pincode, setPincode] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState("")

    const location = useLocation();


    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Typography variant="h4" gutterBottom>
                        Business Details
                    </Typography>
                    <TextField
                        id="outlined-password-input"
                        label="Business Name"
                        value={businessName}
                        type="text" />

                    <TextField id="outlined-basic"
                        label="Email"
                        type="text"
                        value={email}
                        variant="outlined" />

                    <TextField id="outlined-basic"
                        label="Mobile"
                        type="number"
                        value={mobile}
                        variant="outlined" />

                    <TextField id="outlined-basic"
                        label="Address"
                        type="text"
                        value={address}
                        variant="outlined" />

                    {/* <TextField id="outlined-basic"
                        label="Pincode"
                        type="number"
                        value={pincode}
                        variant="outlined" /> */}

                    <TextField id="outlined-basic"
                        label="Category"
                        type="text"
                        value={category}
                        variant="outlined" />

                    <TextField id="outlined-basic"
                        label="State"
                        type="text"
                        value={state}
                        variant="outlined" />

                    <TextField id="outlined-basic"
                        label="City"
                        type="text"
                        value={city}
                        variant="outlined" />

                    <TextField id="outlined-basic"
                        label="Location"
                        type="text"
                        value={locations}
                        variant="outlined" />
                </div>

            </Box>
        </div>
    );
}

export default SingleBusinessDetails;