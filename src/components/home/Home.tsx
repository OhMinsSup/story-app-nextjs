import React from 'react';
import { Text } from '@mantine/core';
import { ASSETS_IMAGES } from '@constants/constant';
import { BgGlassmorphism, SectionHero, SectionHowItWork } from './_components';

const Home = () => {
  return (
    <>
      <BgGlassmorphism />

      <div className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
        <SectionHero
          heading={
            <Text
              component="span"
              color="white"
              sx={(theme) => ({
                color:
                  theme.colorScheme === 'light'
                    ? theme.colors.dark[8]
                    : theme.colors.white,
              })}
            >
              Discover 🖼
              <br /> collect, and sell <br /> extraordinary {` `}
              <Text className="relative pr-3">
                <img
                  className="'w-full absolute bottom-3 -left-1"
                  src={ASSETS_IMAGES.VECTOR_01}
                  alt="vector icon"
                />
                <Text component="span" className="relative">
                  NFTs
                </Text>
              </Text>
            </Text>
          }
        />

        <SectionHowItWork />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* SECTION */}
        {/* <SectionGridAuthorBox boxCard="box3" /> */}

        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          {/* <BackgroundSection /> */}
          {/* <SectionSliderCollections /> */}
        </div>

        {/* SECTION */}
        {/* <SectionGridFeatureNFT /> */}

        {/* SECTION */}
        <div className="relative py-20 lg:py-24">
          {/* <BackgroundSection /> */}
          {/* <SectionBecomeAnAuthor /> */}
        </div>

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION 1 */}
        {/* <SectionSliderCategories /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}
      </div>
    </>
  );
};

export default Home;
