import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// components
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';

const colorFilterItems = [
  {
    id: '1',
    name: 'Black',
    slug: 'black',
    hexColor: '#000',
  },
  {
    id: '2',
    name: 'Blue',
    slug: 'blue',
    hexColor: '#3310ce',
  },
  {
    id: '3',
    name: 'Olive',
    slug: 'olive',
    hexColor: '#0c7448',
  },
  {
    id: '4',
    name: 'Maroon',
    slug: 'maroon',
    hexColor: '#5f0e0e',
  },
  {
    id: '5',
    name: 'Brown',
    slug: 'brown',
    hexColor: '#362727',
  },
  {
    id: '6',
    name: 'White',
    slug: 'white',
    hexColor: '#fff',
  },
  {
    id: '7',
    name: 'Gray',
    slug: 'gray',
    hexColor: '#e1e1e1',
  },
];

const ColorFilter = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedColors = query?.color ? (query.color as string).split(',') : [];
  const [formState, setFormState] = useState<string[]>(selectedColors);

  useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);

  const onItemClick = (e: React.SyntheticEvent<Element, Event>) => {
    const { value } = e.currentTarget as any;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
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
  const items = colorFilterItems;

  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        배경색
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.name}
              color="primary"
              control={
                <Stack
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ mr: '1rem' }}
                >
                  <Checkbox defaultChecked />
                  <span className="flex items-center">
                    <span
                      className={`w-5 h-5 rounded-full block me-3 mt-0.5 border border-black border-opacity-20`}
                      style={{ backgroundColor: item.hexColor }}
                    />
                  </span>
                </Stack>
              }
              label={item.name}
              onClick={onItemClick}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
};

export default ColorFilter;
