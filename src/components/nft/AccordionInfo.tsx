import { Accordion, Text } from '@mantine/core';

const AccordionInfo = () => {
  return (
    <div className="w-full rounded-2xl">
      <Accordion variant="contained">
        <Accordion.Item value="photos">
          <Accordion.Control>Descriptions</Accordion.Control>
          <Accordion.Panel>
            <Text size="sm" color="dimmed">
              Tattooed Kitty Gang (“TKG”) is a collection of 666 badass kitty
              gangsters, with symbol of tattoos, living in the Proud Kitty Gang
              (“PKG”) metaverse. Each TKG is an 1/1 ID as gangster member & all
              the joint rights.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="print">
          <Accordion.Control>Details</Accordion.Control>
          <Accordion.Panel>
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Contract Address</span>
              <Text
                variant="link"
                component="a"
                href="https://mantine.dev"
                className="text-base line-clamp-1"
              >
                0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a
              </Text>
            </div>
            <br />
            <div className='className="flex flex-col text-xs text-neutral-500 overflow-hidden'>
              <span>Token ID</span>
              <span className="text-base text-neutral-900 line-clamp-1">
                100300372864
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
                Ethereum
              </span>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionInfo;
