/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';

import { useHistoriesQuery } from '@api/story/story';

import {
  generateAvatar,
  getShortAddress,
  getUserThumbnail,
} from '@utils/utils';
import { Avatar } from '@mui/material';

interface Column {
  id:
    | 'status'
    | 'to'
    | 'from'
    | 'type'
    | 'blockNumber'
    | 'transactionHash'
    | 'senderTxHash'
    | 'createdAt'
    | 'blockHash';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: any, row: any, ...args: any[]) => any;
}

const columns: readonly Column[] = [
  { id: 'blockNumber', label: 'BlockNo' },
  {
    id: 'blockHash',
    label: 'BlockHash',
    format: (value) => getShortAddress(value),
  },
  { id: 'status', label: '타입' },
  {
    id: 'to',
    label: '보낸사람',
    align: 'left',
    format: (value, row, copy) => {
      return (
        <div className="flex items-center">
          <Avatar
            src={getUserThumbnail(value.profile)}
            alt={value.profile.nickname}
          />
          <div className="flex p-2 flex-col">
            <p>{value.profile.nickname}</p>
            <p>{getShortAddress(row.toHash)}</p>
          </div>
          <IconButton
            color="primary"
            aria-label="content copy"
            component="span"
            size="small"
            onClick={() => copy(row.toHash)}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      );
    },
  },
  {
    id: 'from',
    label: '받는사람',
    align: 'left',
    format: (value, row, copy) => {
      let nickname = value.profile.nickname;
      let thumbnail = getUserThumbnail(value.profile);
      if (row.status === 'ISSUE') {
        nickname = '컨트랙트';
        thumbnail = `data:image/svg+xml;utf8,${encodeURIComponent(
          generateAvatar('story_smart_contract_icon'),
        )}`;
      }
      return (
        <div className="flex items-center">
          <Avatar src={thumbnail} alt={nickname} />
          <div className="flex p-2 flex-col">
            <p>{nickname}</p>
            <p>{getShortAddress(row.fromHash)}</p>
          </div>
          <IconButton
            color="primary"
            aria-label="content copy"
            component="span"
            size="small"
            onClick={() => copy(row.fromHash)}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      );
    },
  },
  {
    id: 'transactionHash',
    label: 'transactionHash',
    format: (value: any, _, copy) => (
      <div className="flex items-center">
        {getShortAddress(value)}{' '}
        <IconButton
          color="primary"
          aria-label="content copy"
          component="span"
          size="small"
          onClick={() => copy(value)}
        >
          <ContentCopyIcon />
        </IconButton>
      </div>
    ),
  },
  {
    id: 'senderTxHash',
    label: 'senderTxHash',
    format: (value, _, copy) => (
      <div className="flex items-center">
        {getShortAddress(value)}{' '}
        <IconButton
          color="primary"
          aria-label="content copy"
          component="span"
          size="small"
          onClick={() => copy(value)}
        >
          <ContentCopyIcon />
        </IconButton>
      </div>
    ),
  },
];

interface StickyHistoryTableProps {}
const StickyHistoryTable: React.FC<StickyHistoryTableProps> = ({}) => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useHistoriesQuery(id);
  const rows = data?.list ?? [];

  const [copy, copyFn] = useCopyToClipboard();

  const [snackbar, setSnackbar] = useState(false);
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

  const onCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    if (copy?.value) {
      setSnackbar(true);
    }
  }, [copy]);

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
                            {column.format
                              ? column.format(value, row, copyFn)
                              : value}
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar}
        onClose={onCloseSnackbar}
        autoHideDuration={1000}
        message="클립보드에 복사 되었습니다."
        key={'copy-address'}
      />
    </>
  );
};

export default StickyHistoryTable;
