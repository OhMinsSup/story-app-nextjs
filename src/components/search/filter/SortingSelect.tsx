import React, { useEffect, useState } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Theme, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sortingOptions = [
  {
    label: '최신순',
    value: 'latest',
    type: 'createdAt',
    orderBy: 'desc',
  },
  {
    label: '오래된순',
    value: 'oldest',
    type: 'createdAt',
    orderBy: 'asc',
  },
  {
    label: '조회순',
    value: 'views',
    type: 'views',
    orderBy: 'desc',
  },
  {
    label: '좋아요순',
    value: 'likes',
    type: 'likes',
    orderBy: 'desc',
  },
];

function getStyles(
  option: Record<string, string>,
  sorting: Record<string, string>,
  theme: Theme,
) {
  return {
    fontWeight:
      option.value === sorting.value
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const SortingSelect = () => {
  const theme = useTheme();
  const router = useRouter();
  const { pathname, query } = router;

  const [sorting, setSorting] = useState<Record<string, string>>(
    sortingOptions[0],
  );

  const onChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;

    const safeValue = sortingOptions.find((item) => item.value === value);
    if (!safeValue) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orderType, orderBy, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          orderType: safeValue.type,
          orderBy: safeValue.orderBy,
        },
      },
      undefined,
      { scroll: false },
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orderType, orderBy, ...restQuery } = query;
    const safeValue = sortingOptions.find(
      (item) => item.type === orderType && item.orderBy === orderBy,
    );
    console.log(safeValue);
    if (!safeValue) {
      setSorting(sortingOptions[0]);
      return;
    }
    setSorting(safeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <FormControl sx={{ width: 300, float: 'right' }}>
      <Select
        displayEmpty
        value={sorting.value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!selected) {
            return <em>Placeholder</em>;
          }
          const safeValue = sortingOptions.find(
            (item) => item.value === selected,
          );
          if (!safeValue) return <em>Placeholder</em>;

          return safeValue.label;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {sortingOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={getStyles(option, sorting, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortingSelect;
