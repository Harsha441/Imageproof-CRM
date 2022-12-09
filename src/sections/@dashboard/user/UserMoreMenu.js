import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, handleEditBusiness }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');



  return (
    <>
      <ToastContainer />
      <IconButton ref={ref} >
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        anchorEl={ref.current}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
