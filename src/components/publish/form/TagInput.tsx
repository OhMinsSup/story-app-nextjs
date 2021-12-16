import React, { useState, useCallback, useEffect, useRef } from 'react';

// components
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// hooks
import { useFieldArray, useFormContext } from 'react-hook-form';

const TagItem: React.FC<{
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick, name }) => {
  return (
    <Chip
      label={name}
      color="primary"
      className="mb-2"
      variant="outlined"
      onClick={onClick}
      onDelete={onClick}
    />
  );
};

const TagInput: React.FC = () => {
  const { control } = useFormContext();
  const ignore = useRef(false);
  const editableDiv = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState('');

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'tags',
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (editableDiv.current) {
      if (value === '') {
        editableDiv.current.innerText = value;
      }
    }
  }, [value]);

  const insertTag = (tag: string) => {
    ignore.current = true;
    setValue('');
    // fields includes the tag
    if (tag === '') return;
    const findIdex = fields.findIndex((field: any) => field.name === tag);
    if (findIdex === -1)
      append({
        name: tag,
      });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value === '') {
      if (fields.length > 0) remove(fields.length - 1);
      return;
    }

    const keys = [',', 'Enter'];
    if (keys.includes(e.key)) {
      // 등록
      e.preventDefault();
      insertTag(value);
    }
  };

  const onRemove = (index: number) => remove(index);

  return (
    <>
      <TextField
        id="standard-basic"
        label="태그"
        variant="standard"
        placeholder="태그를 입력하세요"
        value={value}
        className="w-full"
        onKeyDown={onKeyDown}
        onChange={onChangeInput}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: 'wrap',
        }}
        className="text-lg text-gray-800"
      >
        {fields.map((tag: any, index) => (
          <TagItem
            key={`tag-${tag.id}`}
            name={tag.name}
            onClick={() => onRemove(index)}
          />
        ))}
      </Stack>
    </>
  );
};

export default TagInput;
