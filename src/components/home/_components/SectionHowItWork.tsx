import React, { FC } from 'react';
// import NcImage from 'shared/NcImage/NcImage';
import { Badge } from '@mantine/core';
import { ASSETS_IMAGES } from '@constants/constant';

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DATA[0][];
}

const DATA = [
  {
    id: 1,
    img: ASSETS_IMAGES.HIW_01,
    imgDark: ASSETS_IMAGES.HIW_01,
    title: 'Filter & Discover',
    desc: 'Connect with wallet, discover, buy NTFs, sell your NFTs and earn money',
  },
  {
    id: 2,
    img: ASSETS_IMAGES.HIW_02,
    imgDark: ASSETS_IMAGES.HIW_01,
    title: 'Connect wallet',
    desc: 'Connect with wallet, discover, buy NTFs, sell your NFTs and earn money',
  },
  {
    id: 3,
    img: ASSETS_IMAGES.HIW_03,
    imgDark: ASSETS_IMAGES.HIW_03,
    title: 'Start trading',
    desc: 'Connect with wallet, discover, buy NTFs, sell your NFTs and earn money',
  },
  {
    id: 4,
    img: ASSETS_IMAGES.HIW_04,
    imgDark: ASSETS_IMAGES.HIW_04,
    title: 'Earn money',
    desc: 'Connect with wallet, discover, buy NTFs, sell your NFTs and earn money',
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = '',
  data = DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 -top-1"
          src={ASSETS_IMAGES.VECTOR_HLW}
          alt="vector"
        />
        {data.map((item: typeof DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <div className="mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto">
              <img
                src={item.img}
                className="object-cover w-full h-full"
                alt=""
              />
            </div>
            <div className="text-center mt-auto space-y-5">
              <Badge
                color={
                  !index
                    ? 'blue'
                    : index === 1
                    ? 'pink'
                    : index === 2
                    ? 'yellow'
                    : 'green'
                }
              >
                {`Step ${index + 1}`}
              </Badge>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
