import { useRouter } from 'next/router';
import isEmpty from 'lodash-es/isEmpty';
import ClearIcon from '@mui/icons-material/Clear';

interface FilteredItemProps {
  itemKey: string;
  itemValue: string;
}

const FilteredItem: React.FC<FilteredItemProps> = ({ itemKey, itemValue }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const onClose = () => {
    const currentItem = (query[itemKey]! as string)
      .split(',')
      .filter((i) => i !== itemValue);
    delete query[itemKey];
    router.push({
      pathname,
      query: {
        ...query,
        ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(',') } : {}),
      },
    });
  };
  return (
    <div
      className="group flex flex-shrink-0 m-1.5 items-center border border-gray-300 bg-borderBottom rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading"
      onClick={onClose}
    >
      {itemValue}
      <ClearIcon className="text-sm text-body ms-2 flex-shrink-0 -me-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};

export default FilteredItem;
