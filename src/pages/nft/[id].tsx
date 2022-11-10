import React from 'react';

// hooks
import { ModalsProvider } from '@mantine/modals';

// constants
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

// api
import { api } from '@api/module';
import { QueryClient } from '@tanstack/react-query';

// components
import { NFTsMedia, AccordionInfo, RightSection } from '@components/nft';
import { Layout } from '@components/ui/Layout';

// types
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { ItemDetailResp } from '@api/schema/resp';
import { useItemDetailQuery } from '@api/queries';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id?.toString();
  if (!id) {
    return {
      notFound: true,
      props: {},
    };
  }
  const identifier = parseInt(id, 10);
  if (Number.isNaN(identifier)) {
    return {
      notFound: true,
      props: {},
    };
  }

  const client = new QueryClient();

  const cookie = ctx?.req?.headers?.cookie ?? '';

  try {
    // server side user info prefetch react query
    await client.fetchQuery(QUERIES_KEY.ITEM_ID(identifier), async () => {
      const response = await api.get<ItemDetailResp>({
        url: API_ENDPOINTS.APP.ITEM.ID(identifier),
        config: {
          headers: {
            Cookie: cookie,
          },
        },
      });
      return response.data.result;
    });

    const item = client.getQueryData<ItemDetailResp>(
      QUERIES_KEY.ITEM_ID(identifier),
    );

    return {
      props: {
        identifier,
        item,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      props: {
        identifier,
      },
    };
  }
};

function NFTsDetailPage({
  item,
  identifier,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useItemDetailQuery({
    id: identifier,
    options: {
      initialData: item,
    },
  });

  return (
    <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        {/* CONTENT */}
        <div className="space-y-8 lg:space-y-10">
          {/* HEADING */}
          <NFTsMedia item={data} />
          <AccordionInfo item={data} />
        </div>

        {/* SIDEBAR */}
        <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
          <RightSection item={data} />
        </div>
      </div>
    </div>
  );
}

export default NFTsDetailPage;

NFTsDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <ModalsProvider>
        <div className="nc-NftDetailPage" data-nc-id="NftDetailPage">
          <div className="container mt-11 flex">{page}</div>
        </div>
      </ModalsProvider>
    </Layout>
  );
};
