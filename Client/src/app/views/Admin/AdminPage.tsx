import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArticleIcon from '@mui/icons-material/Article';
import { alpha as muiAlpha } from '@mui/material/styles';
import { useProfile } from '../../../lib/hooks/useProfile';
import BlockIcon from '@mui/icons-material/Block';

interface Data {
    id: number;
    displayName: string;
    email: string;
    roles: string;
    // updateRole: string;
}

interface HeadCell {
    id: keyof Data | 'actions';
    label: string;
}

const headCells: readonly HeadCell[] = [
    { id: 'id', label: 'ID' },
    { id: 'displayName', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'roles', label: 'Role' },
    // { id: 'updateRole', label: 'Update Role' },
    { id: 'actions', label: 'Actions' },
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }: EnhancedTableProps) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all users' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="left">
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar({ numSelected }: EnhancedTableToolbarProps) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => muiAlpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
                    Accounts
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function AdminPage() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const { profiles, loadingProfiles, page, setPage } = useProfile(undefined, undefined, 'admin');
    const rowsPerPage = (profiles?.totalCount) || 7;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = profiles?.items.map((n) => n.id) || [];
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage); // your hook will fetch new data
        setSelected([]); // reset selection when page changes
    };

    const emptyRows = Math.max(0, rowsPerPage - (profiles?.items.length || 0));
    return (
        <Box sx={{ width: '100%' ,mt:3}}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size="medium">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={profiles?.items.length || 0}
                        />
                        <TableBody>
                            {loadingProfiles ? (
                                // Show 3 loading rows
                                Array.from({ length: rowsPerPage }).map((_, index) => (
                                    <TableRow key={index}>
                                        {headCells.map((cell, i) => (
                                            <TableCell key={i} align="left">
                                                Loading...
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                profiles?.items.map((row) => {
                                    const isItemSelected = selected.includes(row.id);
                                    const labelId = `enhanced-table-checkbox-${row.id}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.displayName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.roles}</TableCell>
                                            <TableCell align="left">
                                                <ArticleIcon color="primary" titleAccess="info" sx={{mr:1}}/>
                                                <BlockIcon color="error" titleAccess="block user"/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                            {emptyRows > 0 && !loadingProfiles && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={profiles?.totalCount || 0}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </Paper>
        </Box>
    );
}
