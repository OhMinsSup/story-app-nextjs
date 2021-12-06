import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SettingRowProps {
  title: string;
  editButton?: boolean;
  description?: string;
}
const SettingRow: React.FC<SettingRowProps> = ({
  children,
  description,
  editButton,
  title,
}) => {
  return (
    <div className="py-4">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-shrink-0 w-36">
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className="mb-2 sm:mb-0 font-extrabold text-gray-900"
          >
            {title}
          </Typography>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex-1 text-base">{children}</div>
          {editButton && (
            <div className="edit-wrapper flex items-center ml-4">
              <Button size="small">수정</Button>
            </div>
          )}
        </div>
      </div>
      {description && (
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          className="mt-3 text-gray-600"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default SettingRow;
