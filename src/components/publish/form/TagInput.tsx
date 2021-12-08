import React, { useState, useCallback, useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export interface TagInputProps {
  ref?: React.RefObject<HTMLDivElement>;
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagItem: React.FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  return (
    <Chip
      label="Clickable Deletable"
      color="primary"
      className="mb-2"
      variant="outlined"
      onClick={onClick}
      onDelete={onClick}
    />
  );
};

const TagInput: React.FC<TagInputProps> = ({ onChange, tags: initialTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, setValue] = useState('');
  const ignore = useRef(false);
  const editableDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tags.length === 0) return;
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

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

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue('');
      if (tag === '' || tags.includes(tag)) return;
      setTags([...tags, tag.trim()]);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && value === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }
      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        insertTag(value);
      }
    },
    [insertTag, tags, value],
  );

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
  };

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
        {tags.map((tag) => (
          <TagItem key={tag} onClick={() => onRemove(tag)}>
            {tag}
          </TagItem>
        ))}
      </Stack>
    </>
  );
};

export default TagInput;
