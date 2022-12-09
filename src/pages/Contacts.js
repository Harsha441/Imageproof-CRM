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
  { id: 'address', label: 'Address', alignRight: false },
  // { id: 'block/unblock', label: 'Block/Un-Block', alignRight: false },
  // { id: 'verify', label: 'Verify', alignRight: false },
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
    const order = comparator(a[0].name, b[0].name);
    if (order !== 0) return order;
    return a[1].name - b[1].name;
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
// let currentPage = 0;
// let interval;
// let searchInterval;
//

export default function Leads() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [allServiceProviders, setAllServiceProviders] = useState([]);

  const [allLeads, setAllLeads] = useState([]);

  const categoryShow = true;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allLeads.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allLeads.length) : 0;

  const filteredUsers = applySortFilter(allLeads, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate('/dashboard/addingbusiness');
  };
  const handleBusiness = (id) => {
    navigate('/dashboard/editleads', { state: { id } });
  };

  const handleEditBusiness = (e, id, category) => {
    e.preventDefault();
    navigate('/dashboard/editbusiness', { state: { id, category } });
  };

  useEffect(() => {
    const tok = localStorage.getItem('token');
    if (tok !== null || tok !== undefined) {
      getAllLeads(tok);
    }
  }, []);

  const getAllLeads = async (token) => {
    try {
      const { data } = await axios.get(` http://localhost:3002/api/crm/getAllLeads/${token}`);
      console.log(data);
      if (data.success) {
        setAllLeads(data.leads);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Contacts">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Contacts
          </Typography>

          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddUser}
          >
            New Leads
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            categoryShow={categoryShow}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={allLeads.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, mobile, email, address } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;
                    const check = row.block;
                    // const veri = row.verified;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography
                              variant="subtitle2"
                              noWrap
                              onClick={() => handleBusiness(_id)}
                              sx={{ cursor: 'pointer' }}
                            >
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{mobile}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        {/* <TableCell align="left">
                          <FormControlLabel
                            control={
                              <Switch
                              // defaultChecked={check}
                              // onChange={(e) => handleChangeBlock(e, _id, category, check)}
                              />
                            }
                          // label="Show"
                          />
                          {check ? "Block" : "Un - Block"} 
                        </TableCell> */}
                        {/* <TableCell align="left">
                          <FormControlLabel
                            control={
                              <Switch
                              // defaultChecked={verified}
                              // onChange={(e) => handleChangeVerify(e, _id, category, verified)}
                              />
                            }
                            label="Show"
                          />
                        </TableCell> */}

                        <TableCell align="right">
                          <UserMoreMenu id={_id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allLeads.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
