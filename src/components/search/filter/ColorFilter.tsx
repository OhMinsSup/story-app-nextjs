import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import orderBy from 'lodash-es/orderBy';
import head from 'lodash-es/head';

// components
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { getColorHex } from '@libs/colors';
import { getUniqueFilter } from '@utils/utils';

const colors = getColorHex().sort(() => Math.random() - 0.5);

const LocalColorPagination: Record<string, Record<string, string>[]> = {};
colors.forEach((item, index) => {
  // 5개씩 나눠서 분리 페이지별 그룹화
  const page = Math.floor(index / 5) + 1;
  if (!LocalColorPagination[page]) {
    LocalColorPagination[page] = [];
  }
  LocalColorPagination[page] = [...LocalColorPagination[page], item];
});

const ColorFilter = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedColors = query?.color ? (query.color as string).split(',') : [];
  const [formState, setFormState] = useState<string[]>(selectedColors);
  const [pageNo, setPageNo] = useState<number>(1);
  const [stackPages, setStackPages] = useState<Record<string, string>[]>([]);

  const disabled = LocalColorPagination[pageNo + 1] ? false : true;

  useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);

  const onItemClick = (item: Record<string, string>) => {
    const { value } = item;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];

    const { color, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { color: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false },
    );
  };

  const onNextPage = () => {
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    const currentPages = LocalColorPagination[pageNo] ?? [];
    setStackPages((prev) =>
      getUniqueFilter([...prev, ...currentPages], 'value'),
    );
  }, [pageNo]);

  useEffect(() => {
    if (!router.isReady || !router.query?.color) return;
    // find LocalColorPagination in router.query.color
    const color = router.query.color.toString();
    const targetPages: number[] = [];
    const transform = color.split(/[,\s]+/);
    Object.entries(LocalColorPagination).forEach(([key, value]) => {
      // values array object 중에서 router.query.color 가 있는 것만 찾기
      const finded = value.find((item) => {
        const { value } = item;
        return transform.includes(value);
      });
      if (finded) {
        targetPages.push(Number(key));
      }
    });

    const resultPages = orderBy(targetPages, [], ['desc']);
    const resultPage = head(resultPages);

    if (resultPage) {
      const data = Array.from({ length: resultPage })
        .map((_, index) => {
          const currentPage = LocalColorPagination[index + 1] ?? [];
          return currentPage;
        })
        .flatMap((item) => item);

      setStackPages(data);
      setPageNo(resultPage);
    }
  }, [router]);

  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        배경색
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        <FormGroup>
          {stackPages.map((item) => {
            return (
              <FormControlLabel
                key={`color-${item.key}`}
                value={item.value}
                color="primary"
                control={
                  <Stack
                    spacing={1}
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ mr: '1rem' }}
                  >
                    <Checkbox
                      checked={formState.includes(item.value) ?? false}
                    />
                    <span className="flex items-center">
                      <span
                        className={`w-5 h-5 rounded-full block me-3 mt-0.5 border border-black border-opacity-20`}
                        style={{ backgroundColor: item.value }}
                      />
                    </span>
                  </Stack>
                }
                label={item.value}
                onChange={() => onItemClick(item)}
              />
            );
          })}
        </FormGroup>

        <Button onClick={onNextPage} disabled={disabled}>
          더보기
        </Button>
      </div>
    </div>
  );
};

export default ColorFilter;
