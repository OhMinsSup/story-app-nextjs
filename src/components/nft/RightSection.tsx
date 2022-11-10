import React from 'react';
import dynamic from 'next/dynamic';

import { Button, Text, Accordion } from '@mantine/core';
import { LikeSaveGroupButton } from './_components';
import { TrendingUp, Tag } from 'tabler-icons-react';

import { Avatar, Badge } from '@components/ui/Display';
import { KlaytnIcon, VerifyIcon, WalletIcon } from '@components/ui/Icon';

// types
import type { ItemSchema } from '@api/schema/item';
import { isEmpty } from '@utils/assertion';

const TimeCountDown = dynamic(() => import('./_components/TimeCountDown'), {
  ssr: false,
});

interface RightSectionProps {
  item: ItemSchema | undefined;
}

const RightSection: React.FC<RightSectionProps> = ({ item }) => {
  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
      {/* ---------- 1 ----------  */}
      <div className="pb-9 space-y-5">
        <div className="flex justify-end items-center">
          <LikeSaveGroupButton />
        </div>
        {isEmpty(item?.tags) ? null : (
          <div className="flex justify-start items-center gap-2">
            {item?.tags.map((item) => (
              <Badge key={`item-tags-${item.tag.id}`} name={item.tag.name} />
            ))}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {item?.title}
        </h2>
        {/* ---------- 4 ----------  */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
          <div className="flex items-center ">
            <Avatar
              imgUrl={item?.user?.profileUrl ?? undefined}
              sizeClass="h-9 w-9"
              radius="rounded-full"
            />
            <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
              <span className="text-sm">Creator</span>
              <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                <span>{item?.user?.username}</span>
                <VerifyIcon iconClass="w-4 h-4" />
              </span>
            </span>
          </div>
          <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex items-center">
            <Avatar
              imgUrl={item?.user?.profileUrl ?? undefined}
              sizeClass="h-9 w-9"
              radius="rounded-full"
            />
            <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
              <span className="text-sm">Collection</span>
              <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                <span>{item?.user?.username}</span>
                <VerifyIcon iconClass="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="py-9">
        <TimeCountDown beginDate={item?.beginDate} endDate={item?.endDate} />
      </div>

      <Text color="dimmed">Current price</Text>
      <div className="flex flex-wrap mb-2">
        <div
          className="flex items-center font-semibold max-w-full text-gray-700 w-fit"
          style={{ fontSize: '30px' }}
        >
          <div>
            <Text
              className="sc-1pie21o-0 elyzfO"
              variant="link"
              component="a"
              href="https://mantine.dev"
            >
              <div className="items-center justify-center flex-col flex overflow-hidden">
                <KlaytnIcon className="w-6 h-6 fill-current" />
              </div>
            </Text>
          </div>
          <div className="w-full ml-3 overflow-hidden text-ellipsis whitespace-nowrap">
            {item?.price}
          </div>
        </div>
      </div>

      {/* PRICE */}
      <div className="pb-9 pt-9 flex items-center">
        <Button
          variant="outline"
          className="flex-1"
          fullWidth
          size="md"
          leftIcon={<WalletIcon width="24" height="24" />}
        >
          <span className="ml-2.5">Place a bid</span>
        </Button>
      </div>

      {/* ---------- 9 ----------  */}
      <div className="pt-9">
        <Accordion variant="contained">
          <Accordion.Item value="photos">
            <Accordion.Control icon={<TrendingUp size={20} />}>
              Price History
            </Accordion.Control>
            <Accordion.Panel>Content</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="print">
            <Accordion.Control icon={<Tag size={20} />}>
              Listings
            </Accordion.Control>
            <Accordion.Panel>Content</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default RightSection;
