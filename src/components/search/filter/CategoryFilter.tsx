import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// components
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CategoryFilter: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const selectedCategories = query?.category
    ? query.category.toString().split(',')
    : [];

  const categories = ['Art', 'Utility'];

  const [formState, setFormState] = useState<string[]>(selectedCategories);

  useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);

  const onItemClick = (e: React.SyntheticEvent<Element, Event>) => {
    const { value } = e.currentTarget as any;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { category, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(',') }
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
        카테고리
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        <FormGroup>
          {categories?.map((item: any) => (
            <FormControlLabel
              key={item}
              value={item}
              color="primary"
              control={<Checkbox defaultChecked />}
              label={item}
              onChange={onItemClick}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
};

export default CategoryFilter;
