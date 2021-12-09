import React from 'react';
import { BlockPicker } from 'react-color';

// components
import FormHelperText from '@mui/material/FormHelperText';

// validators
import { useFormContext, Controller } from 'react-hook-form';

// hooks
import { getColorHex } from '@libs/colors';

const colors = getColorHex().map((color) => color.value);

const BackgroundPalette: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-3">
      <Controller
        control={control}
        name="backgroundColor"
        render={({ field }) => (
          <BlockPicker
            triangle="hide"
            ref={field.ref}
            colors={colors}
            width="100%"
            color={field.value}
            onChange={(color) => {
              field.onChange(color.hex);
            }}
          />
        )}
      />
      {errors.backgroundColor?.message && (
        <FormHelperText error>{errors.backgroundColor.message}</FormHelperText>
      )}
    </div>
  );
};

export default BackgroundPalette;
