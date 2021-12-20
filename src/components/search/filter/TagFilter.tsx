import React, { useEffect, useState } from 'react';

// components
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router';
import { useTagsQuery } from '@api/story/tags';

const TagFilter: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const selectedCategories = query?.tags
    ? query.tags.toString().split(',')
    : [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTagsQuery(
    {
      pageSize: 3,
    },
  );

  const tags = data?.pages.flatMap((page) => page.list) ?? [];

  const [formState, setFormState] = useState<string[]>(selectedCategories);

  useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.tags]);

  const onItemClick = (e: React.SyntheticEvent<Element, Event>) => {
    const { value } = e.currentTarget as any;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { tags, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { tags: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        태그
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        <FormGroup>
          {tags.map((item) => (
            <FormControlLabel
              key={`tag-${item.id}`}
              value={item.name}
              color="primary"
              control={
                <Checkbox checked={formState.includes(item.name) ?? false} />
              }
              label={item.name}
              onChange={onItemClick}
            />
          ))}
        </FormGroup>

        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          더보기
        </Button>
      </div>
    </div>
  );
};

export default TagFilter;
