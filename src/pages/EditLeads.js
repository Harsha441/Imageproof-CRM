import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Rating from '@mui/material/Rating';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dataState } from '../utils/dataState';
import { dataCity } from '../utils/dataCity';
import { dataLocation } from '../utils/dataLocation';
import Iconify from '../components/Iconify';

const EditLeads = () => {
    const [value, setValue] = useState(5);
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState('')
    const [leadNotes, setLeadNotes] = useState('')
    const [leadInquiredDate, setLeadInquiredDate] = useState(null)
    const [willDesideDate, setWillDesideDate] = useState(null)
    const [amount, setAmount] = useState('')
    const [noOfGuests, setNoOfGuests] = useState('')
    const [source, setSource] = useState('')
    const [service, setService] = useState('')
    const [location, setLocation] = useState('')
    const [checkInDate, setCheckInDate] = useState(null)
    const [checkOutDate, setCheckOutDate] = useState(null)
    const [checkInTime, setCheckInTime] = useState(null)
    const [checkOutTime, setCheckOutTime] = useState(null)
    const [token, setToken] = useState('')
    const [error, setError] = useState(false);
    const [leadId, setLeadId] = useState('')
    const locations = useLocation()

    useEffect(() => {
        const id = locations.state.id;
        if (id !== null || id !== undefined) {
            getUniqueLeads(id)
            setLeadId(id)
        }
    }, [])

    const navigate = useNavigate();



    const onChangeLeadInquiredDate = (value) => {
        let month;
        let day;
        let date;
        if (value.$M + 1 <= 9) {
            month = `0${value.$M + 1}`;
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${month}-${day}`;
                setLeadInquiredDate(`${value.$y}-${month}-${day}`);
            } else {
                date = `${value.$y}-${month}-${value.$D}`;
                setLeadInquiredDate(`${value.$y}-${month}-${value.$D}`);
            }
        } else {
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${value.$M + 1}-${day}`;
                setLeadInquiredDate(`${value.$y}-${value.$M + 1}-${day}`);
            } else {
                date = `${value.$y}-${value.$M + 1}-${value.$D}`;
                setLeadInquiredDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
            }
            setLeadInquiredDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
        }
    }

    const onChangeWillDesideDate = (value) => {
        let month;
        let day;
        let date;
        if (value.$M + 1 <= 9) {
            month = `0${value.$M + 1}`;
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${month}-${day}`;
                setWillDesideDate(`${value.$y}-${month}-${day}`);
            } else {
                date = `${value.$y}-${month}-${value.$D}`;
                setWillDesideDate(`${value.$y}-${month}-${value.$D}`);
            }
        } else {
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${value.$M + 1}-${day}`;
                setWillDesideDate(`${value.$y}-${value.$M + 1}-${day}`);
            } else {
                date = `${value.$y}-${value.$M + 1}-${value.$D}`;
                setWillDesideDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
            }
            setWillDesideDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
        }
    }

    const onChangeCheckIn = (value) => {
        let month;
        let day;
        let date;
        if (value.$M + 1 <= 9) {
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${month}-${day}`;
                setCheckInDate(`${value.$y}-${month}-${day}`);
            } else {
                date = `${value.$y}-${month}-${value.$D}`;
                setCheckInDate(`${value.$y}-${month}-${value.$D}`);
            }
        } else {
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${value.$M + 1}-${day}`;
                setCheckInDate(`${value.$y}-${value.$M + 1}-${day}`);
            } else {
                date = `${value.$y}-${value.$M + 1}-${value.$D}`;

                setCheckInDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
            }
            setCheckInDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
        }
    }

    const onChangeCheckOut = (value) => {
        let month;
        let day;
        let date;
        if (value.$M + 1 <= 9) {
            month = `0${value.$M + 1}`;
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${month}-${day}`;
                setCheckOutDate(`${value.$y}-${month}-${day}`);
            } else {
                date = `${value.$y}-${month}-${value.$D}`;
                setCheckOutDate(`${value.$y}-${month}-${value.$D}`);
            }
        } else {
            if (value.$D <= 9) {
                day = `0${value.$D}`;
                date = `${value.$y}-${value.$M + 1}-${day}`;
                setCheckOutDate(`${value.$y}-${value.$M + 1}-${day}`);
            } else {
                date = `${value.$y}-${value.$M + 1}-${value.$D}`;
                setCheckOutDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
            }
            setCheckOutDate(`${value.$y}-${value.$M + 1}-${value.$D}`);
        }
    }


    const getUniqueLeads = async (id) => {
        try {
            console.log(id)
            const { data } = await axios.get(`http://localhost:3002/api/crm/get-unique-lead/${id}`)
            console.log(data)
            setName(data.lead.name)
            setEmail(data.lead.email)
            setMobile(data.lead.mobile)
            setAddress(data.lead.address)
            setLeadNotes(data.lead.notes)
            setLeadInquiredDate(data.lead.inquiredDate)
            setWillDesideDate(data.lead.decideDate)
            setAmount(data.lead.maxBudget)
            setNoOfGuests(data.lead.noOfGuests)
            setSource(data.lead.refferalSource)
            setService(data.lead.service)
            setLocation(data.lead.location)
            setCheckInDate(data.lead.checkinDate)
            setCheckOutDate(data.lead.checkoutDate)
            setCheckInTime(data.lead.checkoutTime)
            setCheckOutTime(data.lead.checkoutTime)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitEditLeadForm = async (e) => {
        e.preventDefault()
        const d = {
            name,
            email,
            mobile,
            address,
            inquiredDate: leadInquiredDate,
            decideDate: willDesideDate,
            noOfGuests,
            maxBudget: amount,
            refferalSource: source,
            notes: leadNotes,
            service,
            location,
            checkinTime: checkInTime,
            checkoutTime: checkOutTime,
            checkinDate: checkInDate,
            checkoutDate: checkOutDate,
            leadId
        }
        console.log(d)
        try {
            const { data } = await axios.put(`http://localhost:3002/api/crm/editLead`, d)
            console.log(data)
            if (data.success) {
                toast.success(data.msg, {
                    theme: 'light',
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/dashboard/leads')
                scrollToTop()
            }
        } catch (error) {
            console.log(error)
        }

    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <form onSubmit={onSubmitEditLeadForm}>
                <ToastContainer />
                <Grid container sx={{ padding: "20px" }}>
                    <Grid item direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Box s={12} xs={6} sx={{
                            background: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            margin: "5px",
                        }}>
                            <Typography variant='h3'>Lead Profile</Typography>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" label="Name" size='small' fullWidth
                                    onChange={(e) => setName(e.target.value)} required value={name}
                                />
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" label="Email" type='email' size='small' fullWidth
                                    onChange={(e) => setEmail(e.target.value)} value={email} required
                                />
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" type='number' label="Mobile" size='small' fullWidth
                                    onChange={(e) => setMobile(e.target.value)} value={mobile} required
                                />
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" label="Address" fullWidth size='small' value={address}
                                    onChange={(e) => setAddress(e.target.value)} required
                                />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Box>
                                    <Typography variant='h4' disabled>Lead Notes</Typography>
                                </Box>
                                <TextField
                                    aria-label="Lead Notes"
                                    minRows={5}
                                    required
                                    multiline
                                    value={leadNotes}
                                    placeholder="lead notes"
                                    sx={{
                                        width: {
                                            xs: 270,
                                            sm: 370,
                                            md: 470,
                                            lg: 570,
                                            xl: 670
                                        }
                                    }}
                                    // style={{ width: '51ch' }}
                                    onChange={(e) => setLeadNotes(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Grid>


                    <Grid item direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }} >
                        <Box s={12} xs={6} sx={{
                            background: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            margin: "10px"
                        }}>
                            <Typography variant='h3'>Lead Details</Typography>
                            <Box sx={{ marginTop: "20px" }}>
                                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Lead inquired on"
                                        fullWidth
                                        value={leadInquiredDate}
                                        required
                                        onChange={(newValue) => {
                                            onChangeLeadInquiredDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>

                            <Box sx={{ marginTop: "20px" }}>
                                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Will decide by"
                                        fullWidth
                                        required
                                        value={willDesideDate}
                                        onChange={(newValue) => {
                                            onChangeWillDesideDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography>Max Budget</Typography>
                                <FormControl sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                        label="Amount"
                                        value={amount}
                                        type='number'
                                        required
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" type='number' value={noOfGuests} label="No. of Guests" />
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Source"
                                        required
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                    >
                                        <MenuItem value={10}>1</MenuItem>
                                        <MenuItem value={20}>2</MenuItem>
                                        <MenuItem value={30}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: "20px" }}>
                    <Grid item xs={12}>
                        <Box s={12} sx={{
                            background: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            margin: "5px"
                        }}>
                            <Box>
                                <Typography variant='h4' disabled>Schedule</Typography>
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Service</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        label="Service"
                                        value={service}
                                        onChange={(e) => setService(e.target.value)}
                                    >
                                        <MenuItem value={10}>1</MenuItem>
                                        <MenuItem value={20}>2</MenuItem>
                                        <MenuItem value={30}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                <TextField id="outlined-basic" value={location} label="Location" fullWidth required />
                            </Box>
                            <Stack sx={{ marginTop: "20px", justifyContent: 'space-between' }}
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                            >
                                <Box>
                                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Check-In Date"
                                            fullWidth
                                            required
                                            value={checkInDate}
                                            onChange={(newValue) => {
                                                onChangeCheckIn(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>
                                </Box>
                                <Box >
                                    <TextField
                                        id="time"
                                        label="Check-in Time"
                                        type="time"
                                        value={checkInTime}
                                        onChange={(e) => setCheckInTime(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                    />
                                </Box>
                                <Box>
                                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Check-Out Date"
                                            fullWidth
                                            required
                                            value={checkOutDate}
                                            onChange={(newValue) => {
                                                onChangeCheckOut(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box>
                                    <TextField
                                        id="time"
                                        label="Check-Out Time"
                                        type="time"
                                        value={checkOutTime}
                                        onChange={(e) => setCheckOutTime(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ margin: "25px" }}>
                    <Button fullWidth type='submit' variant="contained">Submit</Button>
                </Box>
            </form >
        </>
    );
};

export default EditLeads;
