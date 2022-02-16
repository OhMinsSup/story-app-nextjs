import React, { useState } from 'react';
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
import Avatar from '@mui/material/Avatar';

import { useOffersQuery } from '@api/story/nft';
import { getUserThumbnail } from '@utils/utils';

interface Column {
  id: 'buyer' | 'seller' | 'price';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: any, row: any, ...args: any[]) => any;
}

const columns: readonly Column[] = [
  {
    id: 'seller',
    label: '판매',
    format: (value) => {
      return (
        <div className="flex items-center">
          <Avatar
            src={getUserThumbnail(value.profile)}
            alt={value.profile.nickname}
          />
          <div className="flex p-2 flex-col">
            <p>{value.profile.nickname}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'buyer',
    label: '구매',
    format: (value) => {
      return (
        <div className="flex items-center">
          <Avatar
            src={getUserThumbnail(value.profile)}
            alt={value.profile.nickname}
          />
          <div className="flex p-2 flex-col">
            <p>{value.profile.nickname}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'price',
    label: '가격',
    format: (value, row) => {
      if (isNaN(value)) {
        return '-';
      }
      return `${Number(value).toLocaleString()} ${row.unit}`;
    },
  },
];

const OfferTable: React.FC = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useOffersQuery(id);
  const rows = data?.list ?? [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
          거래내역
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
                      key={`offers-${row.id}`}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value, row) : value}
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

export default OfferTable;
