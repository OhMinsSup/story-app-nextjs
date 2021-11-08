/* eslint-disable react/display-name */
import React from 'react';
import { useRouter } from 'next/router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useHistoriesQuery } from '@api/story/story';

import type { UserModel } from 'types/story-api';
import { getUserThumbnail } from '@utils/utils';
import { Avatar } from '@mui/material';

interface Column {
  id: 'status' | 'to' | 'from';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: any) => any;
}

const columns: readonly Column[] = [
  { id: 'status', label: '구분' },
  {
    id: 'to',
    label: '보낸사람',
    align: 'left',
    format: (value: any) => {
      return (
        <div className="flex items-center">
          <Avatar
            src={getUserThumbnail(value.profile)}
            alt={value.profile.nickname}
          />
          <p className="p-2">{value.profile.nickname}</p>
        </div>
      );
    },
  },
  {
    id: 'from',
    label: '받는사람',
    align: 'left',
    format: (value: any) => {
      return (
        <div className="flex items-center">
          <Avatar
            src={getUserThumbnail(value.profile)}
            alt={value.profile.nickname}
          />
          <p className="p-2">{value.profile.nickname}</p>
        </div>
      );
    },
  },
];

interface StickyHistoryTableProps {}
const StickyHistoryTable: React.FC<StickyHistoryTableProps> = ({}) => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useHistoriesQuery(id);
  console.log(data);
  const rows = data?.list ?? [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h5" gutterBottom className="font-bold">
          히스토리
        </Typography>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`histories-${row.id}`}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </>
  );
};

export default StickyHistoryTable;
