import * as React from 'react';
import { filter, first } from 'lodash';
import { sentenceCase } from 'change-case';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0].businessName, b[0].businessName);
    if (order !== 0) return order;
    return a[1].businessName - b[1].businessName;
  });
  if (query) {
    return filter(array, (_user) => _user.businessName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// let currentPage = 0;
// let interval;
// let searchInterval;

export default function VerifiedBusiness() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allServiceProviders, setAllServiceProviders] = useState([]);

  const [data, setData] = useState([]);

  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [firstInterval, setFirstInterval] = useState('');
  const [secondInterval, setSecondInterval] = useState('');
  const [checked, setChecked] = useState(false);
  const [tok, setTok] = useState('');


  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Verified Business Details
          </Typography>
          {/* <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleBlocked}
                    >
                        Blocked
                    </Button>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleAddUser}
                    >
                        New User
                    </Button> */}
        </Stack>

        <Card>
          <UserListToolbar

          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead

                />


                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound />
                    </TableCell>
                  </TableRow>
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination

          />
        </Card>
      </Container>
    </Page>
  );
}
