import { Accordion, Text } from '@mantine/core';
import type { ItemSchema } from '@api/schema/item';
import { useMemo } from 'react';

interface AccordionInfoProps {
  item: ItemSchema | undefined;
}

const AccordionInfo: React.FC<AccordionInfoProps> = ({ item }) => {
  const contractHref = useMemo(() => {
    // `https://scope.klaytn.com/account/${item?.contractAddress}`;
    return `https://baobab.scope.klaytn.com/account/${item?.contractHash}`;
  }, [item?.contractHash]);

  const transactionHref = useMemo(() => {
    const hash = item?.nft?.transactionReceipt?.at(0)?.transactionHash;
    // `https://scope.klaytn.com/tx/${item?.transactionHash}`;
    return `https://baobab.scope.klaytn.com/tx/${hash}`;
  }, [item]);

  return (
    <div className="w-full rounded-2xl">
      <Accordion variant="contained">
        <Accordion.Item value="photos">
          <Accordion.Control>Descriptions</Accordion.Control>
          <Accordion.Panel>
            <Text size="sm" color="dimmed">
              {item?.description}
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="print">
          <Accordion.Control>Details</Accordion.Control>
          <Accordion.Panel>
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Contract Hash</span>
              <Text
                variant="link"
                component="a"
                href={contractHref}
                className="text-base line-clamp-1"
              >
                {item?.contractHash}
              </Text>
            </div>
            <br />
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Transaction Hash</span>
              <Text
                variant="link"
                component="a"
                href={transactionHref}
                className="text-base line-clamp-1"
              >
                {item?.nft?.transactionReceipt?.at(0)?.transactionHash}
              </Text>
            </div>
            <br />
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Token ID</span>
              <span className="text-base text-neutral-900 line-clamp-1">
                {item?.nft?.tokenId}
              </span>
            </div>
            <br />
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Token Standard</span>
              <span className="text-base text-neutral-900 line-clamp-1">
                ERC-721
              </span>
            </div>
            <br />
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Blockchain</span>
              <span className="text-base text-neutral-900 line-clamp-1">
                Klaytn
              </span>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionInfo;
