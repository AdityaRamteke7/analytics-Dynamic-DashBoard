import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination
} from '@mui/material';
import "./DataTable.css"

const DataTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className='analyticcolor'>
            <TableContainer className='tableContainer'>
                <Table >
                    <TableHead className='header' >
                        <TableRow >
                            <TableCell>Country</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Intensity</TableCell>
                            <TableCell>Likelihood</TableCell>
                            <TableCell>Relevance</TableCell>
                            <TableCell>Topics</TableCell>
                            <TableCell>Region</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='colume'>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{new Date(row.published).getFullYear()}</TableCell>
                                <TableCell>{row.intensity}</TableCell>
                                <TableCell>{row.likelihood}</TableCell>
                                <TableCell>{row.relevance}</TableCell>
                                <TableCell>{row.topic}</TableCell>
                                <TableCell>{row.region}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className='pagination'
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </Paper>
    );
};

export default DataTable;
