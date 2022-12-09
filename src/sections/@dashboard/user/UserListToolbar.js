import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
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
import { Box } from '@mui/system';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));
// ----------------------------------------------------------------------
UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
export default function UserListToolbar({ numSelected, filterName, onFilterName, handleSearch }) {

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {/* <ToastContainer /> */}
      <Box>
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Box>
            <SearchStyle
              value={filterName}
              onChange={onFilterName}
              placeholder="Search user..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </Box>
        )}
      </Box>
      <Box>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          // <Box>

          //   <Tooltip title="Search">
          //     <Button
          //       variant="contained"
          //       sx={{ height: '50px', width: '100px' }}
          //     >
          //       Search  <SearchRoundedIcon />
          //     </Button>
          //   </Tooltip>

          // </Box>
          <></>
        )}
      </Box>
    </RootStyle>
  );
}
