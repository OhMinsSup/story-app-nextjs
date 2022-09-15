import React from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { WritePenIcon } from '@components/ui/Icon';
import { ASSETS_IMAGES } from '@constants/constant';

export interface SectionHeroProps {
  heading?: React.ReactNode;
  subHeading?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({
  heading = 'Discover, collect, and sell extraordinary NFTs ',
  subHeading = 'Discover the most outstanding NTFs in all topics of life. Creative your NTFs and sell them',
}) => {
  return (
    <div className="nc-SectionHero relative pb-10" data-nc-id="SectionHero">
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 lg:items-center relative">
        <div className="w-screen max-w-full xl:max-w-xl space-y-5 lg:space-y-7">
          <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400 max-w-lg">
            {subHeading}
          </span>
          <div className="pt-7 flex  space-x-4">
            <Link href="/" passHref>
              <Button
                component="a"
                rightIcon={<Search className="w-5 h-5 ml-2.5" />}
                size="lg"
              >
                <span className="">Explore</span>
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button
                component="a"
                rightIcon={<WritePenIcon className="w-5 h-5 ml-2.5" />}
                variant="outline"
                size="lg"
              >
                <span className="">Create</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={ASSETS_IMAGES.ABOUT_HERO_RIGHT} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
