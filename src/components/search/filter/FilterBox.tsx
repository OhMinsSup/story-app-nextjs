import { useRouter } from 'next/router';
import isEmpty from 'lodash-es/isEmpty';
import FilteredItem from './FilteredItem';
import TagFilter from './TagFilter';
import ColorFilter from './ColorFilter';
import omit from 'lodash-es/omit';

const FilterBox: React.FC = () => {
  const router = useRouter();
  const { pathname, query: q } = router;
  const query = omit(q, ['orderBy', 'orderType', 'open']);

  return (
    <div className="pt-1">
      <div className="block border-b border-gray-300 pb-7 mb-7">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-semibold text-heading text-xl md:text-2xl">
            필터
          </h2>
          <button
            className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
            aria-label="Clear All"
            onClick={() => {
              router.push(pathname);
            }}
          >
            초기화
          </button>
        </div>
        <div className="flex flex-wrap -m-1.5 pt-2">
          {!isEmpty(query) &&
            Object.values(query)
              .join(',')
              .split(',')
              .map((v, idx) => (
                <FilteredItem
                  itemKey={
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Object.keys(query).find((k) => query[k]?.includes(v))!
                  }
                  itemValue={v}
                  key={idx}
                />
              ))}
        </div>
      </div>

      <TagFilter />
      <ColorFilter />
    </div>
  );
};

export default FilterBox;
