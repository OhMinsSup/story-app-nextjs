import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Skeleton from '@mui/material/Skeleton';

import { getUserThumbnail, blurDataUrl } from '@utils/utils';

import type { StorySchema } from 'types/story-api';

interface StoriesGridProps {
  item: StorySchema;
}
function StoriesGridItem({ item }: StoriesGridProps) {
  const width = 300;
  const height = 300;

  return (
    <>
      <Link href="/">
        <a className="stories-grid-item no-underline block shadow xl:w-full hover:shadow-md hover:transform-gpu">
          <div className="image-wrapper relative p-8 bg-gray-50">
            <Image
              src={item.media.contentUrl}
              loading="lazy"
              placeholder="blur"
              layout="responsive"
              className="object-fill"
              width={width}
              height={height}
              blurDataURL={blurDataUrl(width, height)}
              alt={`${item.name} title`}
            />
          </div>

          <div className="flex w-full pr-4 justify-between">
            <div className="color-badge pl-2 pr-1 items-center flex">
              <Chip
                avatar={
                  <Avatar sx={{ background: item.backgroundColor }}>#</Avatar>
                }
                size="small"
                label={item.backgroundColor}
              />
            </div>
            <div className="user-badge pl-1 pr-2 items-center flex bg-white rounded-xl">
              <img
                className="block w-4 h-4 mr-2 rounded-lg"
                src={getUserThumbnail(item.user.profile)}
                alt={item.user.profile.nickname}
              />
              <div className="text-xs font-bold text-gray-900">
                {item.user.profile.nickname}
              </div>
            </div>
          </div>

          <section>
            <h3 className="text-xl font-bold m-0 mb-2 text-gray-900 px-4 whitespace-nowrap break-words overflow-ellipsis">
              {item.name}
            </h3>
            <div className="flex flex-col flex-1 p-4">
              <p className="whitespace-nowrap break-words overflow-ellipsis text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          </section>

          <div className="flex text-xs justify-between border-t-2 border-gray-50 px-4 py-2">
            <Link href="/">
              <a className=" flex items-center no-underline">
                <img
                  className=" object-cover w-6 h-6  block mr-2 rounded-full"
                  src={getUserThumbnail(item.user.profile)}
                  alt="user thumbnail of seeh_h"
                />
                <span>
                  by <b>{item.user.profile.nickname}</b>
                </span>
              </a>
            </Link>
            <div className="flex justify-center items-center">
              <FavoriteIcon className="w-3 h-3 mr-1" />
              <span>0</span>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .stories-grid-item {
          transition: all ease-in 0.125s;
        }

        .stories-grid-item .user-badge {
          height: 1.5rem;
          box-shadow: 0px 0.125rem 0.3125rem rgba(0, 0, 0, 0.06);
          transform: translateY(-0.75rem);
        }

        .stories-grid-item .color-badge {
          height: 1.5rem;
          transform: translateY(-0.75rem);
        }
      `}</style>
    </>
  );
}

export default StoriesGridItem;

// eslint-disable-next-line react/display-name
StoriesGridItem.Skeleton = () => {
  return (
    <div className="stories-grid-item no-underline block shadow xl:w-full hover:shadow-md hover:transform-gpu">
      <div className="image-wrapper relative p-8 bg-gray-50">
        <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
      </div>

      <section>
        <h3 className="text-xl font-bold m-0 px-4">
          <Skeleton animation="wave" variant="text" width={100} />
        </h3>
        <div className="flex flex-col flex-1 p-4">
          <p>
            <Skeleton variant="text" animation="wave" height={10} />
            <Skeleton variant="text" animation="wave" height={10} width="80%" />
            <Skeleton variant="text" animation="wave" height={10} width="40%" />
            <Skeleton variant="text" animation="wave" height={10} width="60%" />
          </p>
        </div>
      </section>

      <div className="flex text-xs justify-between border-t-2 border-gray-50 px-4 py-2">
        <div className="flex items-center space-x-2">
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
          <span>
            <Skeleton variant="text" animation="wave" height={20} width={100} />
          </span>
        </div>

        <div className="flex justify-center items-center">
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
