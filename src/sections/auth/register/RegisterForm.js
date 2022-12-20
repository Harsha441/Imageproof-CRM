import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// component
import Iconify from '../../../components/Iconify';
import OTPModal from '../OTPModal';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studioName, setStudioName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);

  const [otp, setOtp] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    studioName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Studio name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().min(10, 'Invalid').max(10, 'Invalid').required('Mobile Number is Required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      studioName: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (e) => {
      // navigate('/dashboard', { replace: true });
      setName(e.name);
      setEmail(e.email);
      setMobile(e.mobile);
      setStudioName(e.studioName);
      setPassword(e.password);
      const d = {
        email: e.email,
        mobile: e.mobile,
      };
      try {
        const { data } = await axios.post('http://localhost:3002/api/register-email-otp', d);
        console.log(data);
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
          handleClickOpen();

          // const admin = JSON.stringify(data.admin);
          // localStorage.setItem('admin', admin);
          // localStorage.setItem('token', data.token);
          // window.location.reload(true);
        } else {
          toast.error(data.msg, {
            theme: 'light',
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleRegister = async () => {
    const d = {
      email,
      name,
      studioName,
      mobile,
      password,
      otp,
    };
    handleClose();
    console.log({ d });
    try {
      const { data } = await axios.post('http://localhost:3002/api/register', d);
      console.log(data);
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

        const photographer = JSON.stringify(data.photographer);
        localStorage.setItem('photographer', photographer);
        localStorage.setItem('token', data.token);
        window.location.reload(true);
      } else {
        toast.error(data.msg, {
          theme: 'light',
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <ToastContainer />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          {/* </Stack> */}

          <TextField
            fullWidth
            label="Studio Name"
            {...getFieldProps('studioName')}
            error={Boolean(touched.studioName && errors.studioName)}
            helperText={touched.studioName && errors.studioName}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="mobile"
            label="Mobile"
            {...getFieldProps('mobile')}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
      <OTPModal open={open} handleClose={handleClose} setOtp={setOtp} handleRegister={handleRegister} />
    </FormikProvider>
  );
}
