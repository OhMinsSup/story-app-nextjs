import React from 'react';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAlert } from '@hooks/useAlert';
import { useMutationStoryDelete } from '@api/story/story';
import { useRouter } from 'next/router';
import { PAGE_ENDPOINTS, RESULT_CODE } from '@constants/constant';
import { isAxiosError } from '@utils/utils';

interface ActionMenuProps {
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  onClose: () => void;
}
const ActionMenu: React.FC<ActionMenuProps> = ({ anchorEl, open, onClose }) => {
  const router = useRouter();
  const dataId = router.query.id?.toString();
  const { Alert, showAlert, closeAlert } = useAlert();
  const { mutateAsync } = useMutationStoryDelete();

  const asyncAlert = (title: string, text: string) => {
    return new Promise((resolve) => {
      showAlert({
        content: {
          title,
          text,
        },
        showCancel: true,
        okHandler: () => {
          resolve(true);
        },
        cancelHandler: () => {
          resolve(false);
        },
      });
    });
  };

  const onDelete = async () => {
    if (!dataId) return;
    const confirm = await asyncAlert('삭제하기', '삭제하시겠습니까?');
    closeAlert();
    if (!confirm) return;

    try {
      const {
        data: { resultCode },
      } = await mutateAsync({ dataId: Number(dataId) });
      if (resultCode === RESULT_CODE.OK) {
        showAlert({
          content: {
            title: '삭제하기',
            text: '삭제되었습니다.',
          },
        });
        return;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const {
          response: {
            data: { message },
          },
        } = error;
        showAlert({
          content: {
            title: '삭제하기',
            text: message,
          },
        });
        return;
      }
    }
  };

  const onEdit = async () => {
    if (!dataId) return;
    const confirm = await asyncAlert('수정하기', '수정하시겠습니까?');
    closeAlert();
    if (!confirm) return;
    router.push(PAGE_ENDPOINTS.PUBLISH.MODIFY(dataId));
  };

  return (
    <>
      <Menu
        id="action-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'action-button',
        }}
      >
        <MenuList>
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>수정하기</ListItemText>
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>삭제하기</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <Alert />
    </>
  );
};

export default ActionMenu;
